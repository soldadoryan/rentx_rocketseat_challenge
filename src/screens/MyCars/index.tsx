import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import CarDTO from '../../dtos/CarDTO';
import api from '../../services/api';
import BackButton from '../../components/BackButton';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { useTheme } from 'styled-components';
import Car from '../../components/Car';
import { AntDesign } from '@expo/vector-icons';
import Load from '../../components/Load';

interface CarProps {
  id: string,
  user_id: string,
  car: CarDTO,
  startDate: string,
  endDate: string,
}

const MyCars: React.FC = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = (await api.get(`schedules_byuser?user_id=${1}`)).data;
        setCars(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton color={theme.colors.shape} />
        <Title>
          Seus agendamentos{'\n'}
          estão aqui
        </Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {loading ? <Load /> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign name="arrowright" size={20} color={theme.colors.title} style={{ marginHorizontal: 10 }} />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}

export default MyCars;