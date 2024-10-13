
      import 'react-native-url-polyfill/auto';
      import { StatusBar } from 'expo-status-bar';
      import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, Image } from 'react-native';
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
            <Template.Text style={{fontWeight: 700, fontSize: 30}}>Witaj!</Template.Text>
          </Template.Container>
          <Template.Container flex={3} fullWidth={true}>
            <Image source={{uri: 'https://pppt.orlen.pl/content/experience-fragments/internet/pppt/pl/pl/site/header/master/_jcr_content/root/image_2064652404_cop_1670031078.coreimg.90.1024.png/1706224082983/pppt.png'}} height={150} width={243} />
          </Template.Container>
          <Template.Container flex={4}>
          </Template.Container>
          <Template.Container flex={1}>
            <Template.Text style={{fontWeight: 700, fontSize: 15}}>Made by StudioCodeLab</Template.Text>
          </Template.Container>
        </Template.Container>
      )
      }
        