"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("superagent");
var async = require("async");
var targetURL = process.env.targetURL ||
    'http://bcics.s3-website-us-east-1.amazonaws.com';
exports.default = {
    getFormsIndex: function () {
        return new Promise(function (resolve, reject) {
            request.get(targetURL + '/index.json').end(function (err, result) {
                if (err) {
                    console.log(err);
                    reject(new Error('Unable to fetch index.json'));
                }
                else {
                    resolve(result.text);
                }
            });
        });
    },
    getForms: function (forms) {
        return new Promise(function (resolve, reject) {
            var out = {};
            forms.forEach(function (f) {
                out[f] = null;
            });
            async.mapValues(out, function (value, key, _callback) {
                request.get(targetURL + '/' + key + '.html').end(function (err, result) {
                    if (err) {
                        // If there is an error log it and continue
                        console.log(err.message);
                        _callback(null, {
                            err: err.message,
                            result: null,
                        });
                    }
                    else {
                        _callback(null, {
                            err: null,
                            result: result.text,
                        });
                    }
                });
            }, function (err, result) {
                if (!err)
                    resolve(result);
                else
                    reject(err);
            });
        });
    },
};
