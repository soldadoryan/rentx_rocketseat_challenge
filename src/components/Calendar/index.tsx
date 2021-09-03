import React from 'react';
import { Calendar as CustomCalendar, LocaleConfig, DateCallbackHandler } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export interface MarkedDatesProps {
  [date: string]: {
    color: string,
    textColor: string,
    disabled?: boolean,
    disableTouchEvent?: boolean
  }
}

interface CalendarProps {
  markedDates: MarkedDatesProps,
  onDayPress: DateCallbackHandler,
}

export interface DayProps {
  dateString: string,
  day: number,
  month: number,
  year: number,
  timestamp: number,
}

const Calendar: React.FC<CalendarProps> = ({ markedDates, onDayPress }) => {
  const theme = useTheme();

  return (
    <CustomCalendar renderArrow={(direction) => <Feather
      size={24}
      color={theme.colors.text}
      name={direction === 'left' ? 'chevron-left' : 'chevron-right'} />}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        textMonthFontFamily: theme.fonts.secondary600,
        textDayFontFamily: theme.fonts.primary400,
        textDayHeaderFontFamily: theme.fonts.primary500,
        textDayHeaderFontSize: 10,
        todayTextColor: theme.colors.main,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export default Calendar;