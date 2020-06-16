

import React, { Component } from 'react'
import { View, Image, TouchableOpacity, AsyncStorage,  } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import  Textfield  from '../Common/Textfield'
import LoadingView from '../Common/LoadingView'
import Button from '../Common/Button'
import Text from '../Common/AppText'
import * as colors from '../Common/colors'
import { openDatabase } from 'react-native-sqlite-storage';
import HomeScreen from './home'
var db = openDatabase({ name: 'UserDatabase.db' });
const isValidEmail = (email) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
class Login extends Component {

    state = {
        email: '',
        password: '',
        isSecurePassword: true,
        isUserDataFound: false
    }

    componentDidMount() {
        this.fetchUser()
    }

    fetchUser = async () => {

    }
    _storeData = async () => {
        try {
          await AsyncStorage.setItem("emailId",this.state.email);
        } catch (error) {
          // Error saving data
        }
      };

    authentication = () => {

        if (this.state.email.length == 0) {
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
        else if (this.state.password.length < 5) {
            this.password.showError('Invalid password')
            return
        }
        else {
            const { email,password } = this.state;
            console.log(this.state.email);
            db.transaction(tx => {
              tx.executeSql(
                'SELECT * FROM table_user where email = ? and password = ?',
                [email,password],
                (tx, results) => {
                  var len = results.rows.length;
                  console.log('len', len);
                  if (len > 0) {
                    this.setState({
                      userData: results.rows.item(0),
                    });

    
                      this._storeData()
                    this.props.navigation.navigate('HomeScreen'),

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
        }

    }

    

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                    style={{
                        paddingHorizontal: 30,
                        width: '100%',
                    }}
                    bounces={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text text='Login' style={{ fontSize: 24, padding: 20,paddingTop:60, textAlign: 'center', fontWeight: '500' }} />
                        <Textfield
                            label='Email'
                            value={this.state.email}
                            onChangeText={text => {
                                this.setState({ email: text })
                                this.email.hide(true)
                            }}
                            ref={(ref) => { this.email = ref }}
                            style={{ marginTop: 20, width: '100%' }}
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
                            secureTextEntry={this.state.isSecurePassword}
                            rightImageTapAction={() => {
                                this.setState({ isSecurePassword: !this.state.isSecurePassword })
                            }}
                        />
                        <Button onPress={() => { this.authentication() }} title='LOGIN' style={{ width: '100%', marginTop: 20 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, marginVertical: 5 }}>
                            <Text text='New User?' style={{ fontSize: 16 }} />

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('registerScreen')
                            }}>
                                <Text text=' Signup' style={{ fontSize: 18, textDecorationLine: 'underline', fontWeight: '400', color: colors.BLUE }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <LoadingView ref={(ref) => { this.loader = ref }} />
            </View>
        )
    }
}

export default Login


