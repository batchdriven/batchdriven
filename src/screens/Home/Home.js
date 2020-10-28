import React from 'react';
import { StyleSheet, Platform, Image, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import styles from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Firebase from '../../config/config'
//import { getImageList } from "../../redux/action";
import { Loader } from '../../components/Loader';
import Colors from '../../constatnts/Colors';

export default class Home extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Home</Text>,
  });

  state = {
    currentUser: null,
    loading: false,
    data: [
      { name: 'seema nagar', },
      { name: 'Mayuri Mishra' },
      { name: 'seema nagar', },
      { name: 'Mayuri Mishra' },
      { name: 'seema nagar', },
      { name: 'Mayuri Mishra' },
      { name: 'seema nagar', },
      { name: 'Mayuri Mishra' }
    ]
  }

  // componentDidMount = async () => {

  //   const { currentUser } = Firebase.auth()
  //   console.log('home currentUser : ', currentUser)
  //   this.setState({ currentUser })

  //   this.showLoader()
  //   await this.props.getImageList(currentUser.uid)
  //   this.hideLoader()
  //   console.log('this.props.data.image_list', this.props.data.image_list)
  //   // this.networkCallForGetFeeds(currentUser.uid)
  //   //   .then(() => console.log('Feed updated'))
  //   //   .catch(error => console.error(error));

  // }

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

    return (
      <View style={styles.container}>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={this.state.data}
          style={{ paddingTop: 16 }}
          renderItem={({ item, index }) =>
            <View style={styles.row} key={index}>
              <Text style={{ flex: 1 }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ marginEnd: 8 }} onPress={() => this.props.navigation.navigate('EditUserDetails', {
                  title: 'Edit User Details'
                })}>
                  <IconFontAwesome name="edit" size={24} color={Colors.primaryColor} />
                </TouchableOpacity>
                <TouchableOpacity >
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

//state map
// const mapStateToProps = state => {
//   return {
//     data: state.data
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     // getImageList: async (uid) => {
//     //   await dispatch(getImageList(uid))
//     // },
//   }

// }

// // export default connect(mapStateToProps, mapDispatchToProps)(Home)