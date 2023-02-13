import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const CustomInput = ({maxLength,value,setValue,placeholder,secureTextEntry,onFocus,borderRadius = '10', borderWidth = '0', selectionColor = '#6c47a6' , placeholderTextColor = '#6c47a6' ,width , keyboardType }) => {
    return (
        <View style={[styles.CustomInputContainer,styles[`CustomInputContainer_${width}`]]}>
            <TextInput
            keyboardType={keyboardType} 
            placeholder={placeholder}
            onChangeText={setValue}
            value={value}
            selectionColor={selectionColor} 
            secureTextEntry={secureTextEntry} 
            style={styles.CustomInput}
            placeholderTextColor={placeholderTextColor}
            onFocus={onFocus}
            maxLength={maxLength}
            borderTopLeftRadius={borderRadius}
            borderTopRightRadius={borderRadius}
            borderBottomRightRadius={borderRadius}
            borderBottomLeftRadius={borderRadius}
            borderBottomWidth={borderWidth}
            borderTopWidth={borderWidth}
            borderLeftWidth={borderWidth}
            borderRightWidth={borderWidth}
            />
            
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    CustomInputContainer:{
        width:'100%',
    },
    CustomInputContainer_50:{
        width:'49%',
    },
    CustomInput:{
        marginBottom:10,
        marginTop:10,
        width:'100%',
        padding:5,
        backgroundColor:'#E9EAEC',
        borderBottomWidth:1,
        height:50,
        paddingHorizontal:20,
        fontWeight:'bold',
    }
})
