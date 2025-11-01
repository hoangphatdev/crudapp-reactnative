import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000/users'; // backend Express của bạn

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error('Lỗi tải users:', err.message);
    }
  };

  const deleteUser = async id => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa user này?', [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            fetchUsers();
          } catch (err) {
            console.error('Lỗi xóa user:', err.message);
          }
        },
      },
    ]);
  };

  const editUser = user => {
    // Truyền user qua màn hình Edit
    navigation.navigate('EditUser', { user });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>

      {users.length === 0 ? (
        <Text style={{ color: 'gray' }}>Chưa có user nào.</Text>
      ) : (
        users.map(user => (
          <View key={user._id} style={styles.card}>
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{user.username}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.btn, styles.btnEdit]}
                onPress={() => editUser(user)}
              >
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.btnDelete]}
                onPress={() => deleteUser(user._id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    gap: 5,
  },
  btn: {
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnEdit: {
    backgroundColor: '#4CAF50',
  },
  btnDelete: {
    backgroundColor: '#E53935',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserListScreen;
