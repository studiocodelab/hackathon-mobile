
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
import Home from './pages/Home'
import Trainings from './pages/Trainings'
import Chats from './pages/Chats'
import Calendar from './pages/Calendar'
import Toast from 'react-native-toast-message';
import MyTrainings from './pages/MyTrainings'
import { useTranslation } from 'react-i18next';
import ChatBot from './pages/ChatBot';
import CONTEXT from './context';
import { useDispatch } from 'react-redux';
import { setSessionId } from './reduxstorage.js';
import SurveyScreen from './pages/SurveyScreen'


function SingOut(props) 
{
  async function exit() {
    await Storage.removeItem("login");
    await Storage.removeItem("password");
    globalThis.globalState({logged: false, loginPanel: 'signin'})
  }
  exit();
  return (
    <Template.Text>Signing out...</Template.Text>
  )
}

export default function Main(props) {

  const {t} = useTranslation();

  const dispatch = useDispatch();

  const CURRENT_SESSION_ID = gql`
 query Query($content: String) {
  newSessionId(context: $content)
}
`

  useEffect(() => {
    apolloClient.query({query: CURRENT_SESSION_ID, variables: {content: CONTEXT}}).then((data) => {
      dispatch(setSessionId(data.data.newSessionId));
    })}, []);

    return (
    <>
      <Template.Navigaton backgroundColor={"black"} color={"white"} drawerColor={"white"} drawerBackgroundColor={"black"}>
          <Template.Screen name={"Strona główna"} component={Home}/>
          <Template.Screen name={"Szkolenia"} component={Trainings}/>
          <Template.Screen name={"Czat"} component={Chats}/>
          {/* <Template.Screen name={"Kalendarz"} component={Calendar}/> */}
          <Template.Screen name={"Moje szkolenia"} component={MyTrainings}/>
          <Template.Screen name={"Asystent AI"} component={ChatBot}/>
          <Template.Screen name="Wyloguj się" component={SingOut}/>
      </Template.Navigaton>
      <Toast />
      </>
    )
  }
  
