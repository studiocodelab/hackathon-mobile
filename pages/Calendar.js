
 
      import 'react-native-url-polyfill/auto';
      import { StatusBar } from 'expo-status-bar';
      import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
      import Template from './../template/Template';
      import API from './../template/API';
      import { setMotive } from './../template/Motive';
      import {Panel, Nav} from './../template/Panel'
      import { useState, useRef, useLayoutEffect, useEffect} from 'react';
      import Items from './../template/Items';
      import Storage from './../template/Storage';
      import LoginPanel from './../LoginPanel';
      import apolloClient from './../graphqlclient';
      import { ApolloProvider, gql } from '@apollo/client';
      import Toast from 'react-native-toast-message';
      import { useTranslation } from 'react-i18next';

      const EVENTS = [
        {
          id: '1',
          title: 'Event 1',
          start: '2024-09-06T09:00:05.313Z',
          end: '2024-09-06T12:00:05.313Z',
          color: '#A3C7D6',
          description: 'hello world!'
        },
        {
          id: '2',
          title: 'Event 2',
          start: '2024-09-06T13:00:05.313Z',
          end: '2024-09-06T17:00:05.313Z',
          color: '#B1AFFF',
          description: 'hello world!'
        },
    ];
    
    function ModalComponent({title, text})
    {
      return (
        <Template.Modal id="modal" animationType={"slide"}>
          <Template.Container>
            <Template.Card style={{width: '90%'}} title={title}>
              <Template.Text style={{fontWeight: 700, fontSize: 20}}>{text}</Template.Text>
              <Template.Button onClick={() => {Items.getElementById("modal").state.hide();}} textStyle={{fontWeight: 700, color: 'white'}} style={{backgroundColor: '#FF605C', padding: 5, borderRadius: 5, marginTop: 10}} hoverColor={'#DD403A'}>Close</Template.Button>
            </Template.Card>
          </Template.Container>
        </Template.Modal>
      )
    }
  
      export default function Calendar(props) {

        const {t} = useTranslation();

        const [state, setState] = useState({title: '', description: ''})

        function onEventPressed(event) 
        {
          setState({title: event.title, description: event.description})
          Items.getElementById("modal").state.show();
        }
        
        return (
        <>
          <Template.Container>
            <Template.Scheduler events={EVENTS} onEventPressed={onEventPressed}/>
            <ModalComponent text={state.description} title={state.title}/>
          </Template.Container>
        </>
        )
      }
        
        