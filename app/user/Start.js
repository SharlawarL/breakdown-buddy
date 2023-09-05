import React, { Component, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ToastAndroid, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';
import { json } from 'react-router-dom';
// import MapView from 'react-native-maps';

import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";
class Inputs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      user_id: '',
      mechanicList: [],
      location: null,
      errorMessage: null,
    }
    this.getValue();
    this.getMechanicsList();
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  getValue = async () => {

    var value = await AsyncStorage.getItem("id");
    this.setState({"user_id": value});
  }


  handleSearch = (text) => {
    this.setState({ search: text })
  }

  SearchMechanic = (search) => {
    console.log("Search", search)

    axios.get('https://blueclans.com/breakdownbuddy/login.php?method=getMechanicSearch&search='+search)
            .then((response) => {
               if(response?.data?.response)
               {
                  this.setState({ 
                    mechanicList : response?.data?.data
                  })
               } else {
                  // alert("User not exits!");
                  this.setState({ 
                    mechanicList : []
                  })
                  ToastAndroid.show("Something went wrong.!", ToastAndroid.SHORT);
               }
            })
            .catch(function (error) {
               console.log(error);
             });

  }

  getMechanicsList = () => {
      axios.get('https://blueclans.com/breakdownbuddy/login.php?method=getMechanic')
            .then((response) => {
               if(response?.data?.response)
               {
                  this.setState({ 
                    mechanicList : response?.data?.data
                  })
               } else {
                  // alert("User not exits!");
                  ToastAndroid.show("Something went wrong.!", ToastAndroid.SHORT);
               }
            })
            .catch(function (error) {
               console.log(error);
             });
  }

  bookBuddy = (mech_id, user_id, latitude, longitude) => {
    console.log(mech_id, user_id, latitude, longitude)

    axios.get('https://blueclans.com/breakdownbuddy/login.php?method=saveBooking&mech_id='+mech_id+'&user_id='+user_id+'&latitude='+latitude+'&longitude='+longitude)
            .then((response) => {
               if(response?.data?.response)
               {
                ToastAndroid.show("Booked successfully", ToastAndroid.SHORT);
               } else {
                  // alert("User not exits!");
                  ToastAndroid.show("Something went wrong.!", ToastAndroid.SHORT);
               }
            })
            .catch(function (error) {
               console.log(error);
             });

  }


  render() {
    const { navigation } = this.props

    const { location, errorMessage } = this.state;

    var mechList = [];

    if((this.state.mechanicList).length > 0)
    {
    for(let data of this.state.mechanicList){
      mechList.push(
          <View style={styles.listBox} key={ data['id'] }>
              <View>
                <Image
                  source={require('../../assets/logo.jpg')}
                  style={{ width: 100, height: 100 }}
                />
              </View>
                <View>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Name</Text>: { data['name'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Mobile</Text>: { data['mobile'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Address</Text>: { data['address'] }</Text>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.bookBuddy(data['id'], this.state.user_id, location.coords.latitude, location.coords.longitude)
                    }>
                    <Text style={styles.submitButtonText}> 
                      <Ionicons name="md-checkmark-circle-outline" />  Book Your Buddy
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>
      )
  }
} else {
  mechList.push(
    <View style={styles.listBox} key="11111111111111">
    <View>
      <Image
        source={require('../../assets/logo.jpg')}
        style={{ width: 100, height: 100 }}
      />
    </View>
      <View>
        <Text style={{marginTop: 30}}>No Data Available</Text>
      </View>
  </View>
  )
}

    return (
      <View style={styles.container}>
        <View>
          {errorMessage && <Text>{errorMessage}</Text>}
        </View>
        <Image
          source={require('../../assets/logo.jpg')}
          style={{ width: 100, height: 100, marginTop: 30 }}
        />
        <Text style={styles.subtext}>Welcome to</Text>
        <Text style={styles.headline}> Breakdown-buddy</Text>

        <View style={{ flexDirection: 'row', height: 50, marginBottom: 20}}>
        
        <TextInput style={styles.searchInput}
          underlineColorAndroid="transparent"
          placeholder="Search Near by Mechanic"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleSearch} />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={
            () => this.SearchMechanic(this.state.search)
          }>
          <Text style={styles.submitButtonText}>
          <Ionicons size={15} name="ios-search" />  Search
          </Text>
        </TouchableOpacity>
        
        </View>
        <Text>
          Or
        </Text>
        <ScrollView style={styles.scrollView}>
          { mechList }
        </ScrollView>
      </View>
    )
  }
}

export default Inputs

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10
  },
  subtext: {
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 50,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  headline: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 900,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    marginTop: 20,
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    padding: 10,
    width: '90%'
  },
  submitButton: {
    backgroundColor: '#7a42f4',
      padding: 10,
      paddingleft: 20,
      paddingRight: 20,
      marginTop: 15,
      marginRight: 15,
      borderRadius: 10,
      height: 40,
      textAlign: 'center',
  },
  submitButtonText: {
    color: 'white'
  },
  scrollView: {
    marginHorizontal: 20,
    width: '90%'
  },
  text: {
    fontSize: 42,
  },
  listBox: {
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    width: '90%',
    borderWidth:  1,
    borderColor: 'silver',
    borderStyle: 'solid'
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
},
searchIcon: {
    padding: 10,
},
searchInput: {
  marginTop: 20,
  // margin: 15,
  height: 40,
  borderColor: '#7a42f4',
  borderWidth: 1,
  padding: 10,
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
},
searchButton: {
  backgroundColor: '#7a42f4',
    padding: 10,
    paddingleft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginRight: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 40,
    textAlign: 'center',
},
});