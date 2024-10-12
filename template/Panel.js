import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Children, useState, cloneElement, useEffect } from 'react';
import Template from './Template';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';

function clone(e)
{
    return JSON.parse(JSON.stringify(e));
}

export class Panel
{
    constructor(json)
    {
        this.pages = [];
        this.navs = [];
        this.default = json == undefined || json.default == undefined ? 0 : json.default;
        this.pageState = null;
        this.pageSetState = null;
        this.navbarSetState = null;
        this.navbarState = null;
    }

    NavBar = (props) => {
        const [state, setState] = useState({chosenWindow: this.default, pageSetState: this.pageSetState});

        this.navbarSetState = setState;
        this.navbarState = state;

        initializeComponent({props: props, state: state});

        this.navs = Children.toArray(props.children).map((child) => {
            return {element: child, order: child.order };
        });
        let objNavs = {...this.navs};
        let result = [];
        for (key in objNavs) {
            result.push({order: objNavs[key].order, element: cloneElement(objNavs[key].element, {index: key, state: state, setState: setState, pageSetState: state.pageSetState})});
        }
        result.sort((a, b) => { return (a.order === undefined ? 0 : a.order) - (b.order === undefined ? 0 : b.order)});
        return (
            <Template.Container direction={props.direction == undefined ? "row" : props.direction} {...props}>
                {
                    setMotive(result.map((element, index) => {
                        return cloneElement(element.element, {key: index, fullWidth: props.blocksFullWidth, fullHeight: props.blocksFullHeight });
                    }), props.motive )
                }
            </Template.Container>
        )
    }

    SelectedPage = (props) =>
    {
        const [state, setState] = useState({chosenWindow: this.default});

        initializeComponent({props: props, state: state});

            this.pageSetState = setState;
            this.pageState = state;

            useEffect(() => {
                if (this.navbarSetState != null ) {
                    let newState = clone(this.navbarState);
                    newState.pageSetState = this.pageSetState;
                    this.navbarSetState(newState);
                }
              });  

        return setMotive(Children.toArray(props.children)[state.chosenWindow], props.motive);
    }

    changeTo(key)
    {
        this.pageSetState({chosenWindow: key});
        this.navbarSetState == undefined ? null : this.navbarSetState({chosenWindow: key});
    }
    
}

export function Nav(props)
{

    initializeComponent({props: props});

    function changeTo()
    {
        props.pageSetState({chosenWindow: props.index});
        props.setState({chosenWindow: props.index});
    }

    return (
        <Template.Container fullHeight={props.fullHeight} fullWidth={props.fullWidth} flex={props.flex == undefined ? 1 : Number(props.flex)} motive={props.state.chosenWindow == props.index ? merge(props.selectedMotive, props.motive) : props.motive} style={props.state.chosenWindow == props.index ? merge(props.selectedStyle, props.style) : props.style} onClick={changeTo}>
        {
            (setMotive(props.children, props.state.chosenWindow == props.index ? merge(props.selectedMotive, props.motive) : props.motive))
        }
        </Template.Container>
    )
}