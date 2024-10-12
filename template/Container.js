import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Children } from 'react';
import { cloneElement } from 'react';
import {setMotive} from './Motive';
import initializeComponent from './Initialize';

function clone(e) { return JSON.parse(JSON.stringify(e)); }


export default function Container({children, motive, style, unFocusOnClick, onClick, flex, direction, fullHeight, fullWidth})
{
    initializeComponent({props: arguments[0]});

    if (onClick === undefined) {
        if (unFocusOnClick == "true") {
            return (
                <ScrollView contentContainerStyle={generateMotive(arguments[0]).template} scrollEnabled={false}>
                    <View style={generateMotive(arguments[0]).template}>
                        {
                            motive === undefined ? children : setMotive(children, motive)
                        }
                    </View>
                </ScrollView>
            )
        } else {
        return (
            <View style={generateMotive(arguments[0]).template}>
                {
                    motive === undefined ? children : setMotive(children, motive)
                }
            </View>
        )
        }
    } else {
        if (unFocusOnClick == "true") {
            <ScrollView style={generateMotive(arguments[0]).template} scrollEnabled={false}>
                <TouchableOpacity onPress={onClick} style={generateMotive(arguments[0]).template}>
                    <View style={generateMotive(arguments[0]).template}>
                        {
                            motive === undefined ? children : setMotive(children, motive)
                        }
                    </View>
                </TouchableOpacity>
            </ScrollView>
        } else {
        return (
        <TouchableOpacity onPress={onClick} style={generateMotive(arguments[0]).template}>
            <View style={generateMotive(arguments[0]).template}>
                {
                    motive === undefined ? children : setMotive(children, motive)
                }
            </View>
        </TouchableOpacity>
        )
        }
    }
}

function generateMotive(props)
{
    if (props.motive === undefined) {
        return StyleSheet.create({
            template: {
             display: "flex",
              flex: props.flex === undefined ? 1 : Number(props.flex),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: props.direction === undefined ? "column" : props.direction,
              height: props.fullHeight == "true" ? "100%" : undefined,
              width: props.fullWidth == "true" ? "100%" : undefined,
              ...props.style
            },
          });
    } else {
        // let backGround = props.motive.backgroundColor == undefined || props.motive.backgroundColor == null ? "white" : props.motive.backgroundColor;
        // let foreGround = props.motive.color == undefined || props.motive.color == null ? "black" : props.motive.color;
        let style = {
            template: {
              ...props.motive,
              display: "flex",
              flex: props.flex === undefined ? 1 :  props.flex == 0 ? undefined : Number(props.flex),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: props.direction === undefined ? "column" : props.direction,
              height: props.fullHeight == "true" ? "100%" : undefined,
              width: props.fullWidth == "true" ? "100%" : undefined
            },
          }
        style = StyleSheet.create(style);
    let attributeStyle = {template: props.style};
    let result = {template: {}};
    for (key in style.template) {
        result.template[key] = style.template[key];
    }
    for (key in attributeStyle.template) {
        result.template[key] = attributeStyle.template[key];
    }
        return result;
    }

}