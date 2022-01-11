import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(30, 30, 30)',
    },
    header: {
        backgroundColor: '#3fa15e',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    musics: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        alignSelf: 'center'
    },
    player: {
        position: 'absolute',
        backgroundColor: '#3fa15e',
        height: 200,
        bottom: 0,
        width: '100%',
        padding: 15
    }
});
