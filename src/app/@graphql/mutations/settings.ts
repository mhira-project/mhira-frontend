import gql from 'graphql-tag';

const updateSettings = gql`
  mutation($input: UpdateSettingInput!) {
    updateSettings(input: $input)
  }
`;

export const SettingsMutations = {
  updateSettings,
};
