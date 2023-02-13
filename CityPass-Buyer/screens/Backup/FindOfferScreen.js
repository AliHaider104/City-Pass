import React from 'react'
import { StyleSheet, View ,Text, ScrollView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MapView ,{Circle, Marker} from 'react-native-maps'
import NavigateCardScreen from '../option-screens/NavigateCardScreen'
import OfferCardScreen from '../option-screens/OfferCardScreen'

const FindOfferScreen = ({ route, navigation }) => {
    const { description, details } = route.params;

    const Stack = createNativeStackNavigator();
    const origin = {
        lat:31.27806829999999,
        lng: 72.3316761,
    }
    return (
            <View style={styles.container}>
                <View style={styles.MapContainer}>
                <MapView
                    style={{flex:1}}
                    mapType='mutedStandard'
                    initialRegion={{
                            latitude: details.lat,
                            longitude: details.lng,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                    }}>
                    <Marker
                    coordinate={{
                        latitude: details.lat,
                        longitude: details.lng,
                    }}/>

                    <Circle
                    center={{
                        latitude: details.lat,
                        longitude: details.lng,
                    }}
                    radius={50}
                    />

                    
                </MapView>
                </View>
                <View style={styles.OptionsContainer}>
                    <Stack.Navigator screenOptions={{headerShown:false,} }>
                        <Stack.Screen name='find' component={NavigateCardScreen} />
                        <Stack.Screen name='offercard' component={OfferCardScreen} />
                    </Stack.Navigator> 
                </View>
            </View>
    )
}

export default FindOfferScreen

const styles = StyleSheet.create({
    container: {
        margin:0,
        flex:1,
        flexDirection:'column',
    },
    MapContainer:{
       flex:1,
        
    },
    OptionsContainer:{
        flex:1,
        backgroundColor:'#334756',
    }
  });
