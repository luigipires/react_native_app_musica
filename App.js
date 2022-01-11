import { StatusBar } from 'expo-status-bar';
import { LogBox, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

/*******************************************/

import styles from './css/StyleSheet';

import ListMusics from './components/ListMusics';
import Player from './components/Player';

export default function App(){

  LogBox.ignoreAllLogs();

  const [audio, setAudio] = useState(null);
  const [audioIndex, setAudioIndex] = useState(0);
  const [playMusic, setPlayMusic] = useState(false);
  const [music, setMusic] = useState([
    {
      name: 'Drive',
      artist: 'Incubus',
      file: require('./musics/drive.mp3'),
      playing: false
    },
    {
      name: 'Faroeste Caboclo',
      artist: 'Legião Urbana',
      file: require('./musics/faroeste_caboclo.mp3'),
      playing: false
    },
    {
      name: 'Pais e Filhos',
      artist: 'Legião Urbana',
      file: require('./musics/pais_filhos.mp3'),
      playing: false
    },
  ]);

  useEffect(() => {

  });

  async function changeMusic(id){
    let copyMusic = music.map((val, index) => {
      if(index == id){
        val.playing = true;

        setPlayMusic(true);
        setAudioIndex(index);
      }else{
        val.playing = false;
      }

      return val;
    });

    setMusic(copyMusic);

    if(audio != null){
      audio.unloadAsync();
    }

    let currentMusic = new Audio.Sound();
    let fileMusic = null;

    try{
      music.map((val) => {
        if(val.playing == true){
          fileMusic = val.file;
        }
      });

      await currentMusic.loadAsync(fileMusic);
      await currentMusic.playAsync();
    }catch(error){
      console.log(error);
    }

    setAudio(currentMusic);
  }

  return(
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.header}>
        <Text style={{color: 'white', fontSize: 17}}>SimpleAsyncPlayer</Text>
      </View>
      
      <View style={{...styles.musics, borderBottomWidth: 7}}>
        <Text style={{color: 'rgb(225, 225, 225)', fontSize: 15, width: '50%'}}>Música</Text>
        <Text style={{color: 'rgb(225, 225, 225)', fontSize: 15, width: '50%'}}>Artista</Text>
      </View>

      <ListMusics music={music} changeMusic={changeMusic} />

      <Player 
        music={music} 
        playMusic={playMusic} 
        setPlayMusic={setPlayMusic}
        setMusic={setMusic}
        audio={audio}
        setAudio={setAudio}
        audioIndex={audioIndex}
        setAudioIndex={setAudioIndex}
      />
    </View>
  );
}
