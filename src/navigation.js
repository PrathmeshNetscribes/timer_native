import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HistoryScreen from './screens/HistoryScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
