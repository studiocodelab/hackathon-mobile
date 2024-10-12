
    import 'react-native-url-polyfill/auto';
    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
    import Template from './template/Template';
    import API from './template/API';
    import { setMotive } from './template/Motive';
    import {Panel, Nav} from './template/Panel'
    import { useState, useRef, useLayoutEffect, useEffect} from 'react';
    import Items from './template/Items';
    import Storage from './template/Storage';
    import LoginPanel from './LoginPanel';
    import apolloClient from './graphqlclient';
    import { ApolloProvider, gql } from '@apollo/client';
    import Main from './Main';
    import RegistrationPanel from './RegistrationPanel';
    import { store } from './reduxstorage.js';
    import { Provider } from 'react-redux'; 
    import './translation.js'
    import i18n from './translation.js';
    
    let globalState;
    
    let IS_CHECKED = false;

    const CURRENT_SESSION_ID = gql`
      query Query {
        newSessionId
      }
    `
    
    export default function App() {

      useEffect(() => {
      apolloClient.query({query: CURRENT_SESSION_ID}).then((data) => {
        globalThis.sessionId =  data.data.newSessionId;
      })}, []);

      const [state, setState] = useState({logged: 'unknown', loginPanel: 'signin'});
    
      globalState = setState;
      globalThis.globalState = setState;
    
      if (!IS_CHECKED) {
        Storage.getItem("login").then((value) => {
          IS_CHECKED = true;
          setState({logged: value !== null, loginPanel: state.loginPanel})
        })
      }
      // Storage.removeItem("login");
      // Storage.removeItem("password");
    
      return (
        <Provider store={store}>
          <Template.Body text={state.logged ? "light" : "black"} backgroundColor={state.logged ? "black" : "white"} >
                <ApolloProvider client={apolloClient}>
                    {state.logged ==='unknown' ? null : (state.logged 
                    ? <Main globalState={setState}/> 
                    : (state.loginPanel === 'signin' 
                      ? <LoginPanel globalState={setState} switchToRegistration={() => {setState({logged: false, loginPanel: 'signup'})}}/> 
                      : <RegistrationPanel globalState={setState} switchToLogin={() => {setState({logged: false, loginPanel: 'signin'})}}/> 
                      ))}
                  </ApolloProvider>
          </Template.Body>
        </Provider>
      )
    };    
   
   
   
