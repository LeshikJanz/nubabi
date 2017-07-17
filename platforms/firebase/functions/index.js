"use strict";

const functions = require("firebase-functions"),
  startCurriculum = require("./curriculum"),
  imageResize = require("./imaginaryResize");

exports.startCurriculum = functions.database
  .ref("/babies/{babyId}")
  .onWrite(startCurriculum.handler);

exports.imageResize = functions.database
  .ref("/users/{userId}/avatar/url")
  .onWrite(imageResize.handler);
