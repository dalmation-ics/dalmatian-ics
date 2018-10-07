import {combineReducers} from 'redux';
import reducer_Archive from './reducer_Archive';
/**
 * Reducers
 */
import reducer_FormTemplate from './reducer_FormTemplate';
import reducer_Nav from './reducer_Nav';
import reducer_UI from './reducer_UI';

export default combineReducers({
	formTemplateStore: reducer_FormTemplate,
	navStore: reducer_Nav,
	uiStore: reducer_UI,
	archiveStore: reducer_Archive,
});
