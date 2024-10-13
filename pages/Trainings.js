
      
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
      import { ApolloProvider, gql, useQuery } from '@apollo/client';
      import Toast from 'react-native-toast-message';
      import { useTranslation } from 'react-i18next';
      import i18n from '../translation';
      import { useIsFocused } from '@react-navigation/native';

      const LOREM = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto maiores assumenda error id iure, magni tempora quam quae perspiciatis aperiam eos omnis repellendus laboriosam? Maxime aliquam accusamus velit eius dolores.'
      const LONG_LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

      const GET_TRAINING = gql`
      query Query {
          getTraining {
            id
            title
            date
            description
            length
            maxUsers
          }
        }
      `

      const GET_JOINS = gql`
        query Query($getTrainingId: IntFilter) {
          getJoins(trainingId: $getTrainingId) {
            id
            trainingId
            userInfoId
          }
        }
      `

      const GET_USERS = gql`
      query Query ($login: StringFilter, $password: StringFilter) {
        getUsers(login: $login, password: $password) {
          id
        }
      }
    `

    const GET_USER_INFO = gql`
    query Query($userId: IntFilter) {
      getUserInfo(userId: $userId) {
        id
      }
    }
    `

    const GET_FILTERED_JOINS = gql`
        query Query($userInfoId: IntFilter, $trainingId: IntFilter) {
          getJoins(userInfoId: $userInfoId, trainingId: $trainingId) {
            id
            trainingId
            userInfoId
          }
        }
    `

    const INSERT_JOIN = gql`
      mutation InsertJoins($userInfoId: Int, $trainingId: Int) {
        insertJoins(userInfoId: $userInfoId, trainingId: $trainingId) {
          id
        }
      }
    `


  const CODES_FOR_LANGUAGES = {
    'en' : 'en-US',
    'pl': 'pl-PL'
  }

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      function CustomModal({title, content, description, id, maxUsers, date}) 
      {

        const {data, loading} = useQuery(GET_JOINS, {variables: {getTrainingId: {filter: "eq", value: id}}, fetchPolicy: 'no-cache'})

        const {t} = useTranslation();

        async function join()
        {

         let login = await Storage.getItem('login');
         let password = await Storage.getItem('password');
         let users = (await apolloClient.query({
          query: GET_USERS,
          variables: {
            login: {
              filter: "eq",
              value: login
            },
            password: {
              filter: "eq",
              value: password
            }
          }
         })).data.getUsers[0].id;

         let userInfo = (await apolloClient.query({
          query: GET_USER_INFO,
          variables: {
            userId: {
              filter: "eq",
              value: users
            }
          },
          fetchPolicy: 'no-cache'
         })).data.getUserInfo

         let joins = (await apolloClient.query({
          query: GET_FILTERED_JOINS,
          variables: {
            userInfoId: {
              filter: "eq",
              value: userInfo[0].id
            },
            trainingId: {
              filter: "eq",
              value: id
            }
          },
          fetchPolicy: 'no-cache'
         })).data.getJoins

         console.log(joins);

         if (joins.length === 0) {
          await apolloClient.mutate({
            mutation: INSERT_JOIN,
            variables: {
              userInfoId: userInfo[0].id,
              trainingId: id
            },
            fetchPolicy: 'no-cache'
          })

          Items.getElementById("modal").state.hide();
          
         } else {
          alert(t("użytkownik już dołączył do tego szkolenia"))
         }

        }

        return (
          <Template.Modal id="modal" animationType={"slide"}>
            <Template.Container>
              <Template.Card style={{marginTop: -60}}>
                  <Template.Text style={{fontSize: 25, fontWeight: 800, marginTop: 0, marginBottom: 20, minWidth: 350}}>{title}</Template.Text>
                  <Template.Scrollable style={{height: '75%'}}>
                    <Template.Text style={{fontSize: 15, fontWeight: 700, marginBottom: 15}}>{description}</Template.Text>
                    <Template.Text style={{fontSize: 18, fontWeight: 700}}>
                      Liczba pozostałych miejsc: {'\n'}
                      {loading ? null : maxUsers - data.getJoins.length}
                    </Template.Text>
                    <Template.Text style={{fontSize: 18, fontWeight: 700}}>
                    {'\n'}Data rozpoczęcia: {'\n'}
                      {new Date(date).toLocaleDateString(CODES_FOR_LANGUAGES[i18n.language], options)}
                    </Template.Text>
                  </Template.Scrollable>
                  <Template.Container>
                  </Template.Container>
              </Template.Card>
              <Template.Button onClick={() => {Items.getElementById("modal").state.hide();}} textStyle={{fontWeight: 700, color: 'white', fontSize: 20}} style={{backgroundColor: '#FF605C', padding: 8, borderRadius: 8, marginTop: -200, width: '80%'}} hoverColor={'#DD403A'}>{t("Close")}</Template.Button>
               <Template.Button style={{backgroundColor: 'navy', padding: 8, borderRadius: 8, marginTop: -100, width: '80%'}} hoverColor={"#0005AA"} textStyle={{fontWeight: 700, color: 'white', fontSize: 20}} onClick={join}>{t("Dołącz")}</Template.Button>
            </Template.Container>
          </Template.Modal>
        )
      }

  
      export default function Trainings(props) {

        const {t} = useTranslation();

        const [state, setState] = useState({content: {}});

        const {data, loading} = useQuery(GET_TRAINING, {fetchPolicy: 'no-cache'});


        const CARDS = loading ? [] : data.getTraining.map((element) => {
          return {...element, description: element.description , description: element.description, subtitle: new Date(element.date).toLocaleDateString(CODES_FOR_LANGUAGES[i18n.language], options)}
        }).filter((element) => {
          return new Date(element.date) > Date.now();
        });

        function showMoreInfo(index)
        {
          setState({content: CARDS[index]});
          Items.getElementById("modal").state.show();
        }

        return (
        <Template.Container>
          <Template.Scrollable fullWidth={"true"}>
            {CARDS.length > 0 ? CARDS.map((element, index) => {
              return (
                <Template.Card {...element} key={index} style={{margin: 20}}>
                  <Template.Text style={{fontWeight: 600, marginBottom: 15}}>{`${t("Limit uczesnitków:")} ${element.maxUsers},\n\n${t("Czas trwania (godziny):")} ${element.length}`}</Template.Text>
                  <Template.Button style={{paddingTop: 8, paddingBottom: 8, paddingLeft: 6, paddingRight: 6, backgroundColor: 'navy', borderRadius: 10}} textStyle={{fontWeight: 700, color: 'white'}} hoverColor={"#0005AA"} onClick={() => {showMoreInfo(index);}}>{t("Zobacz więcej")}</Template.Button>
                </Template.Card>
              )
            }) : <Text style={{textAlign: 'center', marginTop: 20, fontSize: 20, fontWeight: 700}}>Brak dostępnych szkoleń</Text>}
          </Template.Scrollable>
          <CustomModal {...state.content}/>
        </Template.Container>
        )

      }
        
        