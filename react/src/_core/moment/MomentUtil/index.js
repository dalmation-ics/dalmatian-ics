// @flow
import {
  TODAY,
  YESTERDAY,
  DAYS_AGO,
  WEEK_AGO,
  WEEKS_AGO,
} from '../../res/strings';
import moment from 'moment';

export function getEnglishTimeSince(date: any) {

  const start = moment(date);
  const ref = moment();

  const diff = start.diff(ref, 'days');
  if (diff === 0)
    return TODAY;
  else if (diff === -1)
    return YESTERDAY;
  else if (diff < -1 && diff > -7)
    return `${Math.abs(diff)} ${DAYS_AGO}`;
  else if (diff <= -7) {
    const weekDiff = start.diff(ref, 'week');
    return `${Math.abs(weekDiff)} ${weekDiff === -1 ?
        WEEK_AGO :
        WEEKS_AGO}`;
  }

}
