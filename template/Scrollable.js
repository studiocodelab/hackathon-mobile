import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Children } from 'react';
import { cloneElement } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';

export default function Scrollable({fullWidth, style, motive, children, horizontal, refreshControl})
{
    initializeComponent({props: arguments[0]});
    
    return (
        <ScrollView style={{width: fullWidth == "true" || fullWidth == true ? "100%" : undefined , ...merge(style, motive)}} motive={motive} horizontal={horizontal} refreshControl={refreshControl}>
            {
                (motive === undefined ? children : setMotive(children, motive))
            }
        </ScrollView>
    )
}