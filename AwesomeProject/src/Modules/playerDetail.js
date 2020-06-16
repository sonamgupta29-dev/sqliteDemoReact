/*Screen to view single user*/
import React from 'react';
import {  View ,Text,Image, AsyncStorage} from 'react-native';
import Button from '../Common/Button'
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' }); 
export default class playerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userData: '',
    };
  } 
  componentDidMount()
  {
    this.searchUser()
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('emailId');
      if (value !== null) {
        // We have data!!
        this.setState({userEmail:value})

        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  searchUser = async() => {
    const value = await AsyncStorage.getItem('emailId');

    const { userEmail } = this.state;
    console.log(this.state.userEmail);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where email = ?',
        [value],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState({
              userData: results.rows.item(0),
            });
            console.log(userData);

          } else {
            alert('No user found');
            this.setState({
              userData: '',
            });
          }
        }
      );
    });
  };
  render() {
    return (
      <View style = {{backgroundColor : "white",flex :1}}>        
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Image source = {require('../Unknown.png')}/>
          <Text style = {{fontSize:16,margin:20}}>Player's Name: {this.state.userData.fullName}</Text>
          <Text style = {{fontSize:16,margin:20}}>Player's Contact Number: {this.state.userData.contactNumber}</Text>
          <Text style = {{fontSize:16,margin:20}}>Player's Email Address: {this.state.userData.email}</Text>
          <Text style = {{fontSize:16,margin:20}}>Player's Parent Name : {this.state.userData.parentName}</Text>
          <Text style = {{fontSize:16,margin:20}}>Player's Height : {this.state.userData.height}</Text>
          <Text style = {{fontSize:16,margin:20}}>Player's Overall GPA : {this.state.userData.overallGpa}</Text>
          <Text style = {{fontSize:16,margin:20}}>Player's  Test Score : {this.state.userData.testScore}</Text>


        </View>
      </View>
    );
  }
}
