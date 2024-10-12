import { Avatar, Button, Card, Text } from 'react-native-paper';
import {setMotive, merge} from './Motive';
import initializeComponent from './Initialize';

export default function CCard({title, subtitle, Actions, children, style, motive, onClick}) 
{
    initializeComponent({props: arguments[0]});
    
    return (
        <Card style={merge(style, motive)} motive={motive} onPress={() => {onClick === undefined ? undefined : onClick(arguments[0])}}>
            <Card.Title title={title} subtitle={subtitle}/>
            <Card.Content>
                {
                    (motive === undefined ? children : setMotive(children, motive))
                }
            </Card.Content>
            <Card.Actions>
               { Actions === undefined ? null : <Actions/> }
            </Card.Actions>
        </Card>
    )
}