import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Animated } from 'react-native'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'



class DeckList extends Component {
    state = {
        ready: false,
        bounceValue: new Animated.Value(1)
    }

    componentDidMount = () => {
        const { dispatch } = this.props

        getDecks()
            .then((decks) => {
                dispatch(receiveDecks(decks))
            }).then(() => this.setState(() => ({
                ready: true,
            })))
    }
    newLoc = (deck) => {
        let { bounceValue } = this.state

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
        ]).start()

        setTimeout(() => {    
            this.props.navigation.navigate('DeckView', { id: deck }) }, 500)
    }
    render() {
        const { decks } = this.props
        const { bounceValue } = this.state

        return (<View style={styles.container}>
            <Text style={styles.title}>FlashCards</Text>
            {Object.keys(decks).map((deck) => (
                <Animated.View key={deck} style={{ transform: [{ scale: bounceValue }] }}>
                    <Text style={styles.txt}>{deck}</Text>
                    <Button onPress={() => this.newLoc(deck)} title="view deck">
                    </Button>
                </Animated.View>
            ))}
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        margin: 5,
    },
    txt:{
        alignSelf: 'center',
        fontSize: 10,
        margin: 5
    }
})
function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)