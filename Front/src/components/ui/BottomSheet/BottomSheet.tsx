import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import { SnapPoint } from '../../../types/bottomSheet';
import { Backdrop } from './Backdrop';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type Props = {
    isVisible: boolean;
    initialSnap?: SnapPoint;
    showBlur?: boolean;
    onClose: () => void;
    onSnapChange?: (snap: SnapPoint) => void;
    children: React.ReactNode;
};

export const BottomSheet = ({ isVisible, showBlur = true, onClose, onSnapChange, children }: Props) => {
    const { snapTo } = useSnapPoints(25);
    const [isExpanded, setIsExpanded] = useState(false);
    const insets = useSafeAreaInsets();
    const heightValue = useSharedValue(25);
    const startHeight = useSharedValue(25);

    useEffect(() => {
        if (isVisible) {
            heightValue.value = withSpring(25, { damping: 25, stiffness: 200 });
            setIsExpanded(false);
        }
    }, [isVisible]);

    const handleSnapChange = (snap: SnapPoint) => {
        heightValue.value = withSpring(snap, { damping: 25, stiffness: 200 });
        setIsExpanded(snap === 100);
        onSnapChange?.(snap);
    };

    const toggleExpand = () => handleSnapChange(isExpanded? (25 as SnapPoint) : (100 as SnapPoint));

    const panGesture = Gesture.Pan()
  .runOnJS(true)
  .activeOffsetY([-10, 10])
  .failOffsetX([-20, 20])
  .onStart(() => { startHeight.value = heightValue.value; })
  .onUpdate((e) => {
        let newPercent = startHeight.value + (-e.translationY / SCREEN_HEIGHT) * 100;
        if (newPercent < 25) newPercent = 25;
        if (newPercent > 100) newPercent = 100;
        heightValue.value = newPercent;
    })
  .onEnd((e) => {
        let finalPercent = startHeight.value + (-e.translationY / SCREEN_HEIGHT) * 100;
        if (e.velocityY < -800 && finalPercent > 60) handleSnapChange(100 as SnapPoint);
        else if (e.velocityY > 800 && finalPercent < 40) handleSnapChange(25 as SnapPoint);
        else handleSnapChange(snapTo(finalPercent));
    });

    const animatedStyle = useAnimatedStyle(() => {
        const height = (heightValue.value / 100) * SCREEN_HEIGHT;
        const top = isExpanded? insets.top + 10 : (SCREEN_HEIGHT - height) / 2;
        return { height, top };
    });

    if (!isVisible) return null;

    return (
        <>
            <Backdrop visible={isVisible} showBlur={showBlur} onPress={onClose} />
            <Animated.View style={[styles.container, animatedStyle]}>
                {/* GESTO SOLO EN EL HEADER, NO EN TODA LA TARJETA */}
                <GestureDetector gesture={panGesture}>
                    <View style={[styles.header, { paddingTop: isExpanded? insets.top + 4 : 14 }]}>
                        <View style={styles.titleRow}>
                            <View style={styles.bellCircle}>
                                <Ionicons name="notifications" size={18} color="#60C5CF" />
                            </View>
                            <Text style={styles.title}>Notificaciones</Text>
                        </View>
                        <View style={styles.actions}>
                            <Pressable style={styles.iconBtn} onPress={toggleExpand}>
                                <Ionicons name={isExpanded? "contract-outline" : "scan-outline"} size={18} color="#9CA3AF" />
                            </Pressable>
                            <Pressable style={styles.iconBtn} onPress={onClose}>
                                <Ionicons name="close" size={18} color="#9CA3AF" />
                            </Pressable>
                        </View>
                    </View>
                </GestureDetector>

                <View style={styles.divider} />
                {/* ESTO AHORA HACE SCROLL LIBRE */}
                <View style={styles.content}>{children}</View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    left: 14, 
    right: 14,
    backgroundColor: '#11131A', 
    borderRadius: 22, 
    borderWidth: 1.5, 
    borderColor: '#2EB3C3', 
    zIndex: 10, 
    overflow: 'hidden',
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingBottom: 12 
  },
  titleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  bellCircle: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#1A232E', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '800' 
  },
  actions: { 
    flexDirection: 'row', 
    gap: 8 
  },
  iconBtn: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#1E222E', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#1F2433', 
    marginHorizontal: 16 
  },
  content: { 
    flex: 1 
  },
});