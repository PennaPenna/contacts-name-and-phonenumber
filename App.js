import React, { useState } from 'react';
import {  StyleSheet, Text, View, Button, StatusBar, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
//import * as SMS  from 'expo-sms';


export default function App() {
  const[contacts, setContacts] = useState([]);
  const[numbers, setNumbers] = useState([]);
  //const[list, setList] = useState([]);

  // Ask permission to use contacts ans get phonenumbers
  const getContacts = async() => {
    const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields:[Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    }
    const listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#CED0CE",
            margin: 10
          }}
        />
      );
    };

   return (
    <View  style={styles.container}>
 
 <Button title="GET CONTACTS" onPress={getContacts}/>
 <FlatList 
        style={{marginLeft: "5%"}}
        data={contacts}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={listSeparator}
        renderItem={({ item }) => 
          <View 
              style={styles.listcontainer}>
                <Text>{item.name}, {item.phoneNumbers ? item.phoneNumbers[0].number : ''}</Text>
                </View>}
        />
     <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop:80,
  backgroundColor:'#F5F5F5',
 },
 listcontainer: { 
  flexDirection:'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:5,
},
});
