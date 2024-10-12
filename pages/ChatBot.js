
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, TextInput, StyleSheet} from 'react-native';
import Button from '../template/Button';
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

const PROMPT = gql`
query Query($sessionId: String, $question: String, $context: String) {
  fixedPrompt(sessionId: $sessionId, question: $question, context: $context)
}
`

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

export default function ChatBot(props) {

    const {t} = useTranslation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [enabled, setEnabled] = useState(true);

   const {data, loading} = useQuery(GET_TRAINING);

    async function ask()
    {
        setEnabled(false);
        setDescription((await apolloClient.query({query: PROMPT, variables: {question: title, sessionId: globalThis.sessionId, context: ''}})).data.fixedPrompt);
        setEnabled(true);
    }

    return (
        <ScrollView style={styles.container}>
          <Text style={styles.label}>{t("Zapytanie")}</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder={t("Enter title")}
          />

          <Button disabled={!enabled} style={{marginTop: 10, backgroundColor: !enabled ? '#777' : 'black', paddingTop: 5, paddingBottom: 5, borderRadius: 10, width: '40%'}} textStyle={{color: 'white', fontWeight: 600, fontSize: 20}} hoverColor={!enabled ? '#777' : "#555"} onClick={ask}>{t("Submit")}</Button>
    
          <Text style={styles.label}>{t("Description")}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            editable={false}
          />
    
        </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      textArea: {
        height: 400,
        textAlignVertical: 'top',
      },
    });
      
  