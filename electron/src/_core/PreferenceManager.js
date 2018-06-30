"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PreferenceManager is intended for small storage operations much like the PreferenceManager from Android.
 *
 * Use PreferenceManager.set('key',value) to store a value.
 *
 * Use PreferenceManager.get('key') to retrieve a stored value.
 *  Unresolved keys will return undefined.
 *
 * Use PreferenceManager.has('key') to check if a value exists.
 *
 */
var Store = require("electron-store"); // https://www.npmjs.com/package/electron-store
// Initialize store
var store = new Store({
    encryptionKey: 'dalmatian' // Encrypt config.json file to deter end user modification of the file
});
exports.default = store;
