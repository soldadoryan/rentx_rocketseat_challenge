import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Container } from './styles';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface Props extends BorderlessButtonProps {
  color?: string
}

const BackButton: React.FC<Props> = ({ color, ...rest }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => navigation.goBack();

  return (
    <Container {...rest} onPress={handleBack}>
      <MaterialIcons name="chevron-left" size={24} color={color ? color : theme.colors.text} />
    </Container>
  );
}

export default BackButton;