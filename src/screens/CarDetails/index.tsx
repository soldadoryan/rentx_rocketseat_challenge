import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Acessory from '../../components/Acessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import {
  Container, Header, CarImages, Details, Description, Brand, Name, Rent, Period, Price, About, Accessories, Footer
} from './styles';
import Button from '../../components/Button';
import CarDTO from '../../dtos/CarDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

interface Params {
  car: CarDTO
}

const CarDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP)
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    }
  })

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Animated.View style={[headerStyleAnimation, styles.header, { backgroundColor: theme.colors.background_secondary }]}>
        <Header>
          <BackButton onPress={() => { }} />
        </Header>
        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 160,
      }} showsVerticalScrollIndicator={false} onScroll={scrollHandler} scrollEventThrottle={16}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map(accessory => <Acessory name={accessory.name} key={accessory.type} icon={getAccessoryIcon(accessory.type)} />)}
        </Accessories>

        <About>
          {car.about}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus, orci ac condimentum porta, quam turpis dignissim lorem, quis auctor justo est non lectus.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus, orci ac condimentum porta, quam turpis dignissim lorem, quis auctor justo est non lectus.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus, orci ac condimentum porta, quam turpis dignissim lorem, quis auctor justo est non lectus.
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Confirmar" onPress={() => navigation.navigate('Scheduling' as never, { car } as never)} />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
})

export default CarDetails;