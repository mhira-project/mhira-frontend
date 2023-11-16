import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';

export const QuestionnaireBundlesColumns: TableColumn<any>[] = [
  {
    title: 'Name',
    name: 'name',
    translationPath: 'emailTemplates.name',
    filterField: {
      type: 'text',
      value: '',
    },
  },
  {
    title: 'Questionnaires',
    name: 'questionnaires',
    render: 'questionaireBundle',
    translationPath: 'menu.questionnaires',
    filterField: {
      type: 'text',
      value: '',
    },
  },
];
