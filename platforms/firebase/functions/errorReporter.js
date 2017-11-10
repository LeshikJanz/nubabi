"use strict";

var logging = require("@google-cloud/logging")();

exports.log = function (err) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  var logName = "errors";
  var log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  var metadata = {
    resource: {
      type: "cloud_function",
      labels: { function_name: process.env.FUNCTION_NAME }
    }
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  var errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: "cloud_function"
    },
    context: context
  };

  // Write the error log entry
  return new Promise(function (resolve, reject) {
    log.write(log.entry(metadata, errorEvent), function (error) {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
};