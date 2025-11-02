import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation, route }) => {
  const [role, setRole] = useState('');
  const { username, email, password, imageUrl } = useSelector(
    state => state.user,
  );

  useEffect(() => {
    if (email === 'admin@gmail.com') {
      setRole('admin');
    } else {
      setRole('client');
    }
  }, []);

  const navigateToListScreen = () => {
    navigation.replace('UserList');
  };
  const navigateToProfileScreen = () => {
    navigation.replace('Profile', { emailProp: email });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Hello {username}</Text>
      {role == 'admin' ? (
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
          <TouchableOpacity onPress={navigateToListScreen}>
            <Text style={{ color: 'black' }}>UserList</Text>
          </TouchableOpacity>
        </View>
      ) : null}

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
        <TouchableOpacity onPress={navigateToProfileScreen}>
          <Text style={{ color: 'black' }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
