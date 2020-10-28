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
          //throw 'Feed does not exist!';
          data = []
        } else {
          data = querySnapshot.docs.map(doc => doc.data())
        }

        dispatch(setUsersList(data));
        /* ... */
      });

    // console.log('feedReference : ', feedReference)
    // return Firebase.firestore().runTransaction(async transaction => {
    //   console.log('transaction : ', transaction)
    //   // Get feed data first
    //   const feedSnapshot = await transaction.get(feedReference);

    //   console.log('feedSnapshot', feedSnapshot)
    //   let data = []
    //   if (!feedSnapshot.exists) {
    //     //throw 'Feed does not exist!';
    //     data = []
    //   } else {
    //     console.log('feedSnapshot : ', feedSnapshot.data());
    //     data = feedSnapshot.data().images
    //     console.log('data : ', data)
    //   }

    //   dispatch(setUsersList(data));

    // });
  }
}

  // Firebase.database.ref('todos').on('value', (snapshot) => {
  //   const vals = snapshot.val();
  //   let _records = [];
  //   for (var key in vals) {
  //     _records.push({
  //       ...vals[key],
  //       id: key
  //     });
  //   }
  //   // setTodos is a Redux action that would update the todo store
  //   // to the _records payload
  //   dispatch(setImageList(_records));
  // })
