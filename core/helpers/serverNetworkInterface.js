// @flow
import { HTTPFetchNetworkInterface } from 'apollo-client';
import { print as printGraphQL } from 'graphql';
import RecursiveIterator from 'recursive-iterator';
import { dropLast, last, lensPath, omit, set, view } from 'ramda';
import uuid from 'react-native-uuid';
import isReactNative from '../app/isReactNative';

const isFile = (value, path) => {
  // TODO: implement check for web
  return last(path) === 'url' && value.startsWith('/');
};

const normalizePath = path => {
  return path.map(part => {
    const asInt = parseInt(part, 10);
    return Number.isNaN(asInt) ? part : asInt;
  });
};

class ServerNetworkInterface extends HTTPFetchNetworkInterface {
  fetchFromRemoteEndpoint({ request, options }) {
    const isMutation = request.query.definitions[0].operation === 'mutation';

    if (!isMutation) {
      return super.fetchFromRemoteEndpoint({ request, options });
    }

    let hasFiles = false;

    const formData = new global.FormData();

    // eslint-disable-next-line no-restricted-syntax
    for (const { node, path } of new RecursiveIterator(request.variables)) {
      if (isFile(node, path)) {
        hasFiles = true;
        const id = uuid.v4();

        const normalizedPath = normalizePath(path);
        const filePath = lensPath(normalizedPath);
        const file = view(
          lensPath(dropLast(1, normalizedPath)),
          request.variables,
        );

        formData.append(
          id,
          isReactNative
            ? {
                uri: file.url,
                name: file.name,
                type: file.contentType,
              }
            : node,
        );
        request.variables = set(filePath, id, request.variables);
      }
    }

    if (!hasFiles) {
      return super.fetchFromRemoteEndpoint({ request, options });
    }

    formData.append('query', printGraphQL(request.query));
    formData.append('variables', JSON.stringify(request.variables || {}));
    formData.append('debugName', JSON.stringify(request.debugName || ''));
    formData.append('operationName', request.operationName || '');

    const fetchOpts = {
      ...this._opts,
      ...options,
      method: 'POST',
      headers: {
        Accept: '*/*',
        ...omit(['Content-Type'], options.headers || {}),
      },
    };

    return global.fetch(this._uri, {
      ...fetchOpts,
      method: 'POST',
      body: formData,
    });
  }
}

export default ServerNetworkInterface;
