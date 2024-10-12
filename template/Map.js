import MapView from 'react-native-maps';
import { Marker, Geojson } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';
import { TimelineCalendar } from '@howljs/calendar-kit';

export function Map({initialPoint, children, style, id})
{

  initializeComponent({props: arguments[0]});

    return (
        <MapView  
        style={style}
        initialRegion={{
            latitude: initialPoint.x,
            longitude: initialPoint.y,
            latitudeDelta: initialPoint.width,
            longitudeDelta: initialPoint.height,
          }}>
            {children}
        </MapView>
    )
}

export function MMarker({index, coordinate, title, description, onClick})
{
    return (
        <Marker
      key={index}
      coordinate={{latitude: coordinate.x, longitude: coordinate.y}}
      title={title}
      description={description}
      onPress={onClick}
    />
    )
}

export function GGeoJson({data, strokeColor, strokeField, strokeWidth})
{
    return (
        <Geojson
        geojson={data}
        strokeColor={strokeColor}
        fillColor={strokeField}
        strokeWidth={strokeWidth}
      />
    )
}