import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

/*******************************************/

import styles from '../css/StyleSheet';

export default function ListMusics(props){
    return(
        <ScrollView>
            {
                props.music.map((data, index) => {
                    if(data.playing == true){
                        return(
                            <TouchableOpacity style={styles.musics}>
                                <Text style={{color: '#3fa15e', fontSize: 15, width: '50%'}}>{data.name}</Text>
                                <Text style={{color: '#3fa15e', fontSize: 15, width: '45%'}}>{data.artist}</Text>
                            </TouchableOpacity>
                        );
                    }else{
                        return(
                            <TouchableOpacity onPress={() => props.changeMusic(index)} style={styles.musics}>
                                <Text style={{color: 'rgb(225, 225, 225)', fontSize: 15, width: '50%'}}>{data.name}</Text>
                                <Text style={{color: 'rgb(225, 225, 225)', fontSize: 15, width: '45%'}}>{data.artist}</Text>
                                <AntDesign name="play" size={24} color="white" />
                            </TouchableOpacity>
                        );
                    }
                })
            }
        </ScrollView>
    );
}