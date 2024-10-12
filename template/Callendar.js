import CalendarPicker from "react-native-calendar-picker";

export default function Callendar({onChange, callendarProps})
{
    return (
        <CalendarPicker onDateChange={onChange} {...callendarProps} />
    )
}