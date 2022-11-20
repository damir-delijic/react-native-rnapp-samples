import {StyleSheet} from 'react-native';

const tirkizna = "#6BC6A5";
const narandzasta = "#DF7356";
const zuta = "#F9D162";
const bijela = "#FFFFFF";
const tamnoPlava = "#425A7D";
const plavkasta = "#A0C0D6";
const najsvjetlijaPlava = "#E5FAFC";
const crnkasta = "#2A3240"

const user = {
    _id: '62ec3f01372eca2d88056464',
    username: 'testuser',
    password: 'q'
}

var search;
var bubbleCallback;

const styles = StyleSheet.create({
    mainBackgroundColor: {
      backgroundColor: tamnoPlava
    },
});

var GLOBAL = {
    styles,
    user,
    search,
    bubbleCallback
}

export default GLOBAL;