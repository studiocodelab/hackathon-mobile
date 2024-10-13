import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { gql } from '@apollo/client';
import apolloClient from '../graphqlclient';
import Storage from '../template/Storage';
import Template from '../template/Template';
import Items from '../template/Items';

const questions = [
  { type: 'rating', text: "Jak oceniasz Twoje wrażenia związane z udziałem w szkoleniu?" },
  { type: 'rating', text: "Jakbyś miał/a ocenić poziom wiedzy, jaką zdobyłeś/aś podczas szkolenia?" },
  { type: 'rating', text: "Jak oceniasz część praktyczną szkolenia?" },
  { type: 'rating', text: "Jak przeprowadzone szkolenie wpisało się w twoje oczekiwania" },
  { type: 'select', text: "Jaką formę szkoleń preferujesz", options: ['Stacjonarne', 'Online', 'Obie formy są atrakcyjne'] },
  { type: 'input', text: "Jakie tematy chciałbyś/chciałabyś poruszyć podczas przyszłych szkoleń?" },
  { type: 'input', text: "Jakie konkretne techniki i narzędzia zdobyte na szkoleniu są najbardziej przydatne dla Ciebie?" },
  { type: 'input', text: "Co było najbardziej wartościowe podczas szkolenia i co jeszcze można poprawić, aby przyszłe szkolenia były jeszcze bardziej skuteczne?" },
  { type: 'select', text: "Czy chciałbyś/chciałabyś uczestniczyć w przyszłych szkoleniach organizowanych przez tę samą firmę?" , options: ['Tak', 'Nie'] },
  { type: 'input', text: "Skąd dowiedziałeś się o szkoleniu?" },
];

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

const INSERT_SURVEY = gql`
mutation InsertSurveys($userInfoId: Int, $aswer: String) {
  insertSurveys(userInfoId: $userInfoId, aswer: $aswer) {
    id
  }
}
`

export default function EnhancedSurveyScreen() {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleSubmit = async () => {

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

    let aswer = JSON.stringify(answers);

    await apolloClient.mutate({
      mutation: INSERT_SURVEY,
      variables: {
        userInfoId: userInfo,
        aswer: aswer
    }})

    Items.getElementById("surveyModal").state.hide();


  };

  const renderStars = (questionIndex) => {
    const rating = answers[questionIndex] || 0;
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity
        key={star}
        onPress={() => handleAnswer(questionIndex, star)}
        style={styles.starButton}
      >
        <Text style={[styles.starText, star <= rating && styles.selectedStar]}>
          ★
        </Text>
      </TouchableOpacity>
    ));
  };

  const renderSelect = (questionIndex, options) => (
    <Picker
      selectedValue={answers[questionIndex] || ''}
      style={styles.picker}
      onValueChange={(itemValue) => handleAnswer(questionIndex, itemValue)}
    >
      <Picker.Item label="Wybierz" value="" />
      {options.map((option, index) => (
        <Picker.Item key={index} label={option} value={option} />
      ))}
    </Picker>
  );

  const renderInput = (questionIndex) => (
    <TextInput
      style={styles.input}
      onChangeText={(text) => handleAnswer(questionIndex, text)}
      value={answers[questionIndex] || ''}
      placeholder="Tutaj wprowadź odpowiedź"
      multiline
    />
  );

  return (
    <ScrollView style={{...styles.container, marginVertical: 20}}>
      <Text style={styles.title}>Ankieta uczestnika warsztatu</Text>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{question.text}</Text>
          {question.type === 'rating' && (
            <View style={styles.starsContainer}>
              {renderStars(index)}
            </View>
          )}
          {question.type === 'select' && renderSelect(index, question.options)}
          {question.type === 'input' && renderInput(index)}
        </View>
      ))}
      <TouchableOpacity
        style={{...styles.submitButton, marginBottom: 30}}
        onPress={handleSubmit}
      >
        <Text style={{...styles.submitButtonText}}>Prześlij</Text>
      </TouchableOpacity>
      <Template.Button onClick={() => {Items.getElementById("surveyModal").state.hide();}} textStyle={{fontWeight: 700, color: 'white', fontSize: 20}} style={{backgroundColor: '#FF605C', padding: 8, borderRadius: 8, width: '100%', alignSelf: 'center', marginBottom: 100}} hoverColor={'#DD403A'}>Zamknij</Template.Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    padding: 5,
  },
  starText: {
    fontSize: 30,
    color: '#ccc',
  },
  selectedStar: {
    color: '#ffd700',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'navy',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});