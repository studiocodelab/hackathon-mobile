
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

      const CARDS = [
        {
          title: 'Title One'
          , subtitle: 'Subtitle One'
          , text: 'lorem ipsum'
        }
        , {
        title: 'Title Two'
        , subtitle: 'Subtitle Two'
        , text: 'lorem ipsum'
        }
        , {
          title: 'Title Three'
          , subtitle: 'Subtitle Three'
          , text: 'lorem ipsum'
          }
      ]

      function CardContent({text})
      {
        return (
          <Template.Text style={{fontWeight: 700}}>{text}</Template.Text>
        )
      }

      function CardButton()
      {
        return (
         <Template.Button style={{padding: 20, backgroundColor: 'black', borderRadius: 20}} textStyle={{fontWeight: 700, color: 'white'}} hoverColor={'#2F2F2F'}>See More</Template.Button>
        )
      } 
    
  
      export default function Home(props) {

        const {t} = useTranslation();

        return (
        <Template.Container>
          <Template.Container flex={2}>
            <Template.Text style={{fontWeight: 700, fontSize: 30}}>Welcome back</Template.Text>
          </Template.Container>
          <Template.Container flex={3} fullWidth={true}>
            <Template.Scrollable horizontal={true}>
              {CARDS.map((element, index) => {
                return (
                <Template.Card style={{height: 'auto', width: 200, margin: 10}} title={element.title} subtitle={element.subtitle} key={index} Actions={CardButton}>
                  <CardContent text={element.text}/>
                </Template.Card>
                )
              })}
            </Template.Scrollable>
          </Template.Container>
          <Template.Container flex={4}>
          </Template.Container>
          <Template.Container flex={1}>
            <Template.Text style={{fontWeight: 700, fontSize: 15}}>Made by StudioCodeLab</Template.Text>
          </Template.Container>
        </Template.Container>
      )
      }
        