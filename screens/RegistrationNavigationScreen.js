import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './WelcomeScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import AccountConfigurationScreen from './AccountConfigurationScreen'

const RegistrationStack = createNativeStackNavigator();

const RegistrationNavigationScreen = ({ navigation }) => (
    <RegistrationStack.Navigator initialRouteName={'WelcomeScreen'} headerMode="none">
        <RegistrationStack.Screen options={{ headerShown: false, title: "Home" }} name="WelcomeScreen" component={WelcomeScreen} />
        <RegistrationStack.Screen options={{ headerShown: false, title:"Sign In" }} name="SignInScreen" component={SignInScreen}/>
        <RegistrationStack.Screen options={{ headerShown: false, title:"Sign Up"  }} name="SignUpScreen" component={SignUpScreen}/>
        <RegistrationStack.Screen options={{ headerShown: false, title:"Forgot Password"  }} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </RegistrationStack.Navigator>
);
export default RegistrationNavigationScreen;