import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Container from './Container'
import TText from './TText';
import Button from './Button';
import TextBox from './TextBox';
import NumberBox from './NumberBox';
import PassBox from './PassBox';
import DateBox from './DateBox';
import MModal from './Modal';
import Body from './Body';
import IconButton from './IconButton';
import IIcon from './IIcon';
import Scrollable from './Scrollable';
import {Navigaton, Screen} from './Navigation';
import LoginPanel from './LoginPanel';
import Callendar from './Callendar';
import CCard from './Card';
import LLineChart from './LLineChart';
import HeatMap from './HeatMap';
import Scheduler from './Scheduler';
import { Map, MMarker, GGeoJson } from './Map';
import BarChart from './BarChart';

export default class Template
{
    static Container = Container
    static Text = TText;
    static Button = Button;
    static TextBox = TextBox;
    static NumberBox = NumberBox
    static PassBox = PassBox;
    static DateBox = DateBox;
    static Modal = MModal;
    static Body = Body;
    static IconButton = IconButton;
    static Icon = IIcon;
    static Scrollable = Scrollable;
    static Navigaton = Navigaton;
    static Screen = Screen;
    static LoginPanel = LoginPanel;
    static Calendar = Callendar;
    static Card = CCard;
    static LineChart = LLineChart;
    static HeatMap = HeatMap;
    static Scheduler = Scheduler;
    static Map = Map;
    static Marker = MMarker;
    static GeoJson = GGeoJson;
    static BarChart = BarChart;

    // static Navigaton = Navigaton
    // static Screens = Screens
    // static Screen = Screen
}
