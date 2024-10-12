import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Children } from 'react';
import { cloneElement } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';

export default function TText({style, motive, children})
{
    initializeComponent({props: arguments[0]});

    return (
        <Text style={merge(style, motive)} motive={motive}>
            {
                (motive === undefined ? children : setMotive(children, motive))
            }
        </Text>
    )
}