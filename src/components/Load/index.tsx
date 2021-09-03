import React from 'react';
import AnimatedLoad from '../AnimatedLoad';
import { useTheme } from 'styled-components';

const Load: React.FC = () => {
  const theme = useTheme();

  return (
    <AnimatedLoad />
  );
}

export default Load;