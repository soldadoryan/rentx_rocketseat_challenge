import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.header};
  width: 100%;
  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary600};
  font-size: ${RFValue(30)}px;
  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary400};
  font-size: ${RFValue(15)}px;
  margin-top: 24px;
`;

export const Content = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  width: 100%;
  padding: 12px;
  margin-top: -10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;

export const CarFooterTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(13)}px;
`;




