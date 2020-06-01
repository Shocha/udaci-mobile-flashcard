import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import {white} from '../utils/colors'

export default function Button(props) {
    return (
        <TouchableOpacity onPress={props.onPressHandler}
            style={styles.btnStyle}>
            <Text style={styles.txtStyle}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        alignSelf: 'center',
        margin: 10,
        padding: 25,
        borderRadius: 6,
        borderWidth:2,
        width:150,
        height:60,
        backgroundColor:'#3cb371',
        flex:1,
        justifyContent: "center",
    },
    txtStyle: {
        color: white,
        alignSelf: 'center',
        justifyContent: "center",
    }
})