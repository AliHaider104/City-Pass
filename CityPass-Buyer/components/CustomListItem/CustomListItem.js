import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CustomListItem = ({IconType,Icon,primarytext, secondarytext,type}) => {
    return (
        <View style={styles.item_container} >
            <View style={[styles.item_icon_container,styles[`type_${type}`]]}>
                {type?<></>:<IconType name={Icon} size={50} color="black" />}
            </View>
            <View style={styles.item_text_container} >
                <Text style={styles.item_text_heading} >{primarytext}</Text>
                <View style={{flexDirection:'row'}} >
                    <Text style={{flex: 1, flexWrap: 'wrap' ,textAlign:'center'}} >{secondarytext}</Text>
                </View>
            </View>
        </View>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    item_container:{
        padding:5,
        borderRadius:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#F2F2F2',
        marginBottom:10,
    },
    item_icon_container:{
        width:90,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        padding:15,
        borderRadius:20,
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,  
        // elevation: 5
    },
    item_text_container:{
        marginRight:20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },
    item_text_heading:{
       fontSize:20,
       fontWeight:'bold',
    },
    type_1:{
        backgroundColor:'#FFC56D',     
    },
    type_2:{
        backgroundColor:'#8a81f7',
    },
    type_3:{
        backgroundColor:'#ed7fb0',
    },
})
