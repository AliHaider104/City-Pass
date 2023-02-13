import React, { useState,useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BuyCreditScreen from '../screens/BuyCreditScreen';
import NearByOfferScreen from '../screens/NearByOfferScreen';
 
import FindOfferScreen from '../screens/Backup/FindOfferScreen';
import OfferCardView from '../screens/OfferCardView';
import UserVaultScreen from '../screens/UserVaultScreen';
import ViewRecepitScreen from '../screens/ViewRecepitScreen';



const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
               <Stack.Navigator screenOptions={{headerShown:false,} }>
                    <Stack.Screen name='login' component={LoginScreen} />
                    <Stack.Screen name='register' component={RegisterScreen} />
                    <Stack.Screen name='home' component={HomeScreen} />
                    <Stack.Screen name='vault' component={UserVaultScreen} />
                    <Stack.Screen name='nearbyoffer' component={NearByOfferScreen} />
                    <Stack.Screen name='buycredit' component={BuyCreditScreen} />
                    <Stack.Screen name='findoffer' component={FindOfferScreen} />
                    <Stack.Screen name='offercardview' component={OfferCardView} />
                    <Stack.Screen name='viewrecepit' component={ViewRecepitScreen} />  
                </Stack.Navigator> 
        </NavigationContainer>
    )
}

export default Navigation

