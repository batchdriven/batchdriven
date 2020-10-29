import React from 'react';
import { StyleSheet, Platform, Image, Text, View, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';
import styles from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Firebase from '../../config/config'
import { Loader } from '../../components/Loader';
import Colors from '../../constatnts/Colors';
import { getUsersList, setUsersList } from '../../redux/action';

class Home extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Home</Text>,
  });

  state = {
    currentUser: null,
    loading: false,
  }

  componentDidMount = async () => {

    const { currentUser } = Firebase.auth()
    console.log('home currentUser : ', currentUser)
    this.setState({ currentUser })

    this.showLoader()
    await this.props.getUsersList()
    this.hideLoader()
    console.log('this.props.data.users_list', this.props.data.users_list)

  }

  _deleteUsers = (userId, index) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete user?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.networkCallForDeleteUser(userId, index) },
      ],
      { cancelable: false }
    );

  }

  networkCallForDeleteUser = (userId, index) => {
    this.showLoader()
    const userRef = Firebase.firestore().collection('users').doc(`${userId}`);

    userRef
      .delete()
      .then(() => {
        console.log('User deleted!');
        Firebase.auth().delete(userId)
        this.props.setUsersList([...this.props.data.users_list.slice(0, index), ...this.props.data.users_list.slice(index + 1)])

        this.hideLoader()
      });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }

  hideLoader = () => {
    this.setState({ loading: false });
  }

  Item = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  }

  render() {
    if (this.props.data !== undefined || this.props.data !== null || this.props.data.users_list != undefined || this.props.data.users_list != null) {
      return (
        <View style={styles.container}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.props.data.users_list}
            style={{ paddingTop: 16 }}
            renderItem={({ item, index }) =>
              <View style={styles.row} key={index}>
                <View style={{ flex: 1 }}>
                  <Text style={{ flex: 1, fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                  <Text style={{ flex: 1, color: Colors.borderColor }}>{item.email}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <TouchableOpacity style={{ marginEnd: 8 }} onPress={() => this.props.navigation.navigate('EditUserDetails', {
                    title: 'Edit User Details',
                    data: item
                  })}>
                    <IconFontAwesome name="edit" size={24} color={Colors.primaryColor} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._deleteUsers(item.id, index)}>
                    <Icon name="delete-outline" size={28} color={Colors.primaryColor} />
                  </TouchableOpacity>
                </View>
              </View>
            }
            keyExtractor={(item, index) => <View style={{ marginBottom: 20 }}></View>}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditUserDetails',
              {
                editProfile: 'yes',
                title: 'Edit Profile'
              }
            )}
            style={styles.touchableOpacityStyle}>
            <Icon name="account-edit-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Loader loading={this.state.loading} />
        </View>
      )
    }
  }
}

// state map
const mapStateToProps = state => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsersList: async () => {
      await dispatch(getUsersList())
    },
    setUsersList: async (data) => {
      await dispatch(setUsersList(data))
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)