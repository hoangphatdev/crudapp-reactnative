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
import { globalVar } from '../config/globalVar';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${globalVar.API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error('Loading users error:', err.message);
    }
  };

  const deleteUser = async id => {
    Alert.alert('Submit', 'You want to delete this user, dont you?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${globalVar.API_URL}/users/${id}`);
            fetchUsers();
          } catch (err) {
            console.error('Deleting user error:', err.message);
          }
        },
      },
    ]);
  };

  const editUser = user => {
    navigation.navigate('EditUser', { user });
  };

  const navigateToCreateScreen = () => {
    navigation.replace('Create');
  };

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          params: { role: 'admin' },
        },
      ],
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User List</Text>

      {users.length === 0 ? (
        <Text style={{ color: 'gray' }}>Dont have any user.</Text>
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
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: 10,
          borderRadius: 8,
        }}
      >
        <TouchableOpacity onPress={navigateToCreateScreen}>
          <Text style={{ color: 'white' }}>Add User</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: 10,
          borderRadius: 8,
        }}
      >
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={{ color: 'white' }}>Home</Text>
        </TouchableOpacity>
      </View>
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
