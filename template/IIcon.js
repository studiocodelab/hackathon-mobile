import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import TText from './TText';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function IIcon({name, color, backgroundColor, size})
{
    initializeComponent({props: arguments[0]});
    
    return (
        <Icon
        name={arguments[0] == undefined ? undefined : name}
        color={arguments[0] == undefined ? undefined : color}
        backgroundColor={arguments[0] == undefined ? undefined : backgroundColor}
        size={arguments[0] == undefined ? undefined : size}
         />
    )
}