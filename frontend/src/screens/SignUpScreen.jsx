import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { globalVar } from '../config/globalVar';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Missing information', 'Please enter your information');
      return;
    }
    try {
      const response = await axios.post(`${globalVar.API_URL}/signup`, {
        username,
        email,
        password,
      });
      if (!response.status === '200') {
        Alert.alert('Sign up error');
        return;
      }
      Alert.alert('Successfully', 'Sign up sucessfully');
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Erorr', err);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp}></Button>
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

export default SignUpScreen;
