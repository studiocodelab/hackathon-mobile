
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

    return (
    <>
      <Template.Navigaton backgroundColor={"black"} color={"white"} drawerColor={"white"} drawerBackgroundColor={"black"}>
          <Template.Screen name={"Home"} component={Home}/>
          <Template.Screen name={"Trainings"} component={Trainings}/>
          <Template.Screen name={"Chats"} component={Chats}/>
          <Template.Screen name={"Calendar"} component={Calendar}/>
          <Template.Screen name={"My Trainings"} component={MyTrainings}/>
          <Template.Screen name={"Chat Bot"} component={ChatBot}/>
          <Template.Screen name="Sign out" component={SingOut}/>
      </Template.Navigaton>
      <Toast />
      </>
    )
  }
  
