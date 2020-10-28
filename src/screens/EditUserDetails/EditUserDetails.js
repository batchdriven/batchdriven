import React from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import styles from './style'
import { connect } from 'react-redux';
import Firebase from '../../config/config'
import { Loader } from '../../components/Loader';
import Icon from 'react-native-vector-icons/AntDesign';

export default class EditUserDetails extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{navigation.getParam('title')}</Text>,
    headerRight: <View>
      {navigation.getParam('editProfile') !== undefined && navigation.getParam('editProfile') != null && navigation.getParam('editProfile') == 'yes' && (<TouchableOpacity onPress={() => navigation.navigate('Home')}
        style={{ marginEnd: 20 }}>
        <Icon name="logout" size={24} />
      </TouchableOpacity>)}
    </View>,
  });

  state = { name: '', email: '', password: '', cpassword: '', errorMessage: null, loading: false }

  saveChanges = () => {

  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TouchableOpacity onPress={this.saveChanges} style={styles.btn}>
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

  }

}

// export default connect(mapStateToProps, mapDispatchToProps)(EditUserDetails)