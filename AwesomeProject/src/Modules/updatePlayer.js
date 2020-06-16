

import React, { Component } from 'react'
import { View, TouchableOpacity ,Alert,AsyncStorage} from 'react-native'

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import  Textfield  from '../Common/Textfield'
import LoadingView from '../Common/LoadingView'
import Button from '../Common/Button'
import Text from '../Common/AppText'
import * as colors from '../Common/colors'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
const isValidEmail = (email) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
class UpdatePlayer extends Component {
    
    state = {
        fullName: '',
        mobile: '',
        email: '',
        password: '',
        isSecurePassword: true,
        confirmPassword: '',
        isSecureConfirmPassword: true,
        parentName: '',
        height : "",
        overallGPA : "",
        testScore : ""
    }

componentDidMount(){
   this.userDetail()
}
userDetail = async () =>
{
    const value = await AsyncStorage.getItem('emailId');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where email = ?',
        [value],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
         console.log(results.rows.item(0))
            this.setState({
                fullName:results.rows.item(0).fullName,
                mobile:results.rows.item(0).contactNumber,
                 email:results.rows.item(0).email,
                  parentName : results.rows.item(0).parentName,
                  overallGPA :  results.rows.item(0).overallGpa,
                  height :  results.rows.item(0).height,
                  testScore:  results.rows.item(0).testScore
            });
          }else{
            alert('No user found');
            this.setState({
              fullName:'',
              mobile:'',
              email:'',
              parentName:''
            });
          }
        }
      );
    });
}
    updateProfile = () => {
        var that = this;
        const { fullName,mobile,email,parentName,height,overallGPA,testScore,password } = this.state;
        
        if (this.state.fullName.length == 0) {
            this.fullName.showError('Full name is required')
            return
        }
       
        else if (this.state.mobile.length == 0) {
            this.mobile.showError('Phone number is required')
            return
        }
        else if (this.state.mobile.length < 10) {
            this.mobile.showError('Invalid Phone number')
            return
        }
        else if (this.state.email.length == 0) {
            this.email.showError('Email is required')
            return
        }
        else if (!isValidEmail(this.state.email)) {
            this.email.showError('Invalid email')
            return
        }
        
        else {
            
                db.transaction(function(tx) {
                  tx.executeSql(
                    'UPDATE table_user set fullName=?, contactNumber=?, parentName=?,height=?, overallGpa=?,testScore=? where email=?',
                    [fullName,mobile,parentName,height,overallGPA,testScore,email],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);
                      if (results.rowsAffected > 0) {
                        Alert.alert(
                          'Success',
                          'Your profile updated Successfully',
                          [
                            {
                              text: 'Ok',
                              onPress: () =>
                                that.props.navigation.navigate('HomeScreen'),
                            },
                          ],
                          { cancelable: false }
                        );
                      } else {
                        alert('Your profile updation Failed');
                      }
                    }
                  );
                });
              } 
    }


    

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                    style={{
                        paddingHorizontal: 30,
                        paddingBottom: 30,
                        width: '100%',
                    }}
                    bounces={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Image source={logo} resizeMode='center' /> */}

                        <Textfield
                            label='Full Name'
                            value={this.state.fullName}
                            onChangeText={text => {
                                this.setState({ fullName: text })
                                this.fullName.hide(true)
                            }}
                            ref={(ref) => { this.fullName = ref }}
                            style={{ marginTop: 40, width: '100%' }}
                            autoCapitalize='none'
                        />
                        
                        <Textfield
                            label='Phone Number'
                            value={this.state.mobile}
                            onChangeText={text => {
                                this.setState({ mobile: text })
                                this.mobile.hide(true)
                            }}
                            keyboardType='phone-pad'
                            maxLength={14}
                            ref={(ref) => { this.mobile = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                        />

                        <Textfield
                            label='Email'
                            value={this.state.email}
                            onChangeText={text => {
                                this.setState({ email: text })
                                this.email.hide(true)
                            }}
                            editable = {false}
                            ref={(ref) => { this.email = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                        />

                        

                        <Textfield
                            label='Parent name'
                            value={this.state.parentName}
                            onChangeText={text => {
                                this.setState({ parentName: text })
                                this.parentName.hide(true)
                            }}
                            ref={(ref) => { this.parentName = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                        />
                        <Textfield
                            label='Height'
                            value={this.state.height}
                            onChangeText={text => {
                                this.setState({ height: text })
                                this.height.hide(true)
                            }}
                            ref={(ref) => { this.height = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                        />
<Textfield
                            label='Overall GPA'
                            value={this.state.overallGPA}
                            onChangeText={text => {
                                this.setState({ overallGPA: text })
                                this.overallGPA.hide(true)
                            }}
                            ref={(ref) => { this.overallGPA = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                        />
                        <Textfield
                            label='Test Score'
                            value={this.state.testScore}
                            onChangeText={text => {
                                this.setState({ testScore: text })
                                this.height.hide(true)
                            }}
                            ref={(ref) => { this.testScore = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                        />

                        <Button onPress={() => { this.updateProfile() }} title='Update' style={{ width: '100%', marginTop: 30 }} />

    


                    </View>


                   



                </KeyboardAwareScrollView>
                <LoadingView ref={(ref) => { this.loader = ref }} />

            </View>
        )
    }
}

export default UpdatePlayer