import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// User Dashboard
import Home from './user/Home'
import Start from './user/Start';
import Setting from './user/Setting'
import Profile from './user/Profile'
import About from './user/about'
import Service from './user/Service'

// Mechanic Dashboard
import MechanicStart from './mechanic/Start';
import MechanicSetting from './mechanic/Setting'
import MechanicProfile from './mechanic/Profile'
import MechanicWorking from './mechanic/Working'
import MechanicCompleted from './mechanic/Completed'

// Admin Dashboard
import AdminStart from './admin/Start';
import AdminSetting from './admin/Setting'
import AdminProfile from './admin/Profile'
import AdminWorking from './admin/Working'
import AdminManage from './admin/Manage'

import MechView from './mechanic/View'

// Login Component
import Login from './login/Login'
import LoginAdmin from './login//LoginAdmin'
import LoginMechanic from './login//LoginMechanic'
import LoginUser from './login//LoginUser'

// Register Component
import RegisterMechanic from './register/RegisterMechanic'
import RegisterUser from './register/RegisterUser'

import UserView from './admin/UserView'
import UserViewMechanics from './mechanic/UserView'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * User Modules
 */
function UserDashboard() {
      return (
            <Tab.Navigator
                  screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                              let iconName;

                              if (route.name === 'BreakDown Buddy') {
                                    iconName = focused
                                          ? 'ios-home'
                                          : 'ios-home-outline';
                              } else if (route.name === 'Emergency') {
                                    iconName = focused ? 'md-list' : 'md-list';
                              } else if (route.name === 'Profile') {
                                    iconName = focused ? 'ios-person' : 'ios-person-outline';
                              } else if (route.name === 'About us') {
                                    iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                              } else if (route.name === 'MyBooking') {
                                    iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                              }

                              // You can return any component that you like here!
                              return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'gray',
                  })}>
                  <Tab.Screen name="BreakDown Buddy" component={Start} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="MyBooking" component={Service} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="Profile" component={Profile} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="About us" component={Setting} options={{ unmountOnBlur: true }} />
            </Tab.Navigator>
      );
}


/**
 * Mechanic Modules
 */
function MechanicDashboard() {
      return (
            <Tab.Navigator
                  screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                              let iconName;

                              if (route.name === 'BreakDown Buddy (Mechanic)') {
                                    iconName = focused
                                          ? 'ios-home'
                                          : 'ios-home-outline';
                              } else if (route.name === 'Completed') {
                                    iconName = focused ? 'md-list' : 'md-list';
                              } else if (route.name === 'Profile') {
                                    iconName = focused ? 'ios-person' : 'ios-person-outline';
                              } else if (route.name === 'About us') {
                                    iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                              } else if (route.name === 'Current') {
                                    iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                              }

                              // You can return any component that you like here!
                              return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'gray',
                  })}>
                  <Tab.Screen name="BreakDown Buddy (Mechanic)" component={MechanicStart} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="Current" component={MechanicWorking} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="Completed" component={MechanicCompleted} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="Profile" component={MechanicProfile} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="About us" component={MechanicSetting} options={{ unmountOnBlur: true }} />
            </Tab.Navigator>
      );
}


/**
 * Admin Modules
 */
function AdminDashboard() {
      return (
            <Tab.Navigator
                  screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                              let iconName;

                              if (route.name === 'BreakDown Buddy (Admin)') {
                                    iconName = focused
                                          ? 'ios-home'
                                          : 'ios-home-outline';
                              } else if (route.name === 'Manage') {
                                    iconName = focused ? 'md-list' : 'md-list';
                              } else if (route.name === 'Profile') {
                                    iconName = focused ? 'ios-person' : 'ios-person-outline';
                              } else if (route.name === 'About us') {
                                    iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                              } else if (route.name === 'Current') {
                                    iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                              }

                              // You can return any component that you like here!
                              return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#7a42f4',
                        tabBarInactiveTintColor: 'gray',
                  })}>
                  <Tab.Screen name="BreakDown Buddy (Admin)" component={AdminStart} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="Current" component={AdminWorking} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="Manage" component={AdminManage} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="About us" component={AdminSetting} options={{ unmountOnBlur: true }} />
                  <Tab.Screen name="Profile" component={AdminProfile} options={{ unmountOnBlur: true }} />
            </Tab.Navigator>
      );
}


/**
 * Routing 
 */
export default function App() {
      return (
            <NavigationContainer>
                  <Stack.Navigator initialRouteName="Home"
                        creenOptions={{
                              headerShown: false
                        }}
                  >
                        <Stack.Screen
                              name="Home"
                              component={Login}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="LoginAdmin"
                              component={LoginAdmin}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="LoginMechanic"
                              component={LoginMechanic}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="LoginUser"
                              component={LoginUser}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="RegisterMechanic"
                              component={RegisterMechanic}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="RegisterUser"
                              component={RegisterUser}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="UserDashboard"
                              component={UserDashboard}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="MechanicDashboard"
                              component={MechanicDashboard}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="AdminDashboard"
                              component={AdminDashboard}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="MechView"
                              component={MechView}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="UserView"
                              component={UserView}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="UserViewMechanics"
                              component={UserViewMechanics}
                              options={{ headerShown: false }}
                        />

                  </Stack.Navigator>
            </NavigationContainer>
      );
}