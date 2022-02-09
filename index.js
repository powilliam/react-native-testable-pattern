/**
 * @format
 */
import {AppRegistry} from 'react-native';
import OrganizationAndRepositoriesScreenContainer from './src/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(
  appName,
  () => OrganizationAndRepositoriesScreenContainer,
);
