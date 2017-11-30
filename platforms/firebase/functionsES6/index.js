import * as functions from "firebase-functions";
import startCurriculum from "./curriculum";
import imageResize from "./imageResize";

exports.startCurriculum = functions.database
  .ref("/babies/{babyId}")
  .onWrite(startCurriculum.handler);

exports.userAvatarResize = functions.database
  .ref("/users/{userId}/avatar/url")
  .onWrite(imageResize.handler);

exports.babyAvatarResize = functions.database
  .ref("/babies/{babyId}/avatar/url")
  .onWrite(imageResize.handler);

exports.coverImageResize = functions.database
  .ref("/babies/{babyId}/coverImage/url")
  .onWrite(imageResize.handler);

exports.memoriesResize = functions.database
  .ref("/memories/{memoryId}/files/{fileId}/url")
  .onWrite(imageResize.handler);
