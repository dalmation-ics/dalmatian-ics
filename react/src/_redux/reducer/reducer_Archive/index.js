import _ from 'lodash';
import actionStatus, {ActionStatus} from 'src/_core/redux/types/actionStatus';
import * as action_Archive_Suite_Load
  from '../../action/action_Archive_Suite/action_Archive_Suite_Load';
import * as action_Archive_Suite_Save
  from '../../action/action_Archive_Suite/action_Archive_Suite_Save';
import * as action_Archive_Suite_Blank
  from '../../action/action_Archive_Suite/action_Archive_Suite_Blank';
import * as action_Archive_Suite_CheckPassedFile
  from '../../action/action_Archive_Suite/action_Archive_Suite_CheckPassedFile';
import * as action_Archive_Suite_Email
  from '../../action/action_Archive_Suite/action_Archive_Suite_Email';
import * as action_Archive_Item_New
  from '../../action/action_Archive_Item/action_Archive_Item_New';
import * as action_Archive_Item_Select
  from '../../action/action_Archive_Item/action_Archive_Item_Select';
import * as action_Archive_Item_Delete
  from '../../action/action_Archive_Item/action_Archive_Item_Delete';
import * as action_Archive_Item_Rename
  from '../../action/action_Archive_Item/action_Archive_Item_Rename';
import * as action_Archive_Item_Update
  from '../../action/action_Archive_Item/action_Archive_Item_Update';
import * as action_Archive_Suite_Import
  from '../../action/action_Archive_Item/action_Archive_Item_Import';
import * as action_Archive_Item_Duplicate
  from '../../action/action_Archive_Item/action_Archive_Item_Duplicate';
import uuid from 'uuid';
import type {State} from 'src/_core/redux/types/';

type STATE = State & {
  archiveAddNewStatus: ActionStatus | null,
  archiveAddNewError?: any | null,
  archiveImportStatus: ActionStatus | null,
  archiveImportError?: any | null,
  archiveHasUnsavedChanges: boolean | null,
  saveArchiveStatus: ActionStatus | null,
  saveArchiveError?: any | null,
  loadArchiveStatus: ActionStatus | null,
  loadArchiveError?: any | null,
  checkPassedFileStatus: ActionStatus | null,
  checkPassedFileError?: any | null,
  emailOpenExternalStatus: ActionStatus | null,
  emailOpenExternalError?: any | null,
  saveFileToSuiteStatus: ActionStatus | null,
  saveFileToSuiteError?: any | null,
  archive: Array<object> | null,
  suiteSelectedUUID: uuid.v4 | uuid.v6 | string | null,
  filePath: string | null,
}

// What should be in this store when the application is first started
const DEFAULT_STATE: STATE = {

  /**
   *  Add new item to suite
   *
   *  Affected by:
   *  action_Archive_Item_New
   */
  archiveAddNewStatus: actionStatus.UNINITIALIZED,
  archiveAddNewError: null,

  /**
   *  Import XML file
   *
   *  Affected by:
   *  action_Archive_Suite_Import
   */
  archiveImportStatus: actionStatus.UNINITIALIZED,
  archiveImportError: null,

  /**
   * HasUnsavedChangesIndicator
   *
   * Affected by:
   * action_Archive_Suite_Save
   * action_Archive_Suite_Load
   * action_Archive_Suite_Import
   * action_Archive_Suite_Blank
   * action_Archive_Item_Delete
   * action_Archive_Item_Rename
   * action_Archive_Item_Update
   * action_Archive_Item_New
   * action_Archive_Item_Duplicate
   */
  archiveHasUnsavedChanges: false,

  /**
   * Save
   *
   * Affected by:
   * action_Archive_Suite_Save
   */
  saveArchiveStatus: actionStatus.UNINITIALIZED,
  saveArchiveError: null,

  /**
   * Load
   *
   * Affected by:
   * action_Archive_Suite_Load
   */
  loadArchiveStatus: actionStatus.UNINITIALIZED,
  loadArchiveError: null,

  /**
   * CheckPassedFile
   *
   * Affected by:
   * action_Archive_Suite_CheckPassedFile
   */
  checkPassedFileStatus: actionStatus.UNINITIALIZED,
  checkPassedFileError: null,

  /**
   * CheckPassedFile
   *
   * Affected by:
   * action_Archive_Suite_CheckPassedFile
   */
  emailOpenExternalStatus: actionStatus.UNINITIALIZED,
  emailOpenExternalError: null,

  /**
   * Save html to suite
   * Affected by:
   * action_Archive_Item_Update
   */
  saveFileToSuiteStatus: actionStatus.UNINITIALIZED,
  saveFileToSuiteError: null,

  /**
   * ArchiveData
   *
   * Affected by:
   * action_Archive_Suite_Load
   * action_Archive_Item_Delete
   * action_Archive_Item_Update
   * action_Archive_Item_New
   */
  archive: [],

  /**
   * SuiteSelectedUUID
   *
   * Affected by:
   * action_Archive_Item_Select
   */
  suiteSelectedUUID: null,

  filePath: null,

  /**
   * Master error
   */
  err: null,
};

const checkForSameFileName = (file, newState) => {

  if (!file.fileName || file.fileName === '')
    file.fileName = file.id;

  const findDuplicateName = (w => {
    if (w.uuid === file.uuid)
      return false;
    return w.fileName === file.fileName;
  });

  const origName = file.fileName;

  let index = 0;
  while (newState.archive.find(findDuplicateName) !== undefined)
    file.fileName = `${origName}_${++index}`;

  return file;

};

/**
 *
 * @param previousState If previous state is null (as it should be on start), then use DEFAULT_STATE
 * @param action The action that triggered this reducer
 * @returns {*}
 */
export default (previousState = DEFAULT_STATE, action) => {

  let newState = _.cloneDeep(previousState);

  let {type, payload, status} = action;

  switch (type) {

      /**
       * action_Archive_Suite_Save
       */
    case action_Archive_Suite_Save.TYPE: {
      newState.saveArchiveStatus = status;
      switch (status) {

          // Started
        case actionStatus.STARTED: {
          newState.saveArchiveError = null;
          break;
        }

        case actionStatus.COMPLETE: {
          if (payload && payload !== '') {
            newState.filePath = payload;
            newState.archiveHasUnsavedChanges = false;
          }
          break;
        }

          // Error
        case actionStatus.ERROR: {
          newState.saveArchiveError = payload;
          break;
        }

        default:
          break;
      }
      break;
    }

      /**
       * action_Archive_Suite_Load
       */
    case action_Archive_Suite_Load.TYPE: {
      newState.loadArchiveStatus = status;
      switch (status) {

          // Started
        case actionStatus.STARTED: {
          newState.loadArchiveError = null;
          break;
        }

          // Complete
        case actionStatus.COMPLETE: {
          newState.archive = payload;
          newState.suiteSelectedUUID = null;
          newState.filePath = action.filePath;
          newState.archiveHasUnsavedChanges = false;
          break;
        }

          // Error
        case actionStatus.ERROR: {
          newState.loadArchiveError = payload;
          break;
        }

        default:
          break;
      }
      break;
    }

      /**
       * action_Archive_Suite_CheckPassedFile
       */
    case action_Archive_Suite_CheckPassedFile.TYPE: {
      newState.checkPassedFileStatus = status;
      switch (status) {
        case actionStatus.STARTED: {
          newState.checkPassedFileError = null;
          break;
        }
        case actionStatus.COMPLETE: {
          if (payload !== false) {
            newState.filePath = payload;
          }
          break;
        }
        case actionStatus.ERROR: {
          newState.checkPassedFileError = payload;
          break;
        }
      }
      break;
    }

      /**
       * action_Archive_Suite_Email
       */
    case action_Archive_Suite_Email.TYPE: {
      newState.emailOpenExternalStatus = status;
      switch (status) {
        case actionStatus.STARTED: {
          newState.emailOpenExternalError = null;
          break;
        }
        case actionStatus.ERROR: {
          newState.emailOpenExternalError = payload;
        }
      }
      break;
    }

      /**
       * action_Archive_Item_Select
       */
    case action_Archive_Item_Select.TYPE: {
      newState.suiteSelectedUUID = payload;
      break;
    }

      /**
       * action_Archive_Item_Delete
       */
    case action_Archive_Item_Delete.TYPE: {
      const index = _.findIndex(newState.archive,
          f => f.uuid === newState.suiteSelectedUUID);
      newState.archive.splice(index, 1);
      newState.suiteSelectedUUID = null;
      newState.archiveHasUnsavedChanges = true;
      break;
    }

      /**
       * action_Archive_Item_Rename
       */
    case action_Archive_Item_Rename.TYPE: {
      const index = _.findIndex(newState.archive,
          f => f.uuid === newState.suiteSelectedUUID);
      let entry = newState.archive[index];
      entry.fileName = payload;
      entry = checkForSameFileName(entry, newState);
      newState.archiveHasUnsavedChanges = true;
      break;
    }

      /**
       * action_Archive_Item_Update
       */
    case action_Archive_Item_Update.TYPE: {
      const index = _.findIndex(newState.archive,
          f => f.uuid === newState.suiteSelectedUUID);
      newState.archive[index].content = payload;
      newState.archiveHasUnsavedChanges = true;
      break;
    }

      /**
       * action_Archive_Item_New
       */
    case action_Archive_Item_New.TYPE: {
      newState.archiveAddNewStatus = status;
      switch (status) {
        case actionStatus.STARTED: {
          newState.archiveAddNewError = null;
          break;
        }
        case actionStatus.COMPLETE: {
          payload = checkForSameFileName(payload, newState);
          newState.archive.push(payload);
          newState.archiveHasUnsavedChanges = true;
          break;
        }
        case actionStatus.ERROR: {
          newState.archiveAddNewError = payload;
          break;
        }
        default:
          break;
      }
      break;
    }

      /**
       * action_Archive_Suite_Import
       */
    case action_Archive_Suite_Import.TYPE: {
      switch (status) {
        case actionStatus.STARTED: {
          newState.archiveImportError = null;
          break;
        }
        case actionStatus.COMPLETE: {
          payload = checkForSameFileName(payload, newState);
          newState.archive.push(payload);
          newState.archiveHasUnsavedChanges = false;
          break;
        }
        case actionStatus.ERROR: {
          newState.archiveImportError = action.payload;
          break;
        }
        default: {
          break;
        }
      }
      break;
    }

      /**
       * action_Archive_Item_Duplicate
       */
    case action_Archive_Item_Duplicate.TYPE: {

      const index = _.findIndex(newState.archive,
          f => f.uuid === newState.suiteSelectedUUID);
      let entry = _.cloneDeep(newState.archive[index]);
      entry.uuid = uuid.v4();
      entry = checkForSameFileName(entry, newState);
      newState.archive.push(entry);
      newState.archiveHasUnsavedChanges = true;
      break;
    }

      /**
       * action_Archive_Suite_Blank
       */
    case action_Archive_Suite_Blank.TYPE: {
      newState.archive = [];
      newState.filePath = null;
      newState.suiteSelectedUUID = null;
      newState.archiveHasUnsavedChanges = true;
      break;
    }

    default:
      break;
  }

  // Return the new state
  return newState;
};

