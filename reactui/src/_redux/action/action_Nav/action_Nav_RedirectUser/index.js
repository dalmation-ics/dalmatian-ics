// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';

export const TYPE = 'TYPE_NAV_REDIRECTUSER';
export default (targetPath: string) => (dispatch: Dispatch) => new Promise(
	(resolve, reject) => {
		try {
			dispatch(({type: TYPE, payload: targetPath}: Action));
			resolve();
		} catch (exc) {
			reject(exc);
		}
	});

