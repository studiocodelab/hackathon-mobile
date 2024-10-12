import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateBox({defaultValue, style, motive, onChange})
{
    const [state, setState] = useState({value: defaultValue != undefined ?  String(defaultValue) : ""});

    initializeComponent({props: arguments[0], state: state});

    function updateValue(e, date)
    {
        setState({value: date});

        if (onChange != undefined)
        {
            onChange(date);
        }
    }
    
    return (
        <DateTimePicker display="spinner" value={defaultValue === undefined ? new Date() : defaultValue} style={merge(style, motive)} onChange={updateValue}/>
    )
}