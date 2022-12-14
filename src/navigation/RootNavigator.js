import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, Linking} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const linking = {
  prefixes: ['peoplesapp://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: {
        path: 'home',
      },
      Details: {
        path: 'details/:personDetailsId',
      },
    },
  },
};

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  React.useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        console.log('Initial Deeplink URL: ', url);
      })
      .catch(err => {
        console.warn('Deeplinking error', err);
      });

    Linking.addListener('url', e => {
      console.log('Listener Deeplink URL: ', e.url);
    });
  }, []);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Details" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
