import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import {
  Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer
} from './styles';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg'
import Calendar, { DayProps, MarkedDatesProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import generateInterval from '../../components/Calendar/generateInterval';
import { format } from 'date-fns/esm';
import getPlatformDate from '../../utils/getPlatformDate';
import CarDTO from '../../dtos/CarDTO';

interface RentalPeriod {
  startFormatted: string,
  endFormatted: string
}

interface Params {
  car: CarDTO
}

const Scheduling: React.FC = () => {
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  const handleChangeDay = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const intervalKeys = Object.keys(interval);
    const firstDate = intervalKeys[0];
    const lastDate = intervalKeys[intervalKeys.length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy')
    })
  }

  const handleConfirmRental = () => {
    navigation.navigate('SchedulingDetails' as never, {
      car,
      dates: Object.keys(markedDates)
    } as never);
  }

  return (
    <Container>
      <Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton color={theme.colors.shape} />
        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDay} />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} enabled={!!rentalPeriod.startFormatted} />
      </Footer>
    </Container>
  );
}

export default Scheduling;