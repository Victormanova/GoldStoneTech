import { View, Text } from 'react-native'
import React from 'react'
import Background from './Background'
import Btn from './Btn'
import { darkGreen, green } from './Constants';

const Home = (props) => {
  return (
    <View>
       <Background>
       <View style={{ marginHorizontal: 25, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>Gold Stone</Text>
      <Text style={{ color: 'white', fontSize: 58, marginBottom: 40 }}>Technologies</Text>
      <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
       </Background>
    </View>
  )
}

export default Home