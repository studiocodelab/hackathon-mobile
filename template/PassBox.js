import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';

export default function PassBox({defaultValue, onChangeText, style, motive, children, placeholder, placeholderTextColor})
{
    const [state, setState] = useState({value: defaultValue != undefined ?  String(defaultValue) : ""});

    initializeComponent({props: arguments[0], state: state});

    function updateValue(e)
    {
        setState({value: e});

        if (onChangeText != undefined)
        {
            onChangeText(e);
        }
    }
    
    return (
        <TextInput secureTextEntry={true} keyboardType="default" style={merge(style, motive)} defaultValue={defaultValue != undefined ? String(defaultValue) : undefined} motive={motive} onChangeText={updateValue} placeholder={placeholder} placeholderTextColor={placeholderTextColor}>
            {
                (motive === undefined ? children : setMotive(children, motive))
            }
        </TextInput>
    )
}