import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import Car from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import CarDTO from '../../dtos/CarDTO';
import Load from '../../components/Load';
import MyCarsButton from '../../components/MyCarsButton';


const Home: React.FC = () => {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => { return true; });
    }
  }, [])

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = (await api.get('/cars')).data;
        setCars(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (<TotalCars>Total {cars.length} carros</TotalCars>)}
        </HeaderContent>
      </Header>
      {loading ? <Load /> : (
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Car data={item} onPress={() => navigation.navigate('CarDetails' as never, { car: item } as never)} />}
        />
      )}
      <MyCarsButton />
    </Container>
  );
}

export default Home;