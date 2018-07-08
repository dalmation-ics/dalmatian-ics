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
import * as Store from 'electron-store'; // https://www.npmjs.com/package/electron-store

// Initialize store
const store = new Store({
    encryptionKey: 'dalmatian' // Encrypt config.json file to deter end user modification of the file
});

export default store;
