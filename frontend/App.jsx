import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen } from 'react-native-screens';

import HomeScreen from './screens/HomeScreen';
import CreateUserScreen from './screens/CreateUserScreen';
import UserListScreen from './screens/UserLIstScreen';
import EditUserScreen from './screens/EditUserScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="UserList" component={UserListScreen} />
        <stack.Screen name="Create" component={CreateUserScreen} />
        <stack.Screen name="Profile" component={ProfileScreen} />
        <stack.Screen name="EditUser" component={EditUserScreen} />
        <stack.Screen name="SignUp" component={SignUpScreen} />
        <stack.Screen name="Login" component={LoginScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
