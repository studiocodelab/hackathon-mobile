




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

import { cloneElement } from 'react';
import initializeComponent from './template/Initialize';
import Container from './template/Container';
import TText from './template/TText';
import IIcon from './template/IIcon';
import TextBox from './template/TextBox';
import PassBox from './template/PassBox';
import Button from './template/Button';
import registerForPushNotificationsAsync from './generateToken';
import OpenSans from './fonts/OpenSans-Bold.ttf'
import Roboto from './fonts/Roboto-Medium.ttf'
import { useTranslation } from 'react-i18next';

import { useFonts } from 'expo-font';

const GET_USERS = gql`
query GetUsers($login: StringFilter) {
  getUsers(login: $login) {
    id
    login
    password  
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

const ADD_USER = gql`
mutation InsertUsers($login: String, $password: String, $session_token: String) {
    insertUsers(login: $login, password: $password, session_token: $session_token) {
        id
    }
  }`

export default function RegistrationPanel(props) {

  const {t} = useTranslation();

  const [loaded, error] = useFonts({
    'OpenSans': OpenSans,
    'Roboto':  Roboto
  });

    const [state, setState] = useState({error: false, filled: true});

    var rand = function() {
      return Math.random().toString(36).substr(2);
    };

    var generateToken = function() {
      return rand() + rand(); // to make it longer
    };


    async function logUser(login, pass, sessionToken)
    {
        const token = await registerForPushNotificationsAsync();
        await Storage.setItem("login", login);
        await Storage.setItem("password", pass);
        await Storage.setItem("sessionToken", sessionToken);
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
          }
        }
      }).then((data) => {
        let token = generateToken();
        let results = data.data.getUsers;
        if (results.length === 0) {
          apolloClient.mutate({
            fetchPolicy: 'no-cache',
            mutation: ADD_USER,
            variables: {
              login: login,
              password: pass,
              session_token: token,
            }
          }).then(async () => {
            let data = [];
            while (data.length === 0) {
              console.log(data);
              data = (await apolloClient.query({
                query: GET_USERS,
                variables: {
                  login: {
                    value: login,
                    filter: "eq"
                  }
                }, fetchPolicy: 'no-cache'
              })).data.getUsers;
            }
            await apolloClient.mutate({
              mutation: gql`
              mutation InsertUserInfo($roleId: Int, $userId: Int) {
                insertUserInfo(roleId: $roleId, userId: $userId) {
                  id
                }
              }
              `,
              variables: {
                roleId: 1,
                userId: data[0].id
              }
            })
            logUser(login, pass, token);
          })
        } else {
          setState({error: true, filled: true})
        }
      })
    };
  
    return (
      <Template.Container fullWidth={"true"}>
        <Template.Container fullWidth="true" flex={20}>
          <RegistrationPanelBase
          loginIcon="user"
          passwordIcon="lock"
          loginText="Login"
          passwordText="Password"
          inputFontSize={25}
          titleColor="black"
          titleFontSize={30}
          borderColor={"black"}
          onSubmit={tryToLog}
          switchToLogin={props.switchToLogin}
          />
        </Template.Container>
        <Template.Container>
         <Template.Text style={{fontWeight: 700, color: "#FF6665", marginTop: -200, fontSize: 18}}>{state.error || !state.filled ? <><Template.Icon name={"warning"} color={"red"} size={18}/> { state.error ? 'User already exists!' : 'Please complete all fields!'}</> : null }</Template.Text>
        </Template.Container>
        <Template.Container flex={7}>
        </Template.Container>
      </Template.Container>
    )
  }


  function RegistrationPanelBase({backgroundColor, titleColor, loginIcon, loginText, passwordIcon, passwordText, inputFontSize, titleFontSize, buttonBackgroundColor, borderColor, onSubmit, switchToLogin})
  {
      const [state, setState] = useState();
      initializeComponent({props: arguments[0]});
  
      return (

        <Container style={{backgroundColor: "white"}} fullWidth="true">
        <Container fullWidth={"true"} flex={5} style={{alignItems: 'flex-start', padding: 15}} motive={{fontFamily: FontFamily.poppinsSemiBold, fontWeight: "600"}}>
            <TText style={styles.logIn}>Sign up</TText>
            <TText style={{color: titleColor, fontSize: titleFontSize, margin: 5, paddingLeft: 15}}><IIcon name={loginIcon} color={"navy"} size={titleFontSize * 0.8}/> {loginText}</TText>
            <TextBox placeholderTextColor={'rgba(0,0,0,0.5)'} id="rlogin" placeholder="login" style={{width: '98%', marginHorizontal: 'auto' , borderWidth: 2, borderRadius: 15, padding: 7, fontSize: inputFontSize, margin: 5, borderColor: borderColor, color: borderColor}}></TextBox>
            <TText style={{color: titleColor, fontSize: titleFontSize, margin: 5, paddingLeft: 15}}><IIcon name={passwordIcon} color={"navy"} size={titleFontSize * 0.8}/> {passwordText}</TText>
            <PassBox placeholderTextColor={'rgba(0,0,0,0.5)'} id="rpassword" placeholder="password" style={{width: '98%', marginHorizontal: 'auto' , borderWidth: 2, borderRadius: 15, padding: 7, fontSize: inputFontSize,  margin: 5, borderColor: borderColor, color: borderColor}}></PassBox>
            <View style={{width: '100%'}}>
                <Button 
                     textStyle={{color: Color.colorWhite, fontWeight: "600", fontSize: 20, paddingVertical: 10}}
                     hoverColor={"#0005AA"}
                     style={{fontSize: titleFontSize, borderRadius: 15, padding: 4, marginTop: 5, color: titleColor, backgroundColor: "navy", width: '98%', textAlign: 'center', marginHorizontal: 'auto', marginTop: 15}} 
                     onClick={() => {onSubmit(Items.getElementById("rlogin").state.value, Items.getElementById("rpassword").state.value)}}>
                    Sign up
                </Button>
            </View>
        </Container>
        <Container>
            <Button 
                textStyle={{color: 'navy', fontWeight: 800}}
                style={{fontSize: titleFontSize * 0.5, borderRadius: 7, padding: 10, marginTop: 35, color: 'navy'}}
                onClick={() => {switchToLogin()}}>
                Already have an account? Sign in here.
            </Button>
        </Container>
    </Container>

          // <Container style={{backgroundColor: backgroundColor}} fullWidth="true">
          //   <Container fullWidth={"true"} flex={5}>
          //     <TText style={{color: titleColor, fontSize: titleFontSize * 1.2, margin: 5}}>Sign up</TText>
          //     <TText style={{color: titleColor, fontSize: titleFontSize, margin: 5}}><IIcon name={loginIcon} color={titleColor} size={titleFontSize * 0.8}/> {loginText}</TText>
          //     <TextBox placeholderTextColor={borderColor} id="rlogin" placeholder="Insert login..." style={{width: '90%', borderWidth: 2, borderRadius: 10, padding: 7, fontSize: inputFontSize, margin: 5, borderColor: borderColor, color: borderColor}}></TextBox>
          //     <TText style={{color: titleColor, fontSize: titleFontSize, margin: 5}}><IIcon name={passwordIcon} color={titleColor} size={titleFontSize * 0.8}/> {passwordText}</TText>
          //     <PassBox placeholderTextColor={borderColor} id="rpassword" placeholder="Insert password..." style={{width: '90%', borderWidth: 2, borderRadius: 10, padding: 7, fontSize: inputFontSize,  margin: 5, borderColor: borderColor, color: borderColor}}></PassBox>
          //     <Button style={{fontSize: titleFontSize, borderRadius: 7, borderWidth: 2, padding: 4, marginTop: 5, color: titleColor, backgroundColor: buttonBackgroundColor, borderColor: borderColor}} onClick={() => {onSubmit(Items.getElementById("rlogin").state.value, Items.getElementById("rpassword").state.value)}}>Confirm</Button>
          //   </Container>
          //   <Container fullWidth={"true"}>
          //     <Button style={{fontSize: titleFontSize * 0.5, borderRadius: 7, padding: 10, marginTop: 35, color: 'royalblue', backgroundColor: buttonBackgroundColor}} onClick={() => {switchToLogin()}}>Already have an account? Sign in here.</Button>
          //   </Container>
          // </Container>
      );
  }

  export const FontFamily = {
    poppinsMedium: "Poppins-Medium",
    poppinsSemiBold: "Poppins-SemiBold",
    poppinsBold: "Poppins-Bold",
  };
  /* font sizes */
  export const FontSize = {
    size_base: 16,
    size_xl: 20,
  };
  /* Colors */
  export const Color = {
    colorBlack: "#000",
    colorWhite: "#fff",
    colorDimgray: "#727272",
    colorSnow: "#fffcfc",
    colorGray: "#1e1e1e",
  };
  /* border radiuses */
  export const Border = {
    br_xl: 20,
  };

  const styles = StyleSheet.create({
    fundoLayout: {
      height: 890,
      width: 480,
    },
    orLayout1: {
      width: 420,
      left: 30,
    },
    logInFlexBox: {
      alignItems: "center",
      display: "flex",
      textAlign: "left",
    },
    passwordTypo: {
      height: 46,
      fontFamily: FontFamily.poppinsBold,
      fontWeight: "700",
      fontSize: FontSize.size_xl,
      alignItems: "center",
      display: "flex",
      textAlign: "left",
      color: Color.colorGray,
      width: 420,
      left: 0,
      position: "absolute",
    },
    inputsChildLayout: {
      height: 68,
      position: "absolute",
    },
    remeberChildLayout: {
      height: 32,
      position: "absolute",
    },
    remeberPosition: {
      left: 56,
      height: 32,
      position: "absolute",
    },
    or1Typo: {
      fontFamily: FontFamily.poppinsMedium,
      fontWeight: "500",
      fontSize: FontSize.size_base,
    },
    or1FlexBox: {
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      display: "flex",
      top: 0,
    },
    orLayout: {
      height: 17,
      position: "absolute",
    },
    orItemLayout: {
      height: 1,
      width: 186,
      borderTopWidth: 1,
      top: 8,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      position: "absolute",
    },
    fundo: {
      backgroundColor: Color.colorWhite,
      left: 0,
      top: 0,
      position: "absolute",
    },
    gap: {
      backgroundColor: "#d9d9d9",
      height: 872,
      display: "none",
      top: 5,
      left: 30,
      position: "absolute",
    },
    logIn: {
      fontSize: 40,
      color: Color.colorGray,
      fontFamily: FontFamily.poppinsSemiBold,
      fontWeight: "600",
      fontSize: 40,
      margin: 5,
      marginBottom: 20
    },
    emailAddress: {
      top: 0,
    },
    password: {
      top: 128,
    },
    inputsChild: {
      top: 46,
      width: 400,
      borderWidth: 0.2,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      borderRadius: Border.br_xl,
      height: 68,
      backgroundColor: Color.colorSnow,
      left: 10,
    },
    inputsItem: {
      top: 174,
      width: 400,
      borderWidth: 0.2,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      borderRadius: Border.br_xl,
      height: 68,
      backgroundColor: Color.colorSnow,
      left: 10,
    },
    emailOutlinedEnvelopeBackSIcon: {
      top: 64,
      left: 26,
      overflow: "hidden",
      width: 32,
    },
    inputs: {
      top: 159,
      height: 242,
      position: "absolute",
    },
    remeberChild: {
      width: 32,
      left: 0,
      top: 0,
    },
    rememberPassword: {
      left: 37,
      width: 315,
      color: Color.colorDimgray,
      height: 32,
      position: "absolute",
      alignItems: "center",
      display: "flex",
      textAlign: "left",
      top: 0,
    },
    remeber: {
      top: 425,
      width: 352,
    },
    submitgroupChild: {
      backgroundColor: "#0027ff",
      width: 400,
      borderWidth: 0.2,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      borderRadius: Border.br_xl,
      height: 68,
      left: 0,
      top: 0,
    },
    signIn: {
      color: Color.colorWhite,
      height: 68,
      position: "absolute",
      width: 400,
      fontSize: FontSize.size_xl,
      textAlign: "center",
      fontFamily: FontFamily.poppinsSemiBold,
      fontWeight: "600",
      left: 0,
    },
    dontHaveOn: {
      color: Color.colorDimgray,
    },
    text: {
      color: Color.colorWhite,
    },
    signUp: {
      color: "#118dff",
    },
    dontHaveOnContainer1: {
      width: "100%",
    },
    dontHaveOnContainer: {
      top: 72,
      left: 16,
      width: 374,
      height: 23,
      alignItems: "center",
      display: "flex",
      textAlign: "left",
      position: "absolute",
    },
    submitgroup: {
      top: 471,
      left: 40,
      height: 95,
      width: 400,
      position: "absolute",
    },
    orChild: {
      left: 235,
    },
    orItem: {
      left: 0,
    },
    or1: {
      left: 192,
      width: 43,
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      display: "flex",
      top: 0,
      color: Color.colorWhite,
      fontFamily: FontFamily.poppinsMedium,
      fontWeight: "500",
      fontSize: FontSize.size_base,
    },
    or: {
      top: 646,
      width: 420,
      left: 30,
    },
    icons8Lock1: {
      top: 348,
      overflow: "hidden",
      width: 32,
    },
    loginwithgoogleChild: {
      width: 400,
      borderWidth: 0.2,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      borderRadius: Border.br_xl,
      height: 68,
      left: 0,
      top: 0,
      backgroundColor: Color.colorWhite,
    },
    loginInWith: {
      left: 73,
      color: Color.colorBlack,
      width: 327,
      fontFamily: FontFamily.poppinsMedium,
      fontWeight: "500",
      fontSize: FontSize.size_base,
      height: 68,
      position: "absolute",
    },
    icons8Google1: {
      top: 10,
      left: 55,
      width: 48,
      height: 48,
      overflow: "hidden",
      position: "absolute",
    },
    loginwithgoogle: {
      top: 699,
      left: 44,
      width: 400,
    },
  });



