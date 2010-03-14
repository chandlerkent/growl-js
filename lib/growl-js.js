var os = require("os");
var sprintf = require("printf").sprintf;

exports.postNotification = function(title, message, image) {
    os.system(sprintf("growlnotify --image %s -m '%s' '%s'", image, message, title));
};