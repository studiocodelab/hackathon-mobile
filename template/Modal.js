import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';

export default function MModal({visible, animationType, style, motive, children})
{
    const [modalVisible, setModalVisible] = useState({visible: visible === undefined ? false : visible, hide: hide, show: show, change: change});

    initializeComponent({props: arguments[0], state: modalVisible});

    function hide()
    {
        setModalVisible({visible: false, hide: hide, show: show, change: change});
    }

    function show()
    {
        setModalVisible({visible: true, hide: hide, show: show, change: change});
    }

    function change()
    {
        setModalVisible({visible: !modalVisible.visible, hide: hide, show: show, change: change});
    }

    return (
      <Modal animationType={animationType} transparent={true} visible={modalVisible.visible} style={merge(style, motive)} motive={motive}>
            {
                (motive === undefined ? children : setMotive(children, motive))
            }
      </Modal>
    )
}