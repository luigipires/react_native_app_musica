import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';

/*******************************************/

import styles from '../css/StyleSheet';

export default function Player(props){

    async function pauseCurrentMusic(){
        if(props.audio != null){
            props.audio.pauseAsync();
        }

        props.setPlayMusic(false);
    }

    async function playCurrentMusic(){
        let currentFile = props.music[props.audioIndex].file;

        let copyMusic = props.music.map((val, index) => {
            if(props.audioIndex == index){
                val.playing = true;
        
                currentFile = val.file;
            }else{
                val.playing = false;
            }
        
            return val;
        });

        try{
            if(props.audio != null){
                props.setPlayMusic(true);
                props.setMusic(copyMusic);

                await props.audio.playAsync();
            }else{
                let currentAudio = new Audio.Sound();

                try{
                    await currentAudio.loadAsync(currentFile);
                    await currentAudio.playAsync();
                }catch(error){
                    console.log(error);
                }

                props.setAudio(currentAudio);
                props.setMusic(copyMusic);
                props.setPlayMusic(true);
            }
        }catch(error){
            console.log(error);
        }
    }

    async function prevMusic(){
        let newIndex = props.audioIndex - 1;

        if(newIndex < 0){
            newIndex = 0;
        }

        props.setAudioIndex(newIndex);

        let newFileMusic = props.music[props.audioIndex].file;
        let currentAudio = new Audio.Sound();

        let indexMusic = props.music.map((val, index) => {
            if(props.audioIndex == index){
                val.playing = true;
            }else{
                val.playing = false;
            }
        
            return val;
        });

        if(props.audio != null){
            props.audio.unloadAsync();
        }

        try{
            await currentAudio.loadAsync(newFileMusic);
            await currentAudio.playAsync();
        }catch(error){
           console.log(error);
        }

        props.setAudio(currentAudio);
        props.setMusic(indexMusic);
        props.setPlayMusic(true);
    }

    async function nextMusic(){
        let newIndex = props.audioIndex + 1;

        if(newIndex >= props.music.length){
            newIndex = props.music.length - 1;
        }

        props.setAudioIndex(newIndex);

        let newFileMusic = props.music[props.audioIndex].file;
        let currentAudio = new Audio.Sound();

        let indexMusic = props.music.map((val, index) => {
            if(props.audioIndex == index){
                val.playing = true;
            }else{
                val.playing = false;
            }
        
            return val;
        });

        if(props.audio != null){
            props.audio.unloadAsync();
        }

        try{
            await currentAudio.loadAsync(newFileMusic);
            await currentAudio.playAsync();
        }catch(error){
           console.log(error);
        }

        props.setAudio(currentAudio);
        props.setMusic(indexMusic);
        props.setPlayMusic(true);
    }

    return(
        <View style={styles.player}>
            {
                props.music.map((data) => {
                    if(data.playing == true){
                        return(
                            <View>
                                <Text style={{textAlign: 'center', fontSize: 21, fontWeight: 'bold'}}>{data.name}</Text>
                            </View>
                        );
                    }
                })
            }

            <View style={{paddingTop: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => prevMusic()}>
                    <AntDesign name="banckward" size={45} color="white" />
                </TouchableOpacity>

                {
                    (props.playMusic == true) ? 
                        <TouchableOpacity onPress={() => pauseCurrentMusic()} style={{paddingLeft: 20, paddingRight: 20}}>
                            <AntDesign name="pausecircle" size={80} color="white" />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={() => playCurrentMusic()} style={{paddingLeft: 20, paddingRight: 20}}>
                            <AntDesign name="play" size={80} color="white" />
                        </TouchableOpacity>
                }

                <TouchableOpacity onPress={() => nextMusic()}>
                    <AntDesign name="forward" size={45} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}