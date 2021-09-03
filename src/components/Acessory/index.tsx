import React from 'react';
import { SvgProps } from 'react-native-svg';
import { Container, Name } from './styles';


interface Props {
  name: string,
  icon: React.FC<SvgProps>
}

const Acessory: React.FC<Props> = ({ name, icon: Icon }) => {
  return (
    <Container>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Container>
  );
}

export default Acessory;