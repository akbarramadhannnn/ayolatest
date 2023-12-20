import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Signin, Signup, Otp} from '@screens/index';
import routes from '@constants/routes';
import theme from '@constants/theme';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        colors: {
          background: theme.white1,
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={routes.Signin}>
        <Stack.Screen name={routes.Home} component={Home} />
        <Stack.Screen name={routes.Signin} component={Signin} />
        <Stack.Screen name={routes.Signup} component={Signup} />
        <Stack.Screen name={routes.Otp} component={Otp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
