
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { Children } from 'react';
import { cloneElement } from 'react';
import {setMotive, merge} from './Motive';
import TText from './TText';
import initializeComponent from './Initialize';


export default function Button({onClick, style, motive, children, hoverColor, textStyle, disabled})
{
    initializeComponent({props: arguments[0]});
    style = style === undefined ? {} : style

    return (
        // <TouchableOpacity onPress={onClick != undefined ? onClick.bind(this, arguments[0]) : null} style={{width: style === undefined ? undefined : (style.width === undefined ? undefined : style.width), justifyContent: style === undefined ? undefined : (style.justifyContent === undefined ? undefined : style.justifyContent), alignItems: style === undefined ? undefined : (style.alignItems === undefined ? undefined : style.alignItems) /*style === undefined ? undefined : (style.borderRadius === undefined ? undefined : style.borderRadius)*/}}>
        <Pressable disabled={disabled} onPress={onClick != undefined ? onClick.bind(this, arguments[0]) : null} style={({pressed}) => {return {...merge(style, motive), backgroundColor: pressed ? hoverColor :(Object.keys(style).length === 0 ? undefined : style.backgroundColor)}}}>
            <TText motive={motive} style={{textAlign: 'center', ...textStyle}}>
                {
                    motive === undefined ? children : setMotive(children, motive)
                }
            </TText>
        </Pressable>
        // </TouchableOpacity> 
    )
}

