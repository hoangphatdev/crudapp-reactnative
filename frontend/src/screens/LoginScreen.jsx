import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { globalVar } from '../config/globalVar';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log(`${globalVar.API_URL}/login`);

    if (!email || !password) {
      Alert.alert(
        'Missing information',
        'Please enter your email and password.',
      );
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${globalVar.API_URL}/login`, {
        email,
        password,
      });
      const { user } = res.data;
      // const { username, email, password, imageUrl } = user;
      if (email == 'admin@gmail.com') {
        dispatch(
          setUser({
            username: user.username,
            email: user.email,
            password: user.password,
            imageUrl: user.imageUrl,
          }),
        );
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              params: {
                role: 'admin',
                username: user.username,
                password: user.password,
                email: user.email,
                imageUrl: user.imageUrl,
              },
            },
          ],
        });
      } else {
        dispatch(
          setUser({
            username: user.username,
            email: user.email,
            password: user.password,
            imageUrl: user.imageUrl,
          }),
        );
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              params: {
                role: 'client',
                username: user.username,
                password: user.password,
                email: user.email,
                imageUrl: user.imageUrl,
              },
            },
          ],
        });
      }
    } catch (err) {
      console.error('Login error:', err.message);
      Alert.alert(
        'Login failed',
        err.response?.data?.message || 'Wrong email or password.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title={loading ? 'Loading...' : 'Login'} onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Dont have account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  link: {
    color: '#0066cc',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default LoginScreen;
