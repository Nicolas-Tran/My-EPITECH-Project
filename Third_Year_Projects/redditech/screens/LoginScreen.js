import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { logger } from "react-native-logs";
import { encode, decode } from "base-64";
import * as SecureStore from "expo-secure-store"

export default function LoginScreen({ navigation }) {
  var log = logger.createLogger();
  var [currentUrl, setCurrentUrl] = useState("");
  var urllocal = "http://localhost:8080";
  
  
  const handleNavigationStateChange = (navState) => {
    setCurrentUrl(navState.url);
  };
  
  
  const handleLogin = (navState) => {
    setCurrentUrl(navState.url);
    // currentUrl=navState.url; 
    let chaineTronquee = currentUrl.substring(48);
    chaineTronquee = chaineTronquee.slice(0, -2);
    let getToken = fetch("https://www.reddit.com/api/v1/access_token",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + encode('9TADzWM8daiOi5U_RaAhKg:')
        },
        body: 'grant_type=authorization_code&code=' + chaineTronquee + '&redirect_uri=http://localhost:8080'
      })
      .then(response => response.json()).
      then(data => {
        console.log('Réponse de l\'API:', data);
        // Store the access token in SecureStore
        SecureStore.setItemAsync('accessToken', data.access_token);
        AsyncStorage.setItem('accessToken', data.access_token)
          .then(() => {
            console.log('Access token stored in SecureStore');
          })
          .catch(error => {
            console.error('Error while storing access token:', error);
          });
        navigation.navigate("LoggedInScreen");
        console.log('Réponse de l\'API:', data.access_token);
        return data;
      })
      .catch(error => {
        console.error('Erreur lors de la requête:', error);
      });
  };
  
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://www.reddit.com/api/v1/authorize?client_id=9TADzWM8daiOi5U_RaAhKg&response_type=code&state=random_string&redirect_uri=http://localhost:8080&duration=permanent&scope=identity mysubreddits read subscribe account edit identity save vote' }}
        onNavigationStateChange={handleNavigationStateChange}
        onError={handleLogin}
      />
    </View>);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
