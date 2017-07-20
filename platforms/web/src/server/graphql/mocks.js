import { globalIdField } from "./resolvers/common";

const mocks = {
  ID: (...args) => globalIdField().resolve(...args),
  Avatar: () => ({
    url: "",
    thumb: {
      url: ""
    }
  }),
  Expert: (_, args) => {
    if (args.id) {
      ("");
    }
    const card = "";

    const expert = {
      name: card.name,
      discipline: "",
      avatar_url: ""
    };

    return expert;
  },
  AchievementConnection: () => ({
    count: ""
  }),
  Baby: () => ({
    coverImage: { url: "" }
  }),
  Memory: () => ({
    description: "",
    image: (_, { width = 30, height = 30 }) => ({
      url: () => "",
      width: () => width,
      height: () => height
    })
  }),
  Badge: () => ({
    image: (_, { width = 30, height = 30 }) => ({
      url: () => "",
      width,
      height
    })
  })
};

export default mocks;
