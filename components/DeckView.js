import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'

class DeckView extends Component {
    render() {
        const { deck } = this.props
        return (
            <View styles={styles.container}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.num}>{deck.questions.length} number of Cards</Text>
                <Button text="Add Card" onPressHandler={() => this.props.navigation.navigate(
                    'AddNewCard', { deck, id: deck.title, })} />
                <Button text="Start Quiz" onPressHandler={() => this.props.navigation.navigate(
                    'Quiz', { deck, id: deck, })}/>
            </View>
        )
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
    num: {
        alignSelf: 'center',
        fontSize: 20,
        margin: 5,
    },
    
})

function mapStateToProps(state, props) {

    const decks = state;

    const { route, navigation } = props;

    const deckId = route.params.id
    const deck = decks[deckId]
    return {
        deck,
        navigation
    }
}
export default connect(mapStateToProps)(DeckView)