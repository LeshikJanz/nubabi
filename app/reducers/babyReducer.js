const headerBackground = require('./images/profileBackground.jpg');
const babyIcon = require('./images/face_icon.jpg');
const memory1 = require('./images/memory1.png');
const memory2 = require('./images/memory2.png');
const memory3 = require('./images/memory3.png');

const babyInfo = {
  name: 'Sebastian',
  gender: 'm',
  avatar: babyIcon,
  coverImage: headerBackground,
  relationshipToMe: 'Mother',
  birthDate: '2012-08-20',
  weekBorn: 32,
  height: 58.2,
  weight: 5.5,
  memories: [
    {
      image: memory1,
      caption: 'Charlotte\'s Day',
    },
    {
      image: memory2,
      caption: 'Chatting away with daddy',
    },
    {
      image: memory3,
      caption: 'Chatting away with daddy',
    },
    {
      image: memory1,
      caption: 'Charlotte\'s Day',
    },
    {
      image: memory2,
      caption: 'Chatting away with daddy',
    },
  ],
};

export default function babyReducer(state = babyInfo, action) {
  switch (action.type) {

    default:
      return state;
  }
}
