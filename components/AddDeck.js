import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'

class AddDeck extends Component {
    state = {
        title: ''
    }
    submitDeck=()=> {
        const { title } = this.state


        saveDeckTitle(title).then(() => {
            this.props.dispatch(addDeck(title))
            this.props.navigation.navigate('DeckView', { id: title })
        })
    }

    render() {
        return (<View style={styles.container}>
            <Text style={styles.title}>Please Enter the deck name</Text>

            <TextInput onChangeText={(title) => this.setState({ title: title })} value={this.state.title} style={styles.input} />
            <TouchableOpacity onPress={this.submitDeck}  disabled={this.state.title === ''} title="Add Deck" style={styles.btn}><Text style={styles.btntxt}>Submit</Text></TouchableOpacity>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {

        height: 800
    },
    input: {
        margin: 20,
        height: 50,
        padding: 10,
        borderColor: '#7a42f4',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff'
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        margin: 5,
    },
    btn: {
        backgroundColor: '#0066CC',
        padding: 15,
        margin: 20,
        height: 46,
        borderRadius: 4
    },
    btntxt: {
        color: '#ffffff',
        marginLeft: 140,
        justifyContent: "center"
    }
})
export default connect()(AddDeck)