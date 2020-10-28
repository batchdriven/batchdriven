import * as Action from './action';

const initialState = {
  users_list: []
}

const reducer = (state = initialState, action) => {
  console.log(action.payload)
  switch (action.type) {

    case Action.GET_USERS_LIST:
      console.log('GET_USERS_LIST', action.payload)
      return {
        ...state,
        users_list: action.payload
      };

    case Action.UPDATE_USERS_LIST:
      console.log('UPDATE_USERS_LIST', action.payload)
      return {
        ...state,
        users_list: action.payload
      };


    default:
      return state;
  }
}

export default reducer;