import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    
      <SafeAreaView style={[backgroundStyle, {flex: 1, padding: 10}]}>  
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView style={styles.centeredContainer} contentContainerStyle={{flexGrow: 1}}>
            <Image source={{uri: "https://reactjs.org/logo-og.png"}} style={[ styles.largeLogo, {
              alignSelf: "center",
              backgroundColor: "#FCDDEC", 
              borderWidth: 2, 
              borderColor: "#7879F1",
            }]}/>
            <View style={{flex: 1, justifyContent: "center"}}>
              <Text style={[styles.titleText, {padding: 5, alignSelf: "center"}]}>Welcome Back!</Text>
              <Text style={[styles.subtitleText, {padding: 5, alignSelf: "center"}]}>Login to your account</Text>
            </View>
            <LoginForm></LoginForm>
            <AltLoginOptions></AltLoginOptions>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.subText}>Don't have an account? </Text>
              <Text style={styles.clickableText}>Register</Text>
            </View>
            
        </ScrollView>
      </SafeAreaView>
    
  );
};

const LoginForm = () => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const submitForm = () => {
    return fetch('https://urlHere.com', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).then((response) => {
      if (response.ok) {
        return json(response)
      } else {
        return Promise.reject('Networking Error occurred')
      }
    }).then((json) => {
        console.log(json);
    }).catch((e) => {
      console.log(e);
    })
  };

  return (
    <View style={{flex: 1, flexGrow: 0}}>
      <InputField title="Email" placeholder="Your email id" updateFieldFunc={onChangeEmail}></InputField>
      <InputField title="Password" placeholder="Your password" updateFieldFunc={onChangePassword}></InputField>
      <Text style={[styles.clickableText, {alignSelf: 'flex-end'}]}>Forgot Password?</Text>
      <RoundButton title="Login" onPress={submitForm}></RoundButton>
    </View>
  );
}

const InputField = ({title, placeholder, updateFieldFunc}) => {
  return ( 
    <View style={{marginVertical: 10}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: "#7879F1"}}>{title}</Text>
      <TextInput placeholder={placeholder} placeholderTextColor="#A5A6F6" style={styles.inputField} onChangeText={text => updateFieldFunc(text)}/>
    </View> 
  );
};

const RoundButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      <Text style={{alignContent: "center", color: "#7879F1"}}>{title}</Text>
    </TouchableOpacity>
  );
}

const AltLoginOptions = () => {
  return (
    <View style={{flex: 1, flexGrow: 1, justifyContent: "space-evenly"}}>
      <Text style={[styles.subText, {alignSelf: "center"}]}>Or login with</Text>
      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
        <Image source={{uri: "https://app.singpass.gov.sg/static/og_image.png"}} style={styles.tinyLogo}/>
        <Image source={{uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"}} style={styles.tinyLogo}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer : {
    alignSelf: "center",
    flex: 1,
  },
  inputField: {
    borderBottomWidth: 1,
    borderColor: "#A5A6F6",
    borderRadius: 5,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#7879F1",
  },
  subtitleText: {
    fontSize: 15,
    color: "#A5A6F6",
  },
  loginButton: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 5,
    borderColor: '#7879F1',
    alignItems: "center",
    marginVertical: 10,
  },
  subText: {
    fontSize: 15,
    color: "#7879F1",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  largeLogo: {
    width: 100,
    height: 100,
  },
  clickableText: {
    color: "#F178B6", 
    textDecorationLine: "underline",
  }
});

export default App;
