import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Children } from 'react';
import { cloneElement, useState } from 'react';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';
import { TimelineCalendar } from '@howljs/calendar-kit';

// event example:
// const exampleEvents = [
//   {
//     id: '1',
//     title: 'Event 1',
//     start: '2022-11-06T09:00:05.313Z',
//     end: '2022-11-06T12:00:05.313Z',
//     color: '#A3C7D6',
//   },
//   {
//     id: '2',
//     title: 'Event 2',
//     start: '2022-11-06T11:00:05.313Z',
//     end: '2022-11-06T14:00:05.313Z',
//     color: '#B1AFFF',
//   },
// ];

export default function Scheduler({viewMode, events, onEventPressed, movingEnabled})
{

    const [currentEvents, setEvents] = useState(events);
    const [selectedEvent, setSelectedEvent] = useState();

    const cancel = () => {
        setSelectedEvent(undefined);
      };
    
      const submit = () => {
        setEvents((prevEvents) =>
          prevEvents.map((ev) => {
            if (ev.id === selectedEvent?.id) {
              return { ...ev, ...selectedEvent };
            }
            return ev;
          })
        );
        setSelectedEvent(undefined);
        return selectedEvent;
      };

    initializeComponent({props: arguments[0], state: selectedEvent, cancel: cancel, submit: submit});

    const _onLongPressEvent = (event) => {
        setSelectedEvent(event);
      };

    return (
        <TimelineCalendar
        onLongPressEvent={_onLongPressEvent}
        selectedEvent={movingEnabled ? selectedEvent : undefined}
        onEndDragSelectedEvent={setSelectedEvent}
        events={currentEvents}
        viewMode={viewMode}
        allowPinchToZoom
        initialTimeIntervalHeight={60}
        minTimeIntervalHeight={29}
        maxTimeIntervalHeight={110}
        onPressEvent={onEventPressed}
      />
    )
}