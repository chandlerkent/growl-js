var os = require("os");
var sprintf = require("printf").sprintf;

exports.defaults = function() {
    return {
        "name": "growlnotify",
        "message": "default message",
        "title": "default title",
        "priority": "0",
        "sticky": false,
        "image": null
    };
};

exports.postNotification = function(userOptions) {
    var options = prepareOptions(userOptions);
    
    var args = [];
    var format = [];
    
    prepareGrowlNotifyCommand(options, args, format);
    
    var cmd = sprintf.apply(this, [format.join(" ")].concat(args));
    os.system(cmd);
};

exports.resetOptions = function() {
    exports.options = exports.defaults();
};

exports.options = exports.defaults();

// ----------------------------------------- //

function prepareOptions(mostSpecificOptions) {
    var options = exports.defaults();
    
    for (var prop in exports.options) {
        options[prop] = exports.options[prop];
    }
    
    for (var prop in mostSpecificOptions) {
        options[prop] = mostSpecificOptions[prop];
    }
    
    return options;
}

function prepareGrowlNotifyCommand(options, args, format)
{
    format.push("growlnotify");
    for (var prop in options) {
        if (prop === "sticky") {
            if (options[prop])
                format.push("--" + prop);
            continue;
        }
        
        if (prop === "image") {
            if (options[prop] !== null) {
                args.push(options[prop].toString());
                format.push("--" + prop);
                format.push("%s");
            }
            continue;
        }

        args.push(options[prop].toString());
        format.push("--" + prop);
        format.push("'%s'");
    }
}