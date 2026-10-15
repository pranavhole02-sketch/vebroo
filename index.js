import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';

// Support both Expo Go and bare React Native CLI
try {
  registerRootComponent(App);
} catch (e) {
  AppRegistry.registerComponent('vobeenew', () => App);
}
