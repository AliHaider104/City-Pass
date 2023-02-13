import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';

const UserContainer = ({username ,action}) => {
    return (
        <View style={styles.UserContainer}>
           <View style={styles.UserInnerContainer} >
                <View style={styles.UserIcon}>
                    <Icon 
                        style={styles.Icon}
                        type="antdesign" name="user"  color="white"/> 
                </View>
                <Text style={styles.Username} >{username}</Text>
           </View>
           <TouchableOpacity style={styles.UserIcon} onPress={() =>action()} >
            <Icon 
                style={styles.Icon}
                type="antdesign" name="logout" size={15} color="white"/> 
           </TouchableOpacity>
        </View>
    )
}

export default UserContainer

const styles = StyleSheet.create({
    UserContainer:{
        padding:'1%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    UserIcon:{
        padding:'2%',
        flexDirection:'row',
        backgroundColor:'#6c47a6',
        borderRadius:25,
        marginRight:'2%',
    },
    UserInnerContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    Username:{
        paddingLeft:10,
        fontSize:17,
        fontWeight:'900',
    }
})
