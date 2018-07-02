// @flow
import _ from 'lodash';
import * as action_Navigation_PathChange
  from '../../action/action_Nav/action_Nav_PathChange';
import * as action_Navigation_RedirectUser
  from '../../action/action_Nav/action_Nav_RedirectUser';
import * as action_Navigation_SelectForm
  from '../../action/action_Nav/action_Nav_SelectForm';
import type {Action, State} from '../../types';

type STATE = State & {
  redirectTarget?: string,
  path?: string,
  selectedFormId?: string
}

const DEFAULT_STATE: STATE = {

  /**
   * RedirectUser
   *
   * Affected by:
   * action_Nav_RedirectUser
   * action_Nav_PathChange
   */
  redirectTarget: null,

  /**
   * Path
   *
   * Affected by:
   * action_Nav_PathChange
   */
  path: '/',

  /**
   * SelectedFormId
   *
   * Affected by:
   * action_Nav_SelectForm
   */
  selectedFormId: null,

};

export default (previousState: STATE = DEFAULT_STATE, action: Action) => {

  let newState = _.cloneDeep(previousState);

  const {type, payload} = action;
  switch (type) {

      /*
       * action_Nav_PathChange
       */
    case action_Navigation_PathChange.TYPE: {
      newState.path = payload;
      newState.redirectTarget = null;
      break;
    }

      /*
       * action_Nav_RedirectUser
       */
    case action_Navigation_RedirectUser.TYPE: {
      newState.redirectTarget = payload;
      break;
    }

      /**
       * action_Nav_SelectForm
       */
    case action_Navigation_SelectForm.TYPE: {
      newState.selectedFormId = payload;
      break;
    }

    default:
      break;
  }

  return newState;

};
