import { StyleSheet, View, TextInput, SafeAreaView, ScrollView, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';
import { query, onSnapshot, orderBy } from 'firebase/firestore';
import { firestore, collection, addDoc, serverTimestamp, MESSAGES }  from './firebase/Config';

export default function App() {
  const [Messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    setNewMessage('')
    console.log('Message saved.')
  }

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES),orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages =[]

      querySnapshot.forEach((doc) => {

        const messageObject = {
          id:doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}> 
      <ScrollView>
        {Messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style = {StyleSheet.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView> 
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Send message...<3' 
          value={newMessage} 
          onChangeText={text => setNewMessage(text)}
        />
        <Button 
          title="Send" 
          type="button" 
          onPress={save} 
        />
      </View>
    </SafeAreaView>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc0cb',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
  },
  message: {
    alignContent: 'left',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#db7093',
    borderColor:'#ffb6c1',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo: {
    fontSize: 12
  }
});