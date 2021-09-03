import React from 'react';
import LottieView from 'lottie-react-native';
import { Container } from './styles';
import LoadCar from '../../assets/load.json';

const AnimatedLoad: React.FC = () => {
  return (
    <Container>
      <LottieView source={LoadCar as never} autoPlay style={{ height: 100 }} resizeMode="contain" loop />
    </Container>
  );
}

export default AnimatedLoad;