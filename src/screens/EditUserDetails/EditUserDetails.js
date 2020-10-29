import React from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Keyboard, AsyncStorage } from 'react-native';
import styles from './style'
import { connect } from 'react-redux';
import Firebase from '../../config/config'
import { Loader } from '../../components/Loader';
import Icon from 'react-native-vector-icons/AntDesign';
import { setUsersList } from '../../redux/action';
import Constant from '../../constatnts/Constant';
import Utils from '../../constatnts/Utils';

class EditUserDetails extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{navigation.getParam('title')}</Text>,
    headerRight: () => <View>
      {navigation.getParam('editProfile') !== undefined && navigation.getParam('editProfile') != null && navigation.getParam('editProfile') == 'yes' &&
        (<TouchableOpacity onPress={async () => {
          await AsyncStorage.clear()
          navigation.navigate('Login')
        }}
          style={{ marginEnd: 20 }}>
          <Icon name="logout" size={24} />
        </TouchableOpacity>
        )}
    </View>,
  });

  state = {
    name: '',
    email: '',
    data: null,
    errorMessage: null,
    loading: false
  }

  componentDidMount = async () => {
    let data = null
    let editProfile = this.props.navigation.getParam('editProfile')
    console.log('editProfile : ', editProfile)
    if (editProfile !== undefined && editProfile != null && editProfile == 'yes') {
      var userInfo = await AsyncStorage.getItem(Constant.USERINFO);
      data = JSON.parse(userInfo)
      console.log(' data : ', data)
      await this.setState({
        data: data,
        name: data !== undefined && data !== null && data.name,
        email: data !== undefined && data !== null && data.email
      })

      console.log("AsyncStorage item : ", this.state.name)
    } else {
      data = this.props.navigation.getParam('data')
      await this.setState({
        data: data,
        name: data !== undefined && data !== null && this.props.navigation.getParam('data').name,
        email: data !== undefined && data !== null && this.props.navigation.getParam('data').email
      })

      console.log("data item : ", this.state.name)
    }

  }

  saveChanges = () => {
    Keyboard.dismiss()
    if (this.state.name.trim().length == 0) {
      return alert('Name is required');
    }

    this.showLoader()
    const userRef = Firebase.firestore().collection('users').doc(`${this.state.data.id}`);

    userRef
      .update({
        name: this.state.name.trim(),
      })
      .then(async () => {
        console.log('User updated!');
        const newArray = [...this.props.data.users_list];
        console.log('newArray : ', newArray)
        newArray.forEach((element, index) => {
          if (element.id === this.state.data.id) {
            newArray[index].name = this.state.name;
            Utils.saveData(element)
          }
        });

        console.log('after update : ', newArray)

        await this.props.setUsersList(newArray)
        this.hideLoader()

        this.props.navigation.navigate('Home')

      });

  }

  showLoader = () => {
    this.setState({ loading: true });
  }

  hideLoader = () => {
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          placeholder="Name"
          autoCapitalize="words"
          style={[styles.textInput, { marginTop: 60 }]}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          editable={false}
        />

        <TouchableOpacity onPress={this.saveChanges} style={[styles.btn, { marginTop: 60 }]}>
          <Text style={styles.btn_txt}>Save Changes</Text>
        </TouchableOpacity>

        <Loader loading={this.state.loading} />
      </View>
    )
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
    setUsersList: (data) => {
      dispatch(setUsersList(data))
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserDetails)