import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View  } from 'react-native'
import { Icon } from 'react-native-elements';

const Vault = ({amount,onPress,addcredit}) => {
    return (
        <View style={styles.Vault}>
            <View>
                <Text style={styles.CreditStatsTitle} >Total available credits</Text>
                <Text style={styles.CreditValue} >{amount}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                {addcredit?<Icon 
                    style={styles.Icon}
                    type="antdesign" name="plus" size={50} color="lightgray"/> 
                    :<Icon 
                    style={styles.Icon}
                    type="antdesign" name="creditcard" size={50} color="lightgray"/> }
                
            </TouchableOpacity>
            
        </View>
    )
}

export default Vault

const styles = StyleSheet.create({
    Vault:{
        marginTop:'3%',
        backgroundColor:'#6c47a6',
        width:'100%',
        height:150,
        borderRadius:20,
        marginBottom:'5%',
        alignItems:'center',
        padding:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    CreditValue:{
        color:'#fff',
        fontSize:50,
        fontWeight:'bold',
    },
    CreditStatsTitle:{
        color:'#fff',
    }
})
