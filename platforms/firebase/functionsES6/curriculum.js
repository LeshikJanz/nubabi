"use strict";

const request = require("request-promise"),
  moment = require("moment"),
  logging = require("@google-cloud/logging")(),
  functions = require("firebase-functions"),
  errorReporter = require("./errorReporter");

exports.handler = event => {
  if (!event.data.exists()) {
    return;
  }

  //firebase functions:config:set nubabi.api_url=https://api-staging.nubabi.com/
  const NUBABI_API_URL = functions.config().nubabi.api_url;

  //firebase functions:config:set nubabi.token=12345
  const NUBABI_TOKEN = functions.config().nubabi.token;

  var birthDate = moment(event.data.dob);
  var weekBorn = 40;
  if (event.data.weekBorn !== undefined) {
    weekBorn = event.data.weekBorn;
  }
  if (event.data.previous.exists()) {
    var previousBirthDate = moment(event.data.previous.dob);
    var previousWeekBorn = moment(event.data.previous.weekBorn);
    if (previousBirthDate == birthDate && previousWeekBorn == weekBorn) {
      return;
    }
  }
  return request({
    uri: `${NUBABI_API_URL}babies/${event.params.babyId}/activities`,
    method: "POST",
    json: true,
    body: {
      birth_date: birthDate.format("YYYY-MM-DD"),
      week_born: weekBorn
    },
    headers: {
      Authorization: `Bearer ${NUBABI_TOKEN}`
    },
    resolveWithFullResponse: true
  })
    .then(response => {
      if (response.statusCode >= 400) {
        reportError(new Error(`HTTP Error: ${response.statusCode}`), {
          user: event.params.babyId
        });
      }
    })
    .catch(error => {
      errorReporter.log(error, { user: event.params.babyId });
    });
};
