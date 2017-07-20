import { map, identity, find, propEq, sortBy, prop, reverse } from "ramda";
import {
  connectionFromArray,
  globalIdField,
  fromGlobalId,
  connectionFromPromisedArrayWithCount
} from "./common";

const secureImage = str => str.replace("http:", "https:") + "/";
const title = () => "";
const randomArray = (low: number, high: number, mapFn: Function = identity) => {
  return map(
    mapFn,
    new Array(Math.floor(Math.random() * (high - low + 1) + low))
  );
};

const makeUser = () => ({
  firstName: "",
  lastName: ""
});

const makeComment = index => ({
  id: "",
  text: "",
  author: makeUser(),
  createdAt: ""
});

const makeFile = () => ({
  contentType: "image/jpeg",
  url: secureImage("")
});

const makeMemory = () => ({
  id: "",
  title: "",
  description: "",
  files: randomArray(1, 10, makeFile),
  comments: reverse(sortByTimestamp(randomArray(0, 10, makeComment)))
});

const sortByTimestamp = sortBy(prop("createdAt"));

const memories = sortByTimestamp(randomArray(1, 10, makeMemory));

export const resolvers = {
  Baby: {
    memories: ({ id }, args) => {
      return connectionFromArray(memories, args);
    },
    memory: (_, { id }) => {
      return find(propEq("id", fromGlobalId(id).id), memories);
    }
  },
  Memory: {
    id: globalIdField(),
    files: ({ files }, args) => {
      return connectionFromPromisedArrayWithCount(Promise.resolve(files), args);
    },
    comments: ({ comments }, args) => {
      return connectionFromPromisedArrayWithCount(
        Promise.resolve(comments),
        args
      );
    },
    // TODO: remove all these mock resolvers
    createdAt: () => "",
    author: () => {
      // TODO: remove
      return {
        id: "1",
        firstName: "",
        lastName: "",
        avatar: {
          url: `https://lorempixel.com/30/30/people/${Math.floor(
            Math.random() * 10 + 1
          )}/`
        }
      };
    }
  }
};

export default resolvers;
