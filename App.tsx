import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MusicPlayer from './screens/MusicPlayer'
const App = () => {
  return (
    <View style={styles.constiner}>
      <MusicPlayer/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  constiner:{
    flex:1
  }
})