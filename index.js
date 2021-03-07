/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/index';
// import App from './App';
import {name as appName} from './app.json';
import "@/config/http"

AppRegistry.registerComponent(appName, () => App);
