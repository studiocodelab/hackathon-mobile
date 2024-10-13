

      import 'react-native-url-polyfill/auto';
      import { StatusBar } from 'expo-status-bar';
      import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, TextInput } from 'react-native';
      import Template from './../template/Template';
      import API from './../template/API';
      import { setMotive } from './../template/Motive';
      import {Panel, Nav} from './../template/Panel'
      import { useState, useRef, useLayoutEffect, useEffect, useCallback} from 'react';
      import Items from './../template/Items';
      import Storage from './../template/Storage';
      import LoginPanel from './../LoginPanel';
      import apolloClient from './../graphqlclient';
      import { ApolloProvider, from, gql, useQuery, useSubscription } from '@apollo/client';
      import Toast from 'react-native-toast-message';
      import { GiftedChat } from 'react-native-gifted-chat'
      import { useTranslation } from 'react-i18next';

      let CHATS = [];

      const GET_MESSAGES = gql`
      query GetMessages($chatId: IntFilter) {
        getMessages(chatId: $chatId) {
          chatId
          date
          fromUser
          id
          text
        }
      }`

      const INSERT_MESSAGES = gql`
      mutation InsertMessages($fromUser: Int, $chatId: Int, $text: String, $date: String) {
        insertMessages(fromUser: $fromUser, chatId: $chatId, text: $text, date: $date) {
          id
        }
      }`

      const GET_CHATS = gql`
      query GetChats($userOneId: IntFilter, $userTwoId: IntFilter) {
        getChats(userOneId: $userOneId, userTwoId: $userTwoId) {
          id
          userOneId
          userTwoId
        }
      }`

      const GET_LOGIN_FROM_ID = gql`
      query GetUserInfo($getUserInfoId: IntFilter) {
        getUserInfo(id: $getUserInfoId) {
          id
          joinUsers {
            login
          }
        }
      }`


      const GET_USERS = gql`
      query Query ($login: StringFilter, $password: StringFilter) {
        getUsers(login: $login, password: $password) {
          id
        }
      }
      `

      const GET_ANOTHER_USERS = gql`
      query Query ($login: StringFilter) {
        getUsers(login: $login) {
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

      const INSERT_CHATS = gql`
      mutation InsertChats($userOneId: Int, $userTwoId: Int) {
        insertChats(userOneId: $userOneId, userTwoId: $userTwoId) {
          id
        }
      }`

      const SUBSCRIBE_FOR_MESSAGE = gql`
        subscription NewMessage {
          newMessage
        }
        `

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
      

      function ChatModal({index, chatId})
      {

        const [previousMessage, setPreviousMessage] = useState('');

        const [messages, setMessages] = useState([]);

        useEffect(() => {
          if (CHATS.length != 0) {
            let data = CHATS[index].messages;
            data.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt)});
            setMessages(data)
          }
        }, [index, chatId])
      
        const onSend = useCallback((messages = []) => {

          if(messages[0].user._id === 1) {
              onMessageSend(index, messages);
              (async () => {
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
                })).data.getUserInfo[0].id
                  await apolloClient.mutate({mutation: INSERT_MESSAGES, variables: {chatId: chatId, text: messages[0].text, date: new Date(Date.now()).toISOString(), fromUser: userInfo }});
              })()
          }
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
          )
        }, [index, chatId])

        if (CHATS.length != 0) {

          globalThis.addToChat = (message) => {
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, [message]),
            )
          }
      }


      const {data} = useSubscription(SUBSCRIBE_FOR_MESSAGE);
      

      if (data !== undefined) {
        let content = data.newMessage;
        let date = new Date(content.split(';')[content.split(';').length - 1]);
        let fromUser = Number(content.split(';')[content.split(';').length - 2]);
        let newChatId = Number(content.split(';')[content.split(';').length - 3]);
        let text = content.split(';').slice(0, content.split(';').length - 3).join('');
        console.log(date, fromUser, newChatId, text);
        if (newChatId === chatId) {
          apolloClient.query({query: GET_LOGIN_FROM_ID, variables: {getUserInfoId: {filter: "eq", value: fromUser}}}).then(async (logins) => {
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

             if (userInfo !== fromUser && previousMessage !== content ) {
              setPreviousMessage(content);
              setMessages(previousMessages =>
                GiftedChat.append(previousMessages,[{
                  _id: CHATS[index].messages.length,
                  text: text,
                  createdAt: date,
                  user: { 
                    _id: fromUser=== userInfo ? 1 : fromUser + 2,
                    name: logins.data.getUserInfo[0].joinUsers.login,
                    avatar: 'https://placeimg.com/140/140/any'
                  }
              }]),
              )
          }


          });
        }
      }

        return (

          <>
          {(CHATS.length === 0) ? (
          <Template.Modal animationType={"slide"} id="chatModal">
            <View style={{padding: 30, backgroundColor: 'white', width: '100%', height: '100%', paddingTop: 40}}>
              </View> 
            </Template.Modal>) : (
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
            
            </Template.Modal>
                )}
            </>
        )}

      function NewChatModal(props) {

        const [title, setTitle] = useState('');

        async function create()
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
          })).data.getUserInfo[0].id;

          let anotherUser = (await apolloClient.query({
            query: GET_ANOTHER_USERS,
            variables: {
              login: {
                filter: "eq",
                value: title
              },
            }
           })).data.getUsers[0].id;

           let anotherUserInfo = (await apolloClient.query({
            query: GET_USER_INFO,
            variables: {
              userId: {
                filter: "eq",
                value: anotherUser
              }
            },
            fetchPolicy: 'no-cache'
           })).data.getUserInfo[0].id;

           await apolloClient.mutate({mutation: INSERT_CHATS, variables: {userOneId: userInfo, userTwoId: anotherUserInfo}});

           Items.getElementById("newChatModal").state.hide();

        }

        const {t} = useTranslation();
          return (
            <Template.Modal id="newChatModal" animationType={"slide"}>
              <Template.Container>
                <Template.Card style={{marginTop: -30, width: '100%', height: '100%'}}>
                    <Template.Text style={{fontSize: 20, fontWeight: 700, marginBottom: 20}}>Nowy czat</Template.Text>
                    <TextInput
                      style={styles.input}
                      value={title}
                      onChangeText={setTitle}
                      placeholder={"Login Użytkownika"}
                      placeholderTextColor={"#BBB"}
                    />
                </Template.Card>
                <Template.Button onClick={() => {Items.getElementById("newChatModal").state.hide();}} textStyle={{fontWeight: 700, color: 'white', fontSize: 20}} style={{backgroundColor: '#FF605C', padding: 8, borderRadius: 8, marginTop: -100, width: '80%'}} hoverColor={'#DD403A'}>{t("Zamknij")}</Template.Button>
                 <Template.Button style={{backgroundColor: '#000', padding: 8, borderRadius: 8, marginTop: -100, marginBottom: 50, width: '80%'}} hoverColor={'#333'} textStyle={{fontWeight: 700, color: 'white', fontSize: 20}} onClick={create}>{t("Stwórz")}</Template.Button>
              </Template.Container>
            </Template.Modal>
          )
        }
  
      export default function Chats(props) 
      {

        const [cards, setCards] = useState([]);

        async function reloadCards()
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
          })).data.getUserInfo[0].id;

          let dataOne = await apolloClient.query({query: GET_CHATS, variables: {
            userOneId: {filter: "eq", value: userInfo}
          }}) 

          let dataTwo = await apolloClient.query({query: GET_CHATS, variables: {
            userTwoId: {filter: "eq", value: userInfo}
          }})

          let result = dataOne.data.getChats.concat(dataTwo.data.getChats);

          outputData = [];

          for (let i = 0; i < result.length; ++i) {
            let element = result[i];
            if (element.userOneId === userInfo) {
              let data = await apolloClient.query({query: GET_LOGIN_FROM_ID, variables: {getUserInfoId: {filter: "eq", value: element.userTwoId}}});
              outputData.push({...element, person: data.data.getUserInfo[0].joinUsers.login})
            } else {
              let data = await apolloClient.query({query: GET_LOGIN_FROM_ID, variables: {getUserInfoId: {filter: "eq", value: element.userOneId}}});
              outputData.push({...element, person: data.data.getUserInfo[0].joinUsers.login});
            }
          } 

          setCards(outputData);
        }

        async function loadMessages()
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
          })).data.getUserInfo[0].id;

          for (let i = 0; i < cards.length; ++i) {
            let id = (await apolloClient.query({query: GET_CHATS, variables: {userOneId: {filter: "eq", value: cards[i].userOneId}, userTwoId: {filter: "eq", value: cards[i].userTwoId}}, fetchPolicy: 'no-cache'})).data.getChats[0].id;
            let messages = (await apolloClient.query({query: GET_MESSAGES, variables: {chatId: {filter: "eq", value: id}}, fetchPolicy: 'no-cache'})).data.getMessages;
            for (let i = 0; i < messages.length; ++i) {
              messages[i].author = await apolloClient.query({query: GET_LOGIN_FROM_ID, variables: {getUserInfoId: {filter: "eq", value: messages[i].fromUser}}});
            }
            let data = messages.map((element, index) => {
              return (
                {
                  _id: index,
                  text: element.text,
                  createdAt: element.date,
                  user: { 
                    _id: element.fromUser === userInfo ? 1 : element.fromUser + 2,
                    name: element.author,
                    avatar: 'https://placeimg.com/140/140/any'
                  }
                }
              )
            })
            CHATS.push({messages: data});
          } 
        }

        useEffect(() => {
          loadMessages();
        }, [cards])

        useEffect(() => {
          reloadCards();
        }, [])

        const {data, loading} = useQuery(GET_CHATS, {fetchPolicy: 'no-cache'});

        const {t} = useTranslation();

        globalThis.index = -1;

        const [state, setState] = useState({index: 0, chatId: -1});

        function showChat(index, chatId)
        {
          globalThis.index = index;
          setState({index: index, chatId: chatId});
          Items.getElementById("chatModal").state.show();
        }

        const chats = cards.filter((element) => {return element.userOneId === 1 || element.userTwoId === 1}).map((element, index) => {

          return (
            <Template.Card key={index} style={{width: 'auto', margin: 5}} onClick={() => {showChat(index, element.id)}}>
              <Template.Text style={{fontWeight: 700, fontSize: 20}}>{element.person}</Template.Text>
            </Template.Card>
          )
        })

        return (
        <Template.Container fullWidth={true} style={{justifyContent: 'flex-start', margin: 10}}>
          <NewChatModal/>
          <ChatModal index={state.index} chatId={state.chatId}/>
            <Template.Button style={{backgroundColor: 'navy', alignSelf: 'flex-end', borderRadius: 10}} textStyle={{color: 'white', fontWeight: '700', paddingHorizontal: 15, paddingVertical: 4, fontSize: 35}} hoverColor={"#0005AA"} onClick={() => {Items.getElementById("newChatModal").state.show()}}>+</Template.Button>
          <Template.Scrollable fullWidth={true}>
            {chats}
          </Template.Scrollable>
        </Template.Container>
        )
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
          color: 'black'
        },
      });
        
        
        