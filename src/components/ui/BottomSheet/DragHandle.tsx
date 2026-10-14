import { StyleSheet, View } from 'react-native';

type Props = {
    onPress?: () => void;
};

export const DragHandle = ({ onPress }: Props) => {

    
    return (
        <View style={styles.container}>
            <View style={styles.bar} />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        height: 24, 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 8
    },
    bar: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#3A3F4B',
        opacity: 0.8
    }
})
