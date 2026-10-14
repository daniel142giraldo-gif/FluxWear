import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  showBlur: boolean;
  onPress: () => void;
  opacity?: number;
};

export const Backdrop = ({ visible, showBlur, onPress, opacity = 0.6 }: Props) =>{
    if (!visible) return null;

    return (
        <Pressable
            style={[styles.container, { opacity }]}
            onPress={onPress}
        >
            {showBlur ? (
                <BlurView
                    intensity={40}
                    tint="dark"
                    style={styles.blur}
                />
            ) : null}
        </Pressable>
    );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 1
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});