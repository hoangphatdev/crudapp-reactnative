import { View, Text, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ navigation }) => {
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
  const handleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>Hello world</Text>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'rgba(229, 17, 17, 0.5)',
          padding: 10,
          borderRadius: 8,
        }}
      >
        <TouchableOpacity onPress={handleClick}>
          <Text style={{ color: 'white' }}>Log out</Text>
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
    </View>
  );
};

export default ProfileScreen;
