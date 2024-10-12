

      import 'react-native-url-polyfill/auto';
      import { StatusBar } from 'expo-status-bar';
      import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
      import Template from './../template/Template';
      import API from './../template/API';
      import { setMotive } from './../template/Motive';
      import {Panel, Nav} from './../template/Panel'
      import { useState, useRef, useLayoutEffect, useEffect, useCallback} from 'react';
      import Items from './../template/Items';
      import Storage from './../template/Storage';
      import LoginPanel from './../LoginPanel';
      import apolloClient from './../graphqlclient';
      import { ApolloProvider, gql } from '@apollo/client';
      import Toast from 'react-native-toast-message';
      import { GiftedChat } from 'react-native-gifted-chat'
      import { useTranslation } from 'react-i18next';


      let CHATS = [
        {
          head: {
            title: 'firstChat'
            , subtitle: 'today'
            , content: 'how are you?'
          }, 
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: 'Sun Sep 08 2024 10:49:17 GMT+0200 (czas środkowoeuropejski letni)',
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            }
          ]
        } ,
        {
          head: {
            title: 'firstChat'
            , subtitle: 'today'
            , content: 'how are you?'
          }, 
          messages: [
            {
              _id: 1,
              text: 'Hello developer2',
              createdAt: 'Sun Sep 08 2024 10:49:17 GMT+0200 (czas środkowoeuropejski letni)',
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            }
          ]
        }
      ]

      let addMessage = (index, message) => {
        CHATS[index].messages.push(message);
        if (index === globalThis.index) {
          globalThis.addToChat(message);
        }
      }

      function onMessageSend(index, messages)
      {
        CHATS[index].messages = messages.concat(CHATS[index].messages);
      }
      

      function ChatModal({index})
      {
        const [messages, setMessages] = useState([])

        useEffect(() => {
          setMessages(CHATS[index].messages)
        }, [index])
      
        const onSend = useCallback((messages = []) => {
          if(messages[0].user._id === 1) {
              onMessageSend(index, messages);
          }
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
          )
        }, [index])

        globalThis.addToChat = (message) => {
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [message]),
          )
        }

        return (
            <Template.Modal animationType={"slide"} id="chatModal">
              <View style={{padding: 30, backgroundColor: 'white', width: '100%', height: '100%', paddingTop: 40}}>
                <Template.IconButton name={'remove'} onPress={() => {Items.getElementById("chatModal").state.hide();}} backgroundColor={'black'} color={'white'} style={{fontWeight: 700, fontSize: 16}}>Close</Template.IconButton>
                  <GiftedChat
                      messages={messages}
                      onSend={messages => onSend(messages)}
                      user={{
                        _id: 1,
                      }}
                    />
              </View>
              
                {/* <Template.Card style={{width: '100%'}}>
                  <Template.IconButton name={'remove'} onPress={() => {Items.getElementById("modal").state.hide();}} backgroundColor={'rgba(0,0,0,0)'} color={'black'} style={{fontWeight: 700, fontSize: 16}}>Close</Template.IconButton>
                  <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                      _id: 1,
                    }}
                  />
                </Template.Card> */}
            </Template.Modal>
        )
      }
  
      export default function Chats(props) 
      {

        const {t} = useTranslation();

        globalThis.index = -1;

        const [state, setState] = useState({index: 0});

        function showChat(index)
        {
          globalThis.index = index;
          setState({index: index})
          Items.getElementById("chatModal").state.show();
        }

        return (
        <Template.Container fullWidth={true} style={{justifyContent: 'flex-start', margin: 10}}>
          <ChatModal index={state.index}/>
          <Template.Scrollable fullWidth={true}>
            {CHATS.map((element, index) => {
              return (
                <Template.Card key={index} {...element.head} style={{width: 'auto', margin: 5}} onClick={() => {showChat(index)}}>
                  <Template.Text style={{fontWeight: 700, fontSize: 20}}>{element.head.content}</Template.Text>
                </Template.Card>
              )
            })}
          </Template.Scrollable>
        </Template.Container>
        )
      }
        
        