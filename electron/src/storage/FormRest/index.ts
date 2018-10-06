const request = require('superagent');
const async = require('async');
const targetURL = process.env.targetURL ||
    'http://bcics.s3-website-us-east-1.amazonaws.com';

module.exports = {

    getFormsIndex() {
        return new Promise(resolve => {
            request.get(targetURL + '/index.json').end((err, result) => {
                if (err) {
                    console.log(err);
                    reject(new Error('Unable to fetch index.json'));
                } else {
                    resolve(result.text);
                }
            });
        });
    },

    getForms(forms) {
        return new Promise((resolve, reject) => {
            let out = {};
            forms.forEach(f => {
                out[f] = null;
            });
            async.mapValues(out, (value, key, _callback) => {
                request.get(targetURL + '/' + key + '.html').
                    end((err, result) => {

                        if (err) {
                            // If there is an error log it and continue
                            console.log(err.message);
                            _callback(null, {
                                err: err.message,
                                result: null,
                            });
                        } else {
                            _callback(null, {
                                err: null,
                                result: result.text,
                            });
                        }

                    });
            }, (err, result) => {
                if (!err)
                    resolve(result);
                else
                    reject(err);
            });
        });
    },

};