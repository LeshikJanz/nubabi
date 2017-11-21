

const _firebaseFunctions = require("firebase-functions");

const functions = _interopRequireWildcard(_firebaseFunctions);

const _curriculum = require("./curriculum");

const _curriculum2 = _interopRequireDefault(_curriculum);

const _imageResize = require("./imageResize");

const _imageResize2 = _interopRequireDefault(_imageResize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; }  const newObj = {}; if (obj != null) { for (const key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj;  }

exports.startCurriculum = functions.database.ref("/babies/{babyId}").onWrite(_curriculum2.default.handler);

exports.userAvatarResize = functions.database.ref("/users/{userId}/avatar/url").onWrite(_imageResize2.default.handler);

exports.babyAvatarResize = functions.database.ref("/babies/{babyId}/avatar/url").onWrite(_imageResize2.default.handler);

exports.coverImageResize = functions.database.ref("/babies/{babyId}/coverImage/url").onWrite(_imageResize2.default.handler);

exports.memoriesResize = functions.database.ref("/memories/{memoryId}/files/{fileId}/url").onWrite(_imageResize2.default.handler);