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
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const CreateUserScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

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
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đủ và chọn ảnh.');
      return;
    }

    try {
      const res = await axios.post('http://10.0.2.2:5000/users', {
        username,
        email,
        password,
        image: imageBase64,
      });
      Alert.alert('Thành công', 'Đã tạo tài khoản!');
      console.log(res.data);
    } catch (error) {
      console.error('Lỗi:', error.message);
      Alert.alert('Lỗi', 'Không thể tạo tài khoản.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tạo người dùng mới</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={{ color: 'gray' }}>Chọn ảnh</Text>
        )}
      </TouchableOpacity>

      <Button title="Tạo tài khoản" onPress={handleSubmit} />
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
