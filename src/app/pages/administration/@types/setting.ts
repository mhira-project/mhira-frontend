export interface Setting {
  systemLocale: string;
  systemTimezone: string;
  dateFormat: string;
  timeFormat: string;
  dateTimeFormat: string;
  maxLoginAttempts: number;
  passwordLifeTimeInDays: number;
  passwordReUseCutoffInDays: number;
}
