import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const CustomButton = ({bgColor,fgColor,onPress,text,type = 'PRIMARY' , width ,disabled } ) => {
    return (
        <TouchableOpacity onPress={onPress}
        disabled={disabled} 
            style={[
                styles.container,
                styles[`container_${type}`],
                styles[`container_${width}`],
                bgColor ? {backgroundColor:bgColor} : {}
                ]}>
            <Text style={[
                styles.text,
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
                ]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
        padding:15,
        width:'100%',
        marginBottom:10,
        alignItems:'center',
        borderRadius:5,
    },
    container_PRIMARY: {
        backgroundColor:'#6c47a6',
    },
    container_TERTIARY: {
        borderColor:'#6c47a6',
        borderWidth:2,
    },
    container_DISABLE: {
        backgroundColor:'#929194',
        borderColor:'#5b5a5c',
        
    },
    container_20:{
        width:'20%',
    },
    container_25:{
        margin:5,
        width:'25%',
    },
    container_50:{
        width:'50%',
    },

    text:{
        fontWeight:'bold',
        color:'#fff',
    },
    text_TERTIARY:{
        color:'#334756',
    },
    text_FORGOTPASSWORD:{
        color:'red',
    },
    text_DISABLE:{
        color:'#5b5a5c',
    }
})
