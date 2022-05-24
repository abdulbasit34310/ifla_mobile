import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './WelcomeScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const RegistrationStack = createNativeStackNavigator();

const RegistrationNavigationScreen = ({ navigation, setloggedin }) => (
    <RegistrationStack.Navigator initialRouteName={'WelcomeScreen'} headerMode="none">
        <RegistrationStack.Screen options={{ headerShown: false }} name="WelcomeScreen" component={WelcomeScreen} />
        <RegistrationStack.Screen options={{ headerShown: false }} name="SignInScreen" component={SignInScreen} initialParams={{setloggedin:setloggedin}}/>
        <RegistrationStack.Screen options={{ headerShown: false }} name="SignUpScreen" component={SignUpScreen} initialParams={{setloggedin:setloggedin}} />
        <RegistrationStack.Screen options={{ headerShown: false }} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </RegistrationStack.Navigator>
);
export default RegistrationNavigationScreen;