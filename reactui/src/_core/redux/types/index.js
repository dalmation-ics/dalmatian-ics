// @flow
import actionStatus, {ActionStatus} from './actionStatus';
/**
 * Action type for redux
 */
export type Action = {
	type: string,
	payload?: any | null,
	state?: ActionStatus | null
};
export type State = Object;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
export type ActionBound = (any) => any;

export default {actionStatus};
