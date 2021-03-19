import gql from 'graphql-tag';

const settings = gql`
  query {
    settings {
      systemLocale
      systemTimezone
      dateFormat
      timeFormat
      dateTimeFormat
      maxLoginAttempts
    }
  }
`;

export const SettingsQueries = {
  settings,
};
