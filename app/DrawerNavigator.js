import * as React from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Pages/Home';
import Tasks from './components/Pages/Tasks';
import { useLogin } from './context/LoginProvider';
import AddPatient from './components/Pages/UserProfile';
import PatientList from './components/Pages/patientForm';
import PatientDetails from './components/Pages/PatientDetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawer = (props) => {
  const { setIsLoggedIn, profile } = useLogin();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text>{profile.fullname}</Text>
            <Text>{profile.email}</Text>
          </View>
          <Image
            source={{
              uri:
                profile.avatar ||
                'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={Home} name="Home" />
      <Drawer.Screen component={Tasks} name="Tasks" />
      <Drawer.Screen component={PatientStackScreen} name="PatientStack" />
      <Drawer.Screen component={AddPatient} name="Patient List" />
    </Drawer.Navigator>
  );
};
const PatientStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: null,
      }}
    >
      <Stack.Screen name="PatientList" component={PatientList} />
      <Stack.Screen name="PatientDetails" component={PatientDetails} />
    </Stack.Navigator>
  );
};

export default DrawerNavigator;
