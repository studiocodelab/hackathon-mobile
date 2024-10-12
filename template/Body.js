import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Body({text, backgroundColor, children})
{
    return (
        <>
        <StatusBar style={text}/>
        <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor}}>
            {children}
        </SafeAreaView>
        </>
    )
}