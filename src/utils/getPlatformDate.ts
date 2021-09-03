import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export default (date: Date) => Platform.OS === 'ios' ? addDays(date, 1) : date;
