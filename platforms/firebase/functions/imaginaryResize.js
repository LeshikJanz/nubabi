"use strict";

const request = require("request-promise"),
  logging = require("@google-cloud/logging")(),
  gcs = require(`@google-cloud/storage`)({
    projectId: "nubabitest1",
    keyFilename: "./keyfile.json"
  }),
  path = require("path"),
  os = require("os"),
  fs = require("fs"),
  imaginary = require("imaginary"),
  functions = require("firebase-functions"),
  admin = require("firebase-admin"),
  crypto = require("crypto"),
  sizeOf = require("image-size"),
  errorReporter = require("./errorReporter");

admin.initializeApp(functions.config().firebase);

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
  const url = eventSnapshot.val();
  const bucketName = functions.config().firebase.storageBucket;
  let location = url.replace(
    `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/`,
    ""
  );
  location = location.substring(0, location.indexOf("?"));
  location = unescape(location);

  const fileName = location.substring(
    location.lastIndexOf("/") + 1,
    location.length
  );

  const parentRef = event.data.ref.parent;

  const parentPath = parentRef
    .toString()
    .substring(parentRef.root.toString().length - 1);

  const bucket = gcs.bucket(bucketName);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const tempThumbnailPath = path.join(
    os.tmpdir(),
    crypto.randomBytes(20).toString("hex")
  );
  const tempLargePath = path.join(
    os.tmpdir(),
    crypto.randomBytes(20).toString("hex")
  );
  const file = bucket.file(location);

  parentRef.child("contentType").once("value", function(contentTypeSnapshot) {
    const contentType = contentTypeSnapshot.val();
    return getMetadata(url).then(metadata => {
      return Promise.all([
        updateOriginal(url, metadata, parentPath),
        downloadThumb(url, tempThumbnailPath).then(downloadData => {
          const mimeType = contentType;
          const destFilePath = path.join(
            path.dirname(location),
            `thumb_${fileName}`
          );
          return uploadToStorage(
            downloadData.destination,
            destFilePath,
            mimeType,
            bucket
          ).then(url => {
            return updateDb(
              url,
              "thumb",
              downloadData.width,
              downloadData.height,
              contentType,
              tempThumbnailPath,
              parentPath
            );
          });
        }),
        downloadLarge(url, tempLargePath).then(downloadData => {
          const mimeType = contentType;
          const destFilePath = path.join(
            path.dirname(location),
            `large_${fileName}`
          );
          return uploadToStorage(
            downloadData.destination,
            destFilePath,
            mimeType,
            bucket
          ).then(url => {
            return updateDb(
              url,
              "large",
              downloadData.width,
              downloadData.height,
              contentType,
              tempLargePath,
              parentPath
            );
          });
        })
      ]).then(() => {
        console.log("[FINISHED]");
        return new Promise((resolve, reject) => {
          fs.unlinkSync(tempThumbnailPath);
          fs.unlinkSync(tempLargePath);
          resolve();
        });
      });
    });
  });
};

function updateOriginal(url, metadata, parentPath) {
  const originalWidth = metadata.width;
  const originalHeight = metadata.height;
  const originalType = metadata.type;
  return new Promise((resolve, reject) => {
    const dbRef = admin.database().ref(parentPath);
    console.log("[updateOriginal] Setting db");
    const dbData = {
      width: metadata.width,
      height: metadata.height
    };
    dbRef.update(dbData).then(() => {
      console.log("[updateOriginal] save complete");
      resolve();
    });
  });
}

function downloadLarge(originalUrl, destinationPath) {
  return new Promise((resolve, reject) => {
    imaginary(originalUrl)
      .server("https://intelligent-livre-73714.herokuapp.com")
      .resize({ width: 600, noprofile: true, quality: 75 })
      .on("error", err => {
        console.error("Cannot resize the image:", err);
      })
      .on("end", () => {
        const dimensions = sizeOf(destinationPath);
        console.log("SIZE OF DIMENSIONS", dimensions);
        resolve({
          destination: destinationPath,
          width: dimensions.width,
          height: dimensions.height
        });
      })
      .pipe(fs.createWriteStream(destinationPath));
  });
}

function downloadThumb(originalUrl, destinationPath) {
  return new Promise((resolve, reject) => {
    imaginary(originalUrl)
      .server("https://intelligent-livre-73714.herokuapp.com")
      .resize({ width: 200, height: 200, noprofile: true, quality: 75 })
      .on("error", err => {
        console.error("Cannot resize the image:", err);
      })
      .on("end", () => {
        resolve({ destination: destinationPath, width: 200, height: 200 });
      })
      .pipe(fs.createWriteStream(destinationPath));
  });
}

function getMetadata(url) {
  const metadataPath = path.join(
    os.tmpdir(),
    crypto.randomBytes(20).toString("hex")
  );
  return new Promise((resolve, reject) => {
    imaginary(url)
      .server("https://intelligent-livre-73714.herokuapp.com")
      .info()
      .on("error", err => {
        console.error("[getMetadata] error", err);
      })
      .on("end", () => {
        fs.readFile(metadataPath, "utf8", (err, data) => {
          if (err) {
            console.log("[getMetadata] error", err);
            reject(err);
          }
          console.log("[getMetadata] metadata", data);
          fs.unlinkSync(metadataPath);
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        });
      })
      .pipe(fs.createWriteStream(metadataPath));
  });
}

function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

function updateDb(
  url,
  fileType,
  width,
  height,
  contentType,
  tempFile,
  parentPath
) {
  return new Promise((resolve, reject) => {
    const dbRef = admin.database().ref(parentPath);
    console.log("[updateDb] Setting db");
    const fileSize = getFilesizeInBytes(tempFile);
    const dbData = {
      url,
      width,
      height,
      contentType,
      size: fileSize
    };
    dbRef.child(fileType).set(dbData).then(() => {
      console.log("[updateDb] save complete");
      resolve();
    });
  });
}

function uploadToStorage(source, destination, mediaType, bucket) {
  return new Promise((resolve, reject) => {
    bucket
      .upload(source, {
        destination,
        metadata: {
          contentType: mediaType
        }
      })
      .then(data => {
        console.log("[uploadToStorage] uploaded", data[0]);
        const file = data[0];
        file
          .getSignedUrl({
            action: "read",
            expires: "10-10-2030"
          })
          .then(data => {
            console.log("[getSignedUrl] success");
            resolve(data[0]);
          });
      });
  });
}
