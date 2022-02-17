//import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Image, TouchableOpacity,StyleSheet, Text, TextInput, View, SafeAreaView, Button, Alert } from 'react-native';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
//import { TouchableOpacity } from 'react-native-web';

//import { Button } from 'react-native-web';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [register, setRegister] = useState(false);
  const onPressHandler = ()=>{
    setRegister(!register);
    Alert.alert("Registration","Success!",[{text:"Continue"}]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: "https://reactjs.org/logo-og.png"}} style={styles.image}></Image>
      <Text style={styles.textheading}>Enter Name:</Text>
      <TextInput
         // multiline
         keyboardType='default'
          style={styles.input}
          placeholder = "e.g. John Tan"
           />
           
      <Text style={styles.textheading}>Enter email:</Text>
      <TextInput
          keyboardType='email-address'
          style={styles.input}
          placeholder = "e.g. abc@mail.com"
          />
           
      <Text style={styles.textheading}>Enter password:</Text>
      <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder = "e.g !jdiU%h*j"
          />

      <TouchableOpacity
          style={styles.button}
          onPress={onPressHandler}
      >
        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Register</Text>
       </TouchableOpacity>
        
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    height:250,
    width: 250,
    justifyContent: "space-around",
    margin: 30,
    marginTop: 10
  },
  input:{
    height: 40,
    width: 350,
    margin: 12,
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 8,
  },
  button:{
    backgroundColor: "pink",
    width: 200,
    height: 50,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    borderRadius: 50,
  },
  textheading:{
    fontSize: 20,
    width: '85%',
    textAlign: 'left'
  }
});

export default RegistrationScreen;
