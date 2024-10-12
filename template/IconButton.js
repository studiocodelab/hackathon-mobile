import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import TText from './TText';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function IconButton({name, color, backgroundColor, onPress, style, children})
{
  
  initializeComponent({props: arguments[0]});

    return (
        <Icon.Button
        name={arguments[0] == undefined ? undefined : name}
        color={arguments[0] == undefined ? undefined : color}
        backgroundColor={arguments[0] == undefined ? undefined : backgroundColor}
        onPress={arguments[0] == undefined ? undefined : onPress}
      >
        <TText style={{color: arguments[0] == undefined ? undefined : color, ...style}}>{children}</TText>
      </Icon.Button>
    )
}