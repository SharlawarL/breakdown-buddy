import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, ToastAndroid, ScrollView, Platform, Button } from 'react-native'
import axios from "axios";

class Inputs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props?.route?.params?.user_id,
            password: '',
            name: '',
            mobile: '',
            email: '',
            address: '',
            upi: '',
            isPickerShow: false,
            dob: new Date(Date.now()),
            navigation: this.props,
            redirect: false
        }
        this.getUserList();
    }

    getUserList = () => {
        axios.get('https://blueclans.com/breakdownbuddy/login.php?method=getUserById&id='+this.state.id)
                .then((response) => {
                   if(response?.data?.response)
                   {
                      this.setState({ 
                        name : response?.data?.data[0].name,
                        mobile : response?.data?.data[0].mobile,
                        password: response?.data?.data[0].password,
                        email : response?.data?.data[0].email,
                        upi : response?.data?.data[0].upi,
                        address : response?.data?.data[0].address,
                        dob : response?.data?.data[0].dob,
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


    handleName = (text) => {
        this.setState({ name: text })
    }
    handleMobile = (text) => {
        this.setState({ mobile: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handleAddress = (text) => {
        this.setState({ address: text })
    }
    handleUPI = (text) => {
        this.setState({ upi: text })
    }
    handleDob = (text) => {
        console.log(text)
        this.setState({ dob: text })
    }

    updateUSer = (name, mobile, password, email, address, dob, upi) => {
        if (name != '' && mobile != '') {
            axios.get('https://blueclans.com/breakdownbuddy/login.php?method=update&mobile=' + mobile + '&password='+password+'&email='+email+'&address='+address+'&dob='+dob+'&name=' + name +'&upi='+upi)
                .then((response) => {
                    ToastAndroid.show("Updated Successfully", ToastAndroid.SHORT);
                    setTimeout(()=>{
                        this.setState(
                            {
                                redirect: true
                            }
                        )
                    }, 1000)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            ToastAndroid.show("Please Enter Name and Mobile Number", ToastAndroid.SHORT);
        }
    }

    backToLogin = () => {
        navigation.navigate('Home')
    }
    render() {
        const { navigation } = this.props
        if (this.state.redirect) {
            navigation.navigate('MechanicDashboard')
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.image}>
                        <Image
                            source={require('../../assets/logo.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                    <View>
                        <Text style={styles.title}> 
                            Update
                        </Text>
                    </View>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter ID"
                        value={this.state.id}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        editable = {false}
                        onChangeText={this.handleMobile} />
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Name"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        value={this.state.name}
                        onChangeText={this.handleName} />
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Mobile"
                        value={this.state.mobile}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        editable = {false}
                        onChangeText={this.handleMobile} />
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Password"
                        value={this.state.password}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handlePassword} />

                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Email"
                        value={this.state.email}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleEmail} />

                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Address"
                        value={this.state.address}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleAddress} />
  

                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter DOB"
                        mode='date'
                        value={this.state.dob}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleDob} />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={
                            () => this.updateUSer(this.state.name, this.state.mobile, this.state.password, this.state.email, this.state.address, this.state.dob, this.state.upi)
                        }>
                        <Text style={styles.submitButtonText}> Update Data </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MechanicDashboard')}>
                        <Text style={styles.image} >
                            Back to <Text style={{ fontWeight: 700 }}>Profile</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
export default Inputs

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
        padding: 20,
        backgroundColor: 'white'
     },
     title: {
       alignItems: 'center',
        textAlign: 'center',
        fontSize: 40,
            fontWeight: 500,
        color: '#f0118b'
     },
    containerInput: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 30,
      },
    image: {
        margin: 10,
        alignItems: 'center',
        textAlign: 'center'
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        padding: 10
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        textAlign: 'center'
    },
    submitButtonText: {
        color: 'white'
    },
    pickedDateContainer: {
        padding: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    pickedDate: {
        fontSize: 18,
        color: 'black',
    },
})