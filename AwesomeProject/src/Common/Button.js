

import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '../Common/AppText'
import * as colors from '../Common/colors'

class Button extends Component {

    render() {
        return (
            <TouchableOpacity onPress={()=>{this.props.onPress()}} style={[{ justifyContent: 'center', height: 60, borderRadius: 30, alignItems: 'center', backgroundColor: colors.PRIMARY_COLOR }, this.props.style]}>
                <Text text={this.props.title} style={{color:'white',fontSize:16,fontWeight:'600'}}/>
            </TouchableOpacity>

        )
    }
}
export default Button