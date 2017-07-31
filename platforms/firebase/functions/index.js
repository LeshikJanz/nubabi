"use strict";

const functions = require("firebase-functions"),
  startCurriculum = require("./curriculum"),
  imageResize = require("./imaginaryResize");

exports.startCurriculum = functions.database
  .ref("/babies/{babyId}")
  .onWrite(startCurriculum.handler);

exports.userAvatarResize = functions.database
  .ref("/users/{userId}/avatar/url")
  .onWrite(imageResize.handler);

exports.memoriesResize = functions.database
  .ref("/memories/{memoryId}/files/{fileId}/url")
  .onWrite(imageResize.handler);
