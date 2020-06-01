import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addNewCard } from '../utils/api'
import { addCard } from '../actions'
import { orange } from '../utils/colors'


class AddNewCard extends Component {
    state = {
        questionCard: '',
        answerCard: ''
    }
    submitCard = () => {
        const title = this.props.deckId
        const { dispatch, navigation } = this.props
        const {questionCard,answerCard}=this.state
        
        const card = {
            question:questionCard,
            answer:answerCard
        }

        addNewCard(title, card).then(() => {
            dispatch(addCard(title, card))
        })
        navigation.goBack()
    }
    render() {
        const { questionCard, answerCard } = this.state
        return (<View >
            <Text style={styles.title}>Add a Question Card!</Text>
            <TextInput onChangeText={(data)=>this.setState( {questionCard: data})} placeholder='Enter the Question here' style={styles.input} value={this.state.questionCard} />
            <TextInput onChangeText={(data)=>this.setState( {answerCard: data})} placeholder='Enter the Answer here' style={styles.input} value={this.state.answerCard} />
            <TouchableOpacity onPress={this.submitCard} disabled={questionCard == '' || answerCard == ''} style={styles.btn} >
                <Text style={styles.btntxt}>Submit</Text>
            </TouchableOpacity>
        </View>

        )
    }
}
const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 30,
        margin: 5,
    },
    input: {
        margin: 20,
        height: 50,
        padding: 10,
        borderColor: '#7a42f4',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff'
    }, btn: {
        marginTop: 35,
        marginLeft: 100,
        backgroundColor: orange,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        width: 200,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btntxt: {
        justifyContent: "center"
    }
})


function mapStateToProps(state, { navigation, route }) { //navigation and route are component props
    const deckId = route.params.id
    return {
        deckId,
        navigation
    }
}
export default connect(mapStateToProps)(AddNewCard)
