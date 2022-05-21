import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './WelcomeScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const RegistrationStack = createNativeStackNavigator();

const RegistrationNavigationScreen = ({ navigation }) => (
    <RegistrationStack.Navigator initialRouteName={'WelcomeScreen'} headerMode="none">
        <RegistrationStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <RegistrationStack.Screen name="SignInScreen" component={SignInScreen} />
        <RegistrationStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RegistrationStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </RegistrationStack.Navigator>
);
export default RegistrationNavigationScreen;