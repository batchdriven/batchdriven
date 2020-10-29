import Firebase from "../config/config";

export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';
export const GET_USERS_LIST = 'GET_USERS_LIST'


export const updateUsersList = (data) => ({
  type: UPDATE_USERS_LIST,
  payload: data
});

export const setUsersList = (data) => ({
  type: GET_USERS_LIST,
  payload: data
});


export const getUsersList = () => {

  console.log('start')
  return async (dispatch) => {
    const feedReference = await Firebase.firestore()
      .collection('users')
      .limit(20)
      .get()
      .then(querySnapshot => {
        console.log('querySnapshot : ', querySnapshot.docs.length)
        let data = []

        if (querySnapshot.docs.length == 0) {
          data = []
        } else {
          data = querySnapshot.docs.map(doc => doc.data())
        }

        dispatch(setUsersList(data));
      });

  }
}
