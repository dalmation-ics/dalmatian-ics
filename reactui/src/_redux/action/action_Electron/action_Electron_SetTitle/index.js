import ipcRWrapper from 'src/_core/electron/ipcWrapper';
import {ACT_SET_TITLE} from 'src/_core/contract/electronBridge';

export const TYPE = 'TYPE_ELECTRON_SET_TITLE';
export default (title: string) => () => new Promise((resolve, reject) => {
  try {
    ipcRWrapper.promptSync(ACT_SET_TITLE, title);
    resolve();
  } catch (exc) {
    reject(exc);
  }
});
