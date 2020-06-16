import React, { Component } from "react"
import { StyleSheet, Modal, Animated } from "react-native"
// import { DoubleBounce ,Bars,Bubbles} from "react-native-loader"

import * as colors from '../Common/colors'

class LoadingView extends Component {
  state = {
    isModalVisible: false
  };

  show = () => {
    this.setState({
      isModalVisible: true
    });

    Animated.timing(this._visiblity, {
      toValue: 1.0,
      duration: 500,
      useNativeDriver: true, // <-- Add this
    }).start();
  };

  hide = () => {
    this.setState({
      isModalVisible: false
    });
  };

  componentWillMount() {
    this._visiblity = new Animated.Value(0);
  }

  render() {
    const overlayStyle = {
      opacity: this._visiblity.interpolate({
        inputRange: [0,1],
        outputRange: [0,1]
      })
    }
    return (
      <Modal style = {{flex : 1,}} transparent={true} visible={this.state.isModalVisible}>
        <Animated.View style={{...styles.container, ...overlayStyle}} >
          {/* <DoubleBounce size={10} color={colors.LIGHT_BLUE} /> */}
        </Animated.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    
  }
});

export default LoadingView
