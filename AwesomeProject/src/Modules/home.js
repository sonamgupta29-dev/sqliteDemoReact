/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import { View } from 'react-native';
import Button from '../Common/Button'
export default class HomeScreen extends React.Component {
  
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <Button
          title="Edit Profile"
          onPress={() => this.props.navigation.navigate('updatePlayer')}
          style = {{margin : 20}}

        />
        <Button
          title="View Detail"
          onPress={() => this.props.navigation.navigate('playerDetail')}
          style = {{margin : 20}}

        />
        <Button
          title="All Players"
          onPress={() => this.props.navigation.navigate('playerList')}
          style = {{margin : 20}}

        />
        <Button
        title = "LogOut"
        onPress = {() => this.props.navigation.goBack()
        }
        style = {{margin : 20}}

        />
      </View>
    );
  }
}