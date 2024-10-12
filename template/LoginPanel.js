

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Children, useState } from 'react';
import { cloneElement } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';
import Container from './Container';
import TText from './TText';
import IIcon from './IIcon';
import TextBox from './TextBox';
import PassBox from './PassBox';
import Button from './Button';
import Items from './Items';
import OpenSans from '../fonts/OpenSans-Bold.ttf'
import Roboto from '../fonts/Roboto-Medium.ttf'
import { useTranslation } from 'react-i18next';

import { useFonts } from 'expo-font';

export default function LoginPanel({backgroundColor, titleColor, loginIcon, loginText, passwordIcon, passwordText, inputFontSize, titleFontSize, buttonBackgroundColor, borderColor, onSubmit, switchToRegistration})
{

    const {t} = useTranslation();

    const [state, setState] = useState();
    initializeComponent({props: arguments[0]});

    const [loaded, error] = useFonts({
      'OpenSans': OpenSans,
      'Roboto':  Roboto
    });
  

    return (
        <Container style={{backgroundColor: "white"}} fullWidth="true">
            <Container fullWidth={"true"} flex={5} style={{alignItems: 'flex-start', padding: 15}} motive={{fontWeight: "600"}}>
                <TText style={styles.logIn}>Sign in</TText>
                <TText style={{color: titleColor, fontSize: titleFontSize, margin: 5, paddingLeft: 15}}><IIcon name={loginIcon} color={"#0027FF"} size={titleFontSize * 0.8}/> {loginText}</TText>
                <TextBox placeholderTextColor={'rgba(0,0,0,0.5)'} id="login" placeholder="login" style={{width: '98%', marginHorizontal: 'auto' , borderWidth: 2, borderRadius: 15, padding: 7, fontSize: inputFontSize, margin: 5, borderColor: borderColor, color: borderColor}}></TextBox>
                <TText style={{color: titleColor, fontSize: titleFontSize, margin: 5, paddingLeft: 15}}><IIcon name={passwordIcon} color={"#0027FF"} size={titleFontSize * 0.8}/> {passwordText}</TText>
                <PassBox placeholderTextColor={'rgba(0,0,0,0.5)'} id="password" placeholder="password" style={{width: '98%', marginHorizontal: 'auto' , borderWidth: 2, borderRadius: 15, padding: 7, fontSize: inputFontSize,  margin: 5, borderColor: borderColor, color: borderColor}}></PassBox>
                <View style={{width: '100%'}}>
                    <Button 
                         textStyle={{color: Color.colorWhite, fontWeight: "600", fontSize: 20, paddingVertical: 10}}
                         hoverColor={"#0004DD"}
                         style={{fontSize: titleFontSize, borderRadius: 15, padding: 4, marginTop: 5, color: titleColor, backgroundColor: "#0027FF", width: '98%', textAlign: 'center', marginHorizontal: 'auto', marginTop: 15}} 
                         onClick={() => {onSubmit(Items.getElementById("login").state.value, Items.getElementById("password").state.value)}}>
                        Sign in
                    </Button>
                </View>
            </Container>
            <Container>
                <Button 
                    textStyle={{color: 'royalblue', fontWeight: 800}}
                    style={{fontSize: titleFontSize * 0.5, borderRadius: 7, padding: 10, marginTop: 35, color: 'royalblue'}}
                    onClick={() => {switchToRegistration()}}>
                    Don't an have account? Sign up here.
                </Button>
            </Container>
        </Container>
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
      marginBottom: 20,
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
