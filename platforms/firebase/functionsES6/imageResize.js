"use strict";

const request = require("request-promise"),
  logging = require("@google-cloud/logging")(),
  gcs = require(`@google-cloud/storage`)({
    projectId: "nubabitest1",
    keyFilename: "./keyfile.json"
  }),
  functions = require("firebase-functions"),
  errorReporter = require("./errorReporter");

exports.handler = event => {
  var eventSnapshot = event.data;
  if (!eventSnapshot.exists()) {
    console.log("No data");
    return;
  }
  if (eventSnapshot.val() === "") {
    console.log("Empty string");
    return;
  }
  const parentRef = event.data.ref.parent;
  const parentPath = parentRef
    .toString()
    .substring(parentRef.root.toString().length - 1);
  const NUBABI_API_URL = functions.config().nubabi.api_url;
  const NUBABI_TOKEN = functions.config().nubabi.token;

  console.log(
    `Starting image resize request to ${NUBABI_API_URL}images with path param: `,
    parentPath
  );
  return request({
    uri: `${NUBABI_API_URL}images`,
    method: "POST",
    json: true,
    body: {
      path: parentPath
    },
    headers: {
      Authorization: `Bearer ${NUBABI_TOKEN}`
    },
    resolveWithFullResponse: true
  })
    .then(response => {
      if (response.statusCode >= 400) {
        reportError(new Error(`HTTP Error: ${response.statusCode}`));
      } else {
        console.log("Successfully completed image resize request");
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      errorReporter.log(error);
    });
};
