import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';

export default function NumberBox({defaultValue, allowComma, onChangeText, style, motive, placeholder, children, placeholderTextColor})
{
    const [state, setState] = useState({value: defaultValue != undefined ?  defaultValue : "", lastValue: defaultValue != undefined ?  defaultValue : ""});

    initializeComponent({props: arguments[0], state: state});

    function validateNumber(e)
    {
        if (isNaN(allowComma ? e.replaceAll(",", ".") : Number(e))) {
            setState({lastValue: state.lastValue, value: state.lastValue});
        } else {
            setState({lastValue: state.value, value: Number(e)});
        }

        if (onChangeText != undefined)
        {
            onChangeText(Number(e));
        }
    }

    return (
            <TextInput style={merge(style, motive)} value={String(state.value)} motive={motive} onChangeText={validateNumber} placeholder={placeholder} keyboardType="numeric" placeholderTextColor={placeholderTextColor}>
                {
                    (motive === undefined ? children : setMotive(children, motive))
                }
            </TextInput>
    )
}