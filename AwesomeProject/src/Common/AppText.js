

import React,{Component} from 'react'
import {Text} from 'react-native'

class AppText extends Component{

    render(){
        return(
            <Text style={[{fontSize:12,fontFamily:'Avenir Next'},this.props.style]}>{this.props.text}</Text>
        )
    }
}

export default AppText