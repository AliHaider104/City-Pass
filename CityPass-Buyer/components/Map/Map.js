import React from 'react'
import { StyleSheet} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const Map = ({lat,lng}) => {
    return (
        <MapView
        style={styles.Map}
        //mapType='mutedStandard'
        initialRegion={{
            latitude: 31.27806829999999,
            longitude: 72.3316761,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}>
            <Marker
            coordinate={{
                latitude: 31.27806829999999,
                longitude: 72.3316761,
            }}
            />
        </MapView>    
    )
}

export default Map

const styles = StyleSheet.create({
    Map:{
        flex:1,
    }
})
