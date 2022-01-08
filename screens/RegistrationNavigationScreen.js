import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './WelcomeScreen';
import SignInScreen from "./SignInScreen"
import SignUpScreen from "./SignUpScreen"


const RegistrationStack = createNativeStackNavigator();

const RegistrationNavigationScreen = ({ navigation }) => (
    <RegistrationStack.Navigator headerMode='none'>
        <RegistrationStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <RegistrationStack.Screen name="SignInScreen" component={SignInScreen} />
        <RegistrationStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RegistrationStack.Navigator>
);

export default RegistrationNavigationScreen;