// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';

export const TYPE = 'TYPE_ARCHIVE_ITEM_DUPLICATE';
export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {
	try {
		dispatch(({type: TYPE}: Action));
		resolve();
	} catch (exc) {
		reject(exc);
	}
});
