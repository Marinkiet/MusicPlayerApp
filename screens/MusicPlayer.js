import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,FlatList, Animated } from 'react-native'
import React, { Component, useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Slider from '@react-native-community/slider';
import songs from '../modal/Data';

const { width, height } = Dimensions.get('window')
const MusicPlayer = ()=> {
  const [songIndex,setSongIndex]=useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    scrollX.addListener(({value})=>{
      // console.log(`Scrollx: ${value} | Device width: ${width}` );
      const index = Math.round(value/width) //get the index of each item in list
      setSongIndex(index)
      // console.log('Index :' +index)
    })
  },[])

    //create song comp to render list of songs
   const renderSongs = ({item,index})=>{
      return(
       <View style={styles.mainImageWrapper}>
         <View style={[styles.imageWrapper, styles.elevation]}>
        <Image source={item.artwork}
          style={styles.musicIMage} />
      </View>
       </View>
      )
   }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainConatainer}>
          {/* Image */}
          <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' ,paddingTop:25}}>
            <TouchableOpacity><Feather name='chevron-left' color="white" size={30}></Feather></TouchableOpacity>
            <TouchableOpacity><Feather name='menu' color="white" size={25}></Feather></TouchableOpacity>
          </Animated.View>
         
          <Animated.FlatList
          renderItem={renderSongs}
          data={songs}
          keyExtractor={item=>item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent:{
                contentOffset:{x:scrollX}
              }
            }
          ],
          {useNativeDriver:true}
          
          )}/>
          {/* song details Controls */}

          <View style={styles.songContentContainer}>
            <Text style={[styles.songTitle, styles.songContent]}>{songs[songIndex].title}</Text>
            <Text style={[styles.songArtist, styles.songContent]}>{songs[songIndex].artist}</Text>
          </View>
          {/* Slider */}
          <View>
            <Slider
              style={styles.progress}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor='orange'
              minimumTrackTintColor="orange"
              maximumTrackTintColor="white"
              onSlidingComplete={() => { }}
            />
            {/* progress duration */}
            <View style={styles.progressLevelDuration}>
              <Text style={styles.progressLevelText}>
                00:00
              </Text>
              <Text style={styles.progressLevelText}>
                00:00
              </Text>
            </View>
          </View>
          {/* Songs Controls */}

          <View style={styles.musicControlsContainer}>
            <TouchableOpacity onPress={() => { }}><Feather name='skip-back' color="white" size={30}></Feather></TouchableOpacity>
            <TouchableOpacity onPress={() => { }}><Feather name='play' color="white" size={50}></Feather></TouchableOpacity>
            <TouchableOpacity onPress={() => { }}><Feather name='skip-forward' color="white" size={30}></Feather></TouchableOpacity>
          </View>

        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomIconWrapper}>
            <TouchableOpacity onPress={() => { }}>
              <View>
                <AntDesign name="hearto" size={30} color="#888888" ></AntDesign>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <View>
                <Feather name="repeat" size={30} color="#888888" ></Feather>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <View>
                <Feather name="share-2" size={30} color="#888888" ></Feather>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <View>
                <Feather name="more-horizontal" size={30} color="#888888" ></Feather>
              </View>
            </TouchableOpacity>
          </View>

        </View>

      </SafeAreaView>
    )
  }

export default MusicPlayer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",

  },
  mainConatainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:'lightblue'
  },
  mainImageWrapper:{
    width:width,
    justifyContent:'center',
    alignItems:'center'
  },
  imageWrapper: {
    width: 300,
    height:'100%',
    // backgroundColor:'orange',
    alignItems:'center',
    justifyContent:'center'
  },
  musicIMage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5
    },

    shadowOpacity: 0.5,
    shadowRadius: 3.80
  },
  songContent: {
    color: '#EEEEEE',
    textAlign: 'center',
    // backgroundColor:'blue',
    
  },
  songTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
  songArtist: {
    fontWeight: '300',
    fontSize: 16
  },
  progress: {
    width: 300,
    height: 10,
    marginTop: 20,
    flexDirection: 'row'
  },
  progressLevelDuration: {
    flexDirection: 'row',
    width: 300,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  progressLevelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },
  musicControlsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 30
  },
  bottomContainer: {
    width: width,
    alignItems: "center",
    paddingVertical: 15,
    borderTopColor: "#888888",
    borderWidth: 1,
    borderBottomWidth: 0
  },
  bottomIconWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%' //of the parent = bottomContainer
  }
})