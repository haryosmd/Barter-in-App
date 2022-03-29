const imagekit = require("./imagekit");

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    imagekit
      .upload({
        file: file.buffer,
        fileName: `my_file_name.jpg`,
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
}

module.exports = uploadFile;
