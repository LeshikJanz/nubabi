import { graphql, print } from "graphql";
import { schema } from "../schema";
import firebaseConnector from "../connectors/firebaseConnector";

/* eslint-disable */

// A network interface that uses the schema on the client
// adapted to support middleware, since that's how we're supposed
// to set authentication/authorization on the client
class ClientNetworkInterfaceWithMiddleware {
  constructor(connectors = {}) {
    this.middlewares = [];
    this.connectors = connectors;
  }

  applyMiddlewares(requestAndOptions) {
    return new Promise((resolve, reject) => {
      const { request, options } = requestAndOptions;

      const queue = (funcs, scope) => {
        const next = () => {
          if (funcs.length > 0) {
            const f = funcs.shift();
            if (f) {
              f.applyMiddleware.apply(scope, [{ request, options }, next]);
            }
          } else {
            resolve({ request, options });
          }
        };

        next();
      };

      queue([...this.middlewares], this);
    });
  }

  query(request) {
    const options = {};
    return this.applyMiddlewares({
      request,
      options
    }).then(({ request, options }) => {
      const context = {
        connectors: {
          ...this.connectors,
          firebase: firebaseConnector(this.connectors.firebase)
        }
      };

      if (options.headers && options.headers.authorization) {
        context.token = options.headers.authorization.split(" ")[1];
      }

      return graphql(
        schema,
        print(request.query),
        {}, // root value
        context, // context
        request.variables,
        request.operationName
      );
    });
  }

  use(middlewares) {
    middlewares.forEach(middleware => {
      if (typeof middleware.applyMiddleware === "function") {
        this.middlewares.push(middleware);
      } else {
        throw new Error(
          "Middleware must implement the applyMiddleware function"
        );
      }
    });

    return this;
  }
}
/* eslint-enable */

export default ClientNetworkInterfaceWithMiddleware;
