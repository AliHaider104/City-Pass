import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const CustomInput = ({value,setValue,placeholder,secureTextEntry,onFocus,width='100%',keyboardType,maxLength }) => {
    return (
        <View style={{width:width}}>
            <TextInput 
            placeholder={placeholder}
            onChangeText={setValue}
            value={value} 
            secureTextEntry={secureTextEntry} 
            style={styles.CustomInput}
            placeholderTextColor={'black'}
            onFocus={onFocus}
            borderRadius={10}
            maxLength={maxLength}
            keyboardType={keyboardType} />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    CustomInput:{
        height:40,
        marginBottom:10,
        marginTop:10,
        width:'100%',
        padding:5,
        backgroundColor:'#E9EAEC',
        borderBottomWidth:1,
    }
})
