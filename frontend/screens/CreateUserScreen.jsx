import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { globalVar } from '../config/globalVar';

const CreateUserScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log('ImagePicker Error:', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setImageUri(asset.uri);
          setImageBase64(asset.base64);
        }
      },
    );
  };

  const handleSubmit = async () => {
    if (!username || !email || !password || !imageBase64) {
      Alert.alert(
        'Missing information',
        'Please enter complete information and image.',
      );
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${globalVar.API_URL}/users`, {
        username,
        email,
        password,
        image: imageBase64,
      });
      Alert.alert('Successfully', 'Created account!');
      console.log(res.data);
      setLoading(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setImageUri(null);
    } catch (error) {
      console.error('Lỗi:', error.message);
      Alert.alert('Lỗi', 'Cannot create account.');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        />
      ) : null}
      <Text style={styles.title}>Create new user</Text>

      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text>Image</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={{ color: 'gray' }}>Choose image</Text>
        )}
      </TouchableOpacity>

      <Button title="Create account" onPress={handleSubmit} />=
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center', gap: 15 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    height: 150,
  },
  imagePreview: { width: '100%', height: '100%', borderRadius: 8 },
});

export default CreateUserScreen;
