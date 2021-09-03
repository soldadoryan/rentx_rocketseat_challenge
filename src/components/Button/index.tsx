import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string,
  color?: string,
  enabled?: boolean,
  loading?: boolean,
}

const Button: React.FC<Props> = ({ title, color, enabled = true, loading = false, ...rest }) => {
  const theme = useTheme();

  return (
    <Container {...rest}
      enabled={enabled}
      color={color ? color : theme.colors.main}
      style={{ opacity: enabled === false || loading === true ? .5 : 1 }}>
      {loading ? <ActivityIndicator color={theme.colors.shape} /> : <Title>{title}</Title>}

    </Container>
  );
}

export default Button;