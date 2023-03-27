export enum NOTIFICATION_STATUS {
  INFO = 'info',
  SUCCESS = 'success',
  DANGER = 'danger',
}

export interface ShowNotification {
  show: boolean;
  title: string;
  message: string;
  status: NOTIFICATION_STATUS;
}
