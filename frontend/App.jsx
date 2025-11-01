import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen } from 'react-native-screens';

import CreateUserScreen from './screens/CreateUserScreen';
import UserListScreen from './screens/UserLIstScreen';
import EditUserScreen from './screens/EditUserScreen';
import LoginScreen from './screens/LoginScreen';

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ flex: 9 }}>Home Screen</Text>
      <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Text
            style={{
              color: '#e0c716',
              fontSize: 18,
              backgroundColor: '#333026',
              padding: 10,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text
            style={{
              color: '#e0c716',
              fontSize: 18,
              backgroundColor: '#333026',
              padding: 10,
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <Text
            style={{
              color: '#e0c716',
              fontSize: 18,
              backgroundColor: '#333026',
              padding: 10,
            }}
          >
            List
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ flex: 9 }}>Profile Screen</Text>
      <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Text
            style={{
              color: '#e0c716',
              fontSize: 18,
              backgroundColor: '#333026',
              padding: 10,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text
            style={{
              color: '#e0c716',
              fontSize: 18,
              backgroundColor: '#333026',
              padding: 10,
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <Text
            style={{
              color: '#e0c716',
              fontSize: 18,
              backgroundColor: '#333026',
              padding: 10,
            }}
          >
            List
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={UserListScreen} />
        <Stack.Screen name="Create" component={CreateUserScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditUser" component={EditUserScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
