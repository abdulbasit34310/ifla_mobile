import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "./Registration/Welcome";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";
import ForgotPassword from "./Registration/ForgotPassword";

import AccountConfiguration from "./Registration/AccountConfiguration";

const RegistrationStack = createNativeStackNavigator();

const RegistrationNavigator = ({ navigation }) => (
  <RegistrationStack.Navigator
    initialRouteName={"Welcome"}
    headerMode="none"
  >
    <RegistrationStack.Screen
      options={{ headerShown: false, title: "Home" }}
      name="Welcome"
      component={Welcome}
    />
    <RegistrationStack.Screen
      options={{ headerShown: false, title: "Login" }}
      name="Login"
      component={Login}
    />
    <RegistrationStack.Screen
      options={{ headerShown: false, title: "SignUp" }}
      name="SignUp"
      component={SignUp}
    />
    <RegistrationStack.Screen
      options={{ headerShown: false, title: "Forgot Password" }}
      name="ForgotPassword"
      component={ForgotPassword}
    />
    <RegistrationStack.Screen
    options={{ headerShown: false, title: "Account Configuration" }}
    name="AccountConfiguration"
    component={AccountConfiguration}
  />
  </RegistrationStack.Navigator>
);
export default RegistrationNavigator;
