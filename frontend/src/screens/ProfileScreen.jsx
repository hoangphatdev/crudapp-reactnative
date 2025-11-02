import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { persistor } from '../utils/store';
import { clearUser } from '../utils/userSlice';

const ProfileScreen = ({ navigation, route }) => {
  const { username, email, password, imageUrl } = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          params: { role: 'client' },
        },
      ],
    });
  };
  const handleClick = () => {
    dispatch(clearUser());
    // persistor.purge(); // xóa dữ liệu lưu trong AsyncStorage

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30,
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          resizeMode: 'cover',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>username</Text>
        <TextInput placeholder={username} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>email</Text>
        <TextInput placeholder={email} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Text>password</Text>
        <TextInput placeholder={password} />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundcolor: 'rgba(229, 17, 17, 0.5)',
          padding: 10,
          borderradius: 8,
        }}
      >
        <TouchableOpacity onPress={handleClick}>
          <Text style={{ color: 'black' }}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          backgroundcolor: 'rgba(0,0,0,0.3)',
          padding: 10,
          borderradius: 8,
        }}
      >
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={{ color: 'black' }}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
