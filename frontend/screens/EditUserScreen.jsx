import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const API_URL = 'http://10.0.2.2:5000/users'; // backend của bạn

const EditUserScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password || '');
  const [imageUri, setImageUri] = useState(user.imageUrl);
  const [imageBase64, setImageBase64] = useState(null);

  const handlePickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      response => {
        if (response.didCancel || !response.assets?.length) return;
        const asset = response.assets[0];
        setImageUri(asset.uri);
        setImageBase64(asset.base64);
      },
    );
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API_URL}/${user._id}`, {
        username,
        email,
        password,
        image: imageBase64, // nếu không chọn ảnh mới thì backend giữ ảnh cũ
      });

      Alert.alert('Thành công', 'Cập nhật user thành công!');
      navigation.goBack();
    } catch (err) {
      console.error('Lỗi update:', err.message);
      Alert.alert('Lỗi', 'Không thể cập nhật user.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chỉnh sửa người dùng</Text>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={{ color: 'gray' }}>Chọn ảnh mới</Text>
        )}
      </TouchableOpacity>

      <Button title="Cập nhật" onPress={handleUpdate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, gap: 15, justifyContent: 'center' },
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

export default EditUserScreen;
