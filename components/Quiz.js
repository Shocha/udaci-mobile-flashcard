import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import Button from './Button'

class Quiz extends Component {

    state = {
        start: 0,
        showAnswer: false,
        score: 0
    }

    showCorrectAns = () => {
        this.setState(() =>
            ({ showAnswerArea: true }));
    };


    result = (answer) => {
        if (answer) {
            this.setState((current) => ({
                score: current.score + 1
            }))
        }
        this.setState((current) => ({
            start: current.start + 1,
            
        }))
    }

    onRestart = () => {
        this.setState(() => ({
            score: 0,
            start: 0,
            showAnswer: false
        }))
    }

    onGoBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { questions, cardQuant } = this.props
        const { start, score } = this.state

        if (cardQuant == 0) {
            return (
                <View>
                    <Text style={styles.title}>No Cards to display</Text>
                </View>
            )
        }

        if (cardQuant === start) {
            {
                clearLocalNotification().then(setLocalNotification())
            }
            return (<View>
                <Text style={styles.title}>Your Score is: {score}/{cardQuant}</Text>
                <Button onPressHandler={() => this.onRestart()} text='Restart Quiz' />

                <Button onPressHandler={() => this.onGoBack()} text='Back To Deck' />
            </View>)
        }
        return (<View>
            <Text style={styles.title}>Quiz Page</Text>
            <Text style={styles.nrmtxt}>{questions[start].question}</Text>

            {!this.state.showAnswerArea && (
                <View>
                    <Button
                        onPressHandler={() => this.showCorrectAns()} text='Show Answer' />
                </View>
            )}

            {this.state.showAnswerArea && (
                <View>

                    <Text style={styles.nrmtxt}>{questions[start].answer}</Text>

                    <Text style={styles.nrmtxt}>Did you get the answer?</Text>

                    <View >
                        <Button
                            onPressHandler={() => this.result(true)}
                            text='Correct' />
                    </View>

                    <View >
                        <Button text='Incorrect' onPressHandler={() => this.result(false)} />
                    </View>
                </View>
            )}
        </View>)
    }
}

function mapStateToProps(decks, { route, navigation }) {
    const deck = route.params.id
    const title = deck.title
    const questions = deck.questions
    const cardQuant = questions.length
    return {
        title,
        questions,
        cardQuant,
        navigation
    }
}
const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 30,
        margin: 5,
    },
    btntxt: {
        justifyContent: "center",
        alignSelf: 'center',
        margin: 5,
    },
    nrmtxt: {
        alignSelf: 'center',
        fontSize: 20,
        margin: 5,
        padding: 20
    }
})
export default connect(mapStateToProps)(Quiz)
