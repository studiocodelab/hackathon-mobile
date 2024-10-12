


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import Template from './template/Template';
import API from './template/API';
import { setMotive } from './template/Motive';
import {Panel, Nav} from './template/Panel'
import { useState, useRef, useLayoutEffect, useEffect} from 'react';
import Items from './template/Items';
import Storage from './template/Storage';
import apolloClient from './graphqlclient';
import { ApolloProvider, gql } from '@apollo/client';
import registerForPushNotificationsAsync from './generateToken';

const GET_USERS = gql`
query GetUsers($login: StringFilter, $password: StringFilter) {
  getUsers(login: $login, password: $password) {
    id
    login
    password
    session_token  
  }
}
`

const INSERT_TOKEN = gql`
mutation Mutation($newnotificationToken: String, $login: String, $password: String) {
  updateUsers(newnotification_token: $newnotificationToken, login: $login, password: $password) {
    id
  }
}
`

export default function CustomLoginPanel(props) {

    const [state, setState] = useState({error: false, filled: true});

    async function logUser(login, pass, sessionToken)
    {
        const token = await registerForPushNotificationsAsync();
        await Storage.setItem("login", login);
        await Storage.setItem("password", pass);
        await Storage.setItem("session_token", sessionToken);
        await apolloClient.mutate({
          mutation: INSERT_TOKEN,
          variables: {
            newnotificationToken: token
            , login: login
            , password: pass
            
          }
        })
        props.globalState({logged: 'true'})
    }
  
    function tryToLog(login, pass)  {
      if (login === '' || pass === '') {
        setState({...state, filled: false, error: false})
        return ;
      }
      apolloClient.query({
        fetchPolicy: 'no-cache',
        query: GET_USERS,
        variables: {
          login: {
            value: login,
            filter: "eq"
          },
          password: {
            value: pass,
            filter: "eq"
          }
        }
      }).then((data) => {
        let results = data.data.getUsers;
        if (results.length === 0) {
          setState({error: true, filled: true});
        } else {
          setState({error: false, filled: true})
          logUser(login, pass, results[0].session_token)
        }
      })
    };
  
    return (
      <Template.Container fullWidth={"true"}>
        <Template.Container fullWidth="true" flex={20}>
          <Template.LoginPanel 
          loginIcon="user"
          passwordIcon="lock"
          loginText="Login"
          passwordText="Password"
          inputFontSize={25}
          titleColor="black"
          titleFontSize={30}
          borderColor={"black"}
          onSubmit={tryToLog}
          switchToRegistration={props.switchToRegistration}
          />
        </Template.Container>
        <Template.Container>
         <Template.Text style={{fontWeight: 700, color: "#FF6665", marginTop: -200, fontSize: 18}}>{state.error || !state.filled ? <><Template.Icon name={"warning"} color={"red"} size={18}/> { state.error ? 'Invalid login or password!' : 'Please complete all fields!'}</> : null }</Template.Text>
        </Template.Container>
        <Template.Container flex={7}>
        </Template.Container>
      </Template.Container>
    )
  }

