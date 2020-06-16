

import React, { Component } from 'react'
import { View, TouchableOpacity ,Alert} from 'react-native'

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
class Register extends Component {
    
    constructor(props) {
        super(props);
        db.transaction(function(txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function(tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(userId INTEGER PRIMARY KEY AUTOINCREMENT, fullName VARCHAR(20), contactNumber INT(10), email VARCHAR(255),parentName VARCHAR(255),password INT(10),height INT(10),overallGpa VARCHAR(255),testScore NUMERIC(10))',
                  []
                );
              }
            }
          );
        });
      }
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
    _storeData = async () => {
        try {
          await AsyncStorage.setItem("emailId",this.state.email);
        } catch (error) {
          // Error saving data
        }
      };

    authentication = () => {
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
        else if (this.state.password.length == 0) {
            this.password.showError('Password is required')
            return
        }
        else if (this.state.password.length < 6) {
            this.password.showError('Password should be minimum 6 characters long')
            return
        }
        else if (this.state.confirmPassword.length == 0) {
            this.confirmPassword.showError('Confirm password is required')
            return
        }
        else if (this.state.password != this.state.confirmPassword) {
            this.confirmPassword.showError('Password does not matched')
            return
        }
        
        else {
            
                db.transaction(function(tx) {
                  tx.executeSql(
                    'INSERT INTO table_user (fullName,contactNumber,email,parentName,password,height,overallGpa,testScore) VALUES (?,?,?,?,?,?,?,?)',
                    [fullName, mobile, email,parentName,password,height,overallGPA,testScore],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);

                      if (results.rowsAffected > 0) {

                        Alert.alert(
                          'Success',
                          'You are Registered Successfully,Please Login to Continue',
                          [
                            {
                              text: 'Ok',
                              onPress: () =>
                              
                                that.props.navigation.navigate('loginScreen'),
                            },

                          ],
                          { cancelable: false }
                        );
                      } else {
                        alert('Registration Failed');
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
                        <Text text='Signup' style={{ fontSize: 24, padding: 20, textAlign: 'center', fontWeight: '500' }} />

                        <Textfield
                            label='Full Name'
                            value={this.state.fullName}
                            onChangeText={text => {
                                this.setState({ fullName: text })
                                this.fullName.hide(true)
                            }}
                            ref={(ref) => { this.fullName = ref }}
                            style={{ marginTop: 20, width: '100%' }}
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
                            ref={(ref) => { this.email = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                        />

                        <Textfield
                            label='Password'
                            value={this.state.password}
                            onChangeText={text => {
                                this.setState({ password: text })
                                this.password.hide(true)
                            }}
                            maxLength={16}
                            ref={(ref) => { this.password = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                            // rightImage={this.state.isSecurePassword ? hide_password : show_password}
                            secureTextEntry={this.state.isSecurePassword}
                            rightImageTapAction={() => {
                                this.setState({ isSecurePassword: !this.state.isSecurePassword })
                            }}
                        />

                        <Textfield
                            label='Confirm Password'
                            value={this.state.confirmPassword}
                            onChangeText={text => {
                                this.setState({ confirmPassword: text })
                                this.confirmPassword.hide(true)
                            }}
                            maxLength={16}
                            ref={(ref) => { this.confirmPassword = ref }}
                            style={{ marginTop: 30, width: '100%' }}
                            autoCapitalize='none'
                            // rightImage={this.state.isSecureConfirmPassword ? hide_password : show_password}
                            secureTextEntry={this.state.isSecureConfirmPassword}
                            rightImageTapAction={() => {
                                this.setState({ isSecureConfirmPassword: !this.state.isSecureConfirmPassword })
                            }}
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

                        <Button onPress={() => { this.authentication() }} title='REGISTER NOW' style={{ width: '100%', marginTop: 30 }} />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, marginBottom: 20 }}>
                            <Text text='Already have an account?' style={{ fontSize: 16 }} />

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                                <Text text=' Login' style={{ fontSize: 18, textDecorationLine: 'underline', fontWeight: '400', color: colors.BLUE }} />
                            </TouchableOpacity>
                        </View>


                    </View>


                   



                </KeyboardAwareScrollView>
                <LoadingView ref={(ref) => { this.loader = ref }} />

            </View>
        )
    }
}

export default Register