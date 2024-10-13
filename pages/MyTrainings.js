
      
      import 'react-native-url-polyfill/auto';
      import { StatusBar } from 'expo-status-bar';
      import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, RefreshControl, Linking } from 'react-native';
      import Template from './../template/Template';
      import API from './../template/API';
      import { setMotive } from './../template/Motive';
      import {Panel, Nav} from './../template/Panel'
      import { useState, useRef, useLayoutEffect, useEffect, useCallback} from 'react';
      import Items from './../template/Items';
      import Storage from './../template/Storage';
      import LoginPanel from './../LoginPanel';
      import apolloClient from './../graphqlclient';
      import { ApolloProvider, gql, useQuery } from '@apollo/client';
      import Toast from 'react-native-toast-message';
      import { useTranslation } from 'react-i18next';
      import i18n from '../translation';
      import base64 from 'react-native-base64';
      import * as MediaLibrary from 'expo-media-library';
      import * as FileSystem from 'expo-file-system';
      import EnhancedSurveyScreen from './SurveyScreen.js';


      const GET_MY_TRAINING = gql`
        query GetJoins($userInfoId: IntFilter) {
            getJoins(userInfoId: $userInfoId) {
                id
                joinTraining {
                id
                length
                maxUsers
                description
                date
                title
                }
                userInfoId
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
        query Query($userInfoId: IntFilter) {
          getJoins(userInfoId: $userInfoId) {
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

    const GET_MATERIALS = gql`query GetMaterials($trainingId: IntFilter) {
      getMaterials(trainingId: $trainingId) {
        fileName
        id
        trainingId
      }
    }`


  const CODES_FOR_LANGUAGES = {
    'en' : 'en-US',
    'pl': 'pl-PL'
  }

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    function SurveyModal({id}) {
      return (
        <Template.Modal id="surveyModal" animationType={"slide"}>
            <EnhancedSurveyScreen/>
        </Template.Modal>
      )
    }

      function CustomModal({title, content, description, id, maxUsers, date}) 
      {

        const {data, loading} = useQuery(GET_JOINS, {variables: {getTrainingId: {filter: "eq", value: id}}, fetchPolicy: 'no-cache'})

        const {t} = useTranslation();



        const materials = useQuery(GET_MATERIALS, {variables: {trainingId: {filter: "eq", value: id}}, fetchPolicy: 'no-cache'});



        async function download(fileName) {
          await Linking.openURL(`http://dev.pufereq.pl:5000/stored_files/${fileName.replaceAll(' ', '_')}`);
        }

        return (
          <Template.Modal id="modal2" animationType={"slide"}>
            <Template.Container>
              <Template.Card style={{marginTop: -60, width: '100%'}}>
                  <Template.Text style={{fontSize: 25, fontWeight: 800, marginTop: 0, marginBottom: 20}}>{title}</Template.Text>
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
                    {materials.loading ? null : (materials.data.getMaterials.length === 0 ? null : (
                        <>
                        <Template.Text style={{fontSize: 18, fontWeight: 700, marginTop: 15, marginBottom: 10}}>Materiały:</Template.Text>
                        {materials.data.getMaterials.map((element, index) => {
                        return (
                          <Template.Button key={index} onClick={() => {download(element.fileName)}} style={{alignSelf: 'flex-start', borderRadius: 10}} textStyle={{color: 'black', textDecorationLine: 'underline', padding: 5}} hoverColor={'#CCC'}>{element.fileName.replace((title + '_').replaceAll(' ', '_'), '')}</Template.Button>
                        )})}
                      </>
                      )
                    )}
                  </Template.Scrollable>
                  <Template.Container>
                  </Template.Container>
              </Template.Card>
              <Template.Button onClick={() => {Items.getElementById("modal2").state.hide();}} textStyle={{fontWeight: 700, color: 'white', fontSize: 20}} style={{backgroundColor: '#FF605C', padding: 8, borderRadius: 8, marginTop: -200, width: '80%'}} hoverColor={'#DD403A'}>{t("Zamknij")}</Template.Button>
            </Template.Container>
          </Template.Modal>
        )
      }

  
      export default function Trainings(props) {

        const {t} = useTranslation();

        const [state, setState] = useState({content: {}});
        const [cards, setCards] = useState([]);

        const {data, loading} = useQuery(GET_MY_TRAINING, {fetchPolicy: 'no-cache'});

        async function update() {
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
            })).data.getUserInfo[0].id;
        
            const CARDS = loading ? [] : data.getJoins.filter((element) => {return element.userInfoId === userInfo}).map((element) => {return element.joinTraining}).map((element) => {
                return {...element, description: element.description , description: element.description, subtitle: new Date(element.date).toLocaleDateString(CODES_FOR_LANGUAGES[i18n.language], options)}
            }).filter((element) => {
                return new Date(element.date) > Date.now();
            })

            setCards(CARDS);
            }


        useEffect(() => {

            update();

        }, []);

        function showMoreInfo(index)
        {
          setState({content: cards[index]});
          Items.getElementById("modal2").state.show();
        }

        function showSurvey(index)
        {
          setState({content: cards[index]});
          Items.getElementById("surveyModal").state.show();
        }

        const [refreshing, setRefreshing] = useState(false);

        const onRefresh = useCallback(() => {
          setRefreshing(true);
          apolloClient.refetchQueries({include: [GET_MY_TRAINING]})
          update().then((data) => {
            setRefreshing(false);
          })

        });

        useEffect(() => {
          console.log(cards);
        }, [cards])

        return (
        <Template.Container>
          <Template.Scrollable fullWidth={"true"} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            {cards.length > 0 ? cards.map((element, index) => {
              return (
                <Template.Card {...element} key={index} style={{margin: 20}}>
                  <Template.Text style={{fontWeight: 600, marginBottom: 15}}>{`${t("Limit uczesnitków:")} ${element.maxUsers},\n\n${t("Czas trwania (godziny):")} ${element.length}`}</Template.Text>
                  <Template.Button style={{paddingTop: 8, paddingBottom: 8, paddingLeft: 6, paddingRight: 6, backgroundColor: "navy", borderRadius: 10, margin: 2}} textStyle={{fontWeight: 700, color: 'white'}} hoverColor={"#0005AA"} onClick={() => {showMoreInfo(index);}}>{t("Zobacz więcej")}</Template.Button>
                  <Template.Button style={{paddingTop: 8, paddingBottom: 8, paddingLeft: 6, paddingRight: 6, backgroundColor: "navy", borderRadius: 10, margin: 2}} textStyle={{fontWeight: 700, color: 'white'}} hoverColor={"#0005AA"} onClick={() => {showSurvey(index);}}>{t("Wypełnij ankietę")}</Template.Button>
                </Template.Card>
              )
            }) : <Text style={{textAlign: 'center', marginTop: 20, fontSize: 20, fontWeight: 700}}>Brak dostępnych szkoleń</Text>}
          </Template.Scrollable>
          <CustomModal {...state.content}/>
          <SurveyModal {...state.content}/>
        </Template.Container>
        )

      }
        
        