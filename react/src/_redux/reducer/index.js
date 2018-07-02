import {combineReducers} from 'redux';

/**
 * Reducers
 */
//import reducer_Forms from './reducer_Form';
import reducer_Nav from './reducer_Nav';
import reducer_UI from './reducer_UI';
//import reducer_Archive from './reducer_Archive';

export default combineReducers({
//  formsStore: reducer_Forms,
  navStore: reducer_Nav,
  uiStore: reducer_UI,
//  archiveStore: reducer_Archive,
});
