"use strict";

var _firebaseFunctions = require("firebase-functions");

var _firebaseFunctions2 = _interopRequireDefault(_firebaseFunctions);

var _curriculum = require("./curriculum");

var _curriculum2 = _interopRequireDefault(_curriculum);

var _imageResize = require("./imageResize");

var _imageResize2 = _interopRequireDefault(_imageResize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.startCurriculum = _firebaseFunctions2.default.database.ref("/babies/{babyId}").onWrite(_curriculum2.default.handler);

exports.userAvatarResize = _firebaseFunctions2.default.database.ref("/users/{userId}/avatar/url").onWrite(_imageResize2.default.handler);

exports.babyAvatarResize = _firebaseFunctions2.default.database.ref("/babies/{babyId}/avatar/url").onWrite(_imageResize2.default.handler);

exports.coverImageResize = _firebaseFunctions2.default.database.ref("/babies/{babyId}/coverImage/url").onWrite(_imageResize2.default.handler);

exports.memoriesResize = _firebaseFunctions2.default.database.ref("/memories/{memoryId}/files/{fileId}/url").onWrite(_imageResize2.default.handler);