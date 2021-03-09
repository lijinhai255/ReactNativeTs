import React from 'react';
import { Provider } from 'react-redux';
import Navigator from '@/navigator/index';
import store from '@/config/dva';
import { StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import '@/config/http';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';


enableScreens();

export default class extends React.Component {
  componentDidMount() {
    SplashScreen.hide();

  }
  render() {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <Navigator />
        </RootSiblingParent>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
