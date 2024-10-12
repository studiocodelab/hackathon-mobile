import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Children, useState } from 'react';
import { cloneElement } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import IIcon from './IIcon';

export function Navigaton(props)
{
    const Drawer = props.type === "bottomTab" ? createBottomTabNavigator() : createDrawerNavigator();

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName={props.default}>
                {Children.toArray(props.children).map((element, index) => {
                    return <Drawer.Screen key={index} name={element.props.name} component={element.props.component} options={{
                        headerStyle: {
                          backgroundColor: element.props.backgroundColor === undefined ? props.backgroundColor : element.props.backgroundColor,       
                        },
                        headerTitle: element.props.headerTitle !== undefined ?  (props) => element.props.headerTitle : undefined,
                        headerTintColor: element.props.color === undefined ? props.color : element.props.color,
                        headerTitleStyle: {
                          fontWeight: 'bold',
                        },
                        drawerContentStyle: {
                            backgroundColor: props.drawerBackgroundColor
                        },
                        drawerInactiveTintColor: props.drawerColor
                        , tabBarIcon: (props.type !== "bottomTab" || element.props.icon === undefined ? undefined : ({focused}) => {
                            return (
                                <IIcon name={element.props.icon} color={focused ? '#007FFF' : 'black'} size={16}/>
                            )
                        } )
                      }} />
                })}
            </Drawer.Navigator>
        </NavigationContainer>
      );
}


export function Screen(props)
{
    return (
        <View></View>
    )
}
