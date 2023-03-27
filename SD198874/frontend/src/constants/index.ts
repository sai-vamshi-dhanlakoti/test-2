import { NOTIFICATION_STATUS, ShowNotification } from '../interface';

export const DEFAULT_NOTIFICATION: ShowNotification = {
  show: false,
  title: '',
  message: '',
  status: NOTIFICATION_STATUS.INFO,
};
