/**
 * A thunk version of BindActionCreator
 * @param mapObject
 * @param dispatch
 * @returns {{}}
 *
 * ex.
 * const action_Redirect =
 *  function(redirectPath) {
 *      return function(dispatch) {
 *          dispatch({type: 'ACTION_REDIRECT', paylod: 'redirectPath');
 *      }
 *  }
 *
 * thunkBindActionCreator({
 *      redirect: action_Redirect
 *      pathChange: action_PathChange // Not included in this example
 * },dispatch);
 */
export default (mapObject, dispatch) => {

  if (!mapObject)
    throw new Error('mapObject not passed to thunkBindActionCreator');

  if (!dispatch)
    throw new Error('dispatched not passed to thunkBindActionCreator');

  let out = {};

  const actionNames = Object.keys(mapObject); // ['redirect','pathChange']
  actionNames.forEach(name => {

    // name = redirect
    const targetFunction = mapObject[name]; // action_Redirect

    const dispatchWrappedFunction = (arg) => (dispatch(
        targetFunction(arg))); // Still allows arguments to be passed to action

    out[name] = dispatchWrappedFunction;
    /**
     *  "out" = {
         *      redirect: function(arg) {
         *          dispatch(action_Redirect(arg));
         *      }
         *  }
     */
  });

  return out;

};
