import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

const HomeScreen = ({ navigation, route }) => {
  const navigateToListScreen = () => {
    navigation.replace('UserList');
  };
  const navigateToProfileScreen = () => {
    navigation.replace('Profile');
  };

  const [role, setRole] = useState('');
  useEffect(() => {
    const { role } = route.params;
    setRole(role);
    console.log(role);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>This is home screen</Text>
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
            <Text style={{ color: 'white' }}>UserList</Text>
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
          <Text style={{ color: 'white' }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
