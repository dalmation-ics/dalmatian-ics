// @flow
export type Action = {
  type: string,
  payload?: any | null,
  state?: string | null
};
export type State = Object;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

