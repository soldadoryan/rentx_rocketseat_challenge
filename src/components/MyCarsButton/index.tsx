import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);


const MyCarsButton: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => { ctx.positionX = positionX.value; ctx.positionY = positionY.value; },
    onActive: (event, ctx) => { positionX.value = ctx.positionX + event.translationX; positionY.value = ctx.positionY + event.translationY; },
    onEnd: () => { positionX.value = withSpring(0); positionY.value = withSpring(0); }
  })

  const handleClick = () => {
    navigation.navigate('MyCars' as never);
  }

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[myCarsButtonStyle, { position: 'absolute', bottom: 13, right: 22 }]}>
        <ButtonAnimated style={[styles.button, { backgroundColor: theme.colors.main }]} onPress={handleClick}>
          <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
        </ButtonAnimated>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MyCarsButton;