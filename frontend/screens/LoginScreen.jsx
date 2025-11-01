import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        'Missing information',
        'Please enter your email and password.',
      );
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/login`, { email, password });

      Alert.alert('Sucessfully', 'Login sucessfully!');
      console.log('User:', res.data.user);

      navigation.replace('Home');
    } catch (err) {
      console.error('Login error:', err.message);
      Alert.alert(
        'Đăng nhập thất bại',
        err.response?.data?.message || 'Sai email hoặc mật khẩu.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

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
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        onPress={handleLogin}
      />

      <TouchableOpacity onPress={() => navigation.navigate('CreateUser')}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
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
