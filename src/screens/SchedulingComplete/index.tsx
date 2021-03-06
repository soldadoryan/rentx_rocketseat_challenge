import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Title, Message, Footer } from './styles';
import ConfirmButton from '../../components/ConfirmButton';

const SchedulingComplete: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={() => navigation.navigate('Home')} />
      </Footer>
    </Container>
  );
}

export default SchedulingComplete;