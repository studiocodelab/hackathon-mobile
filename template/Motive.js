import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Children } from 'react';
import { cloneElement } from 'react';


function clone(e) { return e == undefined ? undefined :  JSON.parse(JSON.stringify(e))};

export function setMotive(children, motive) 
{
    let elements = Children.toArray(children);
    if (elements.length == 0) {
        return null;
    } else if (elements.length == 1) {
        return updateMotive(elements[0], clone(motive));
    } else {
       return elements.map((element) => {
            return updateMotive(element, clone(motive));
        })
    }
}

export function merge(style, motive)
{
    if (style === undefined && motive === undefined) {
        return null;
    } else if (style === undefined) {
        return {...motive};
    } else if (motive === undefined) {
        return style;
    } else {
        let result = {...motive};
        for (key in style) {
            result[key] = style[key];
        }
        return result;
    }
}


function updateMotive(Child, parentMotive)
{
    if (typeof Child !== "string") {
    if (Child.props.motive === undefined) {
        let style;
        let collectedMotive = clone(parentMotive);
        if (Child.props.alternativeMotive == "true") {
            tmp = collectedMotive.color;
            collectedMotive.color = collectedMotive.backgroundColor;
            collectedMotive.backgroundColor = tmp;
            if (Child.props === undefined || Child.props.style === undefined) {
                style = {};
            } else {
                style = clone(Child.props.style);
            }
            for (key in collectedMotive) {
                if (style[key] === undefined) {
                    style[key] = collectedMotive[key];
                } 
            } 
            return cloneElement(Child, {motive: {...collectedMotive}, style: style});

        } else {

            if (Child.props === undefined || Child.props.style === undefined) {
                style = {};
            } else {
                style = clone(Child.props.style);
            }
            for (key in collectedMotive) {
                if (style[key] === undefined) {
                    style[key] = collectedMotive[key];
                } 
            }
        }
            return cloneElement(Child, {motive: {...collectedMotive}, style: style});

    } else {
        let style;
        if (Child.props === undefined || Child.props.style === undefined) {
            style = {};
        } else {
            style = clone(Child.props.style);
        }
        for (key in parentMotive) {
            if (Child.props.motive[key] === undefined) {
                style[key] = clone(parentMotive[key]); 
            } else {
                style[key]= clone(Child.props.motive[key]);
            }
        } 

        let newMotive = merge(Child.props.motive, parentMotive);

        if (Child.props.alternativeMotive == "true") {
            tmp = style.color;
            style.color = style.backgroundColor;
            style.backgroundColor = tmp;

            tmp = newMotive.color;
            newMotive.color = newMotive.backgroundColor;
            newMotive.backgroundColor = tmp;
        }

        return cloneElement(Child, {style: style, motive: newMotive });
    }
    } else {
        return Child;
    }
}

export function mergeObjects(...objects) 
{
    let result = {};
    objects.forEach((element) => {
        result = {
            ...result,
            ...element
        }
    })
    return result;
}

