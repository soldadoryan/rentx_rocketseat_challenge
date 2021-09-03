import React, { useEffect, useState } from 'react';
import Acessory from '../../components/Acessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Button from '../../components/Button';

import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import getPlatformDate from '../../utils/getPlatformDate';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';
import CarDTO from '../../dtos/CarDTO';
import { MarkedDatesProps } from '../../components/Calendar';
import { format } from 'date-fns';
import api from '../../services/api';

interface Params {
  car: CarDTO,
  dates: string[]
}

interface RentalPeriod {
  start: string,
  end: string
}

const SchedulingDetails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [dates]);

  const handleConfirmRental = async () => {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post('/schedules_byuser', {
      car,
      user_id: 1,
      startDate: rentalPeriod.start,
      endDate: rentalPeriod.end,
    });

    await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    });

    navigation.navigate('SchedulingComplete' as never);
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => { }} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      <Content>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {car.rent.price * dates.length}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmRental} enabled={!loading} loading={loading} />
      </Footer>
    </Container>
  );
}

export default SchedulingDetails;