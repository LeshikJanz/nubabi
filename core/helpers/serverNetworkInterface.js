// @flow
import { HTTPFetchNetworkInterface } from 'apollo-client';
import RecursiveIterator from 'recursive-iterator';
import { dropLast, last, lensPath, set, view } from 'ramda';
import { fromGlobalId } from 'graphql-relay';

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

const getUploadRoot = path => {
  return path
    .split('/')
    .map(part => {
      try {
        const globalId = fromGlobalId(part);
        const isGlobalId = globalId.type;

        return isGlobalId ? globalId.id : part;
      } catch (err) {
        return part;
      }
    })
    .join('/');
};

class ServerNetworkInterface extends HTTPFetchNetworkInterface {
  constructor(uri, firebase) {
    super(uri);
    this.firebase = firebase;
  }

  fetchFromRemoteEndpoint({ request, options }) {
    const isMutation = request.query.definitions[0].operation === 'mutation';

    if (!isMutation) {
      return super.fetchFromRemoteEndpoint({ request, options });
    }

    const files = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const { node, path } of new RecursiveIterator(request.variables)) {
      if (isFile(node, path)) {
        const normalizedPath = normalizePath(path);
        const filePath = lensPath(normalizedPath);
        const file = view(
          lensPath(dropLast(1, normalizedPath)),
          request.variables,
        );
        files.push({ file, urlPath: filePath });
      }
    }

    const { firebase } = this;
    const uploadFile = (path, file) => {
      return new Promise((resolve, reject) => {
        const uploadTask = firebase
          .storage()
          .ref()
          .child(path)
          .put(file.file.url, {
            contentType: file.file.contentType,
          });

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            /* progress */
          },
          error => reject(error),
          snapshot => {
            const downloadUrl = snapshot.downloadURL;
            request.variables = set(
              file.urlPath,
              downloadUrl,
              request.variables,
            );
            resolve(true);
          },
        );
      });
    };

    if (!files.length) {
      return super.fetchFromRemoteEndpoint({ request, options });
    }

    return Promise.all(
      files.map(file => {
        const path =
          options.context && options.context.uploadRoot
            ? `${getUploadRoot(options.context.uploadRoot)}/${file.file.name}`
            : `/tmp/${file.file.name}`;

        return uploadFile(path, file);
      }),
    ).then(() => {
      return super.fetchFromRemoteEndpoint({ request, options });
    });
  }
}

export default ServerNetworkInterface;
