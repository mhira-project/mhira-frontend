import { Form } from '../../../@shared/components/form/@types/form';

export const ScriptForm: Form = {
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Script Name',
          label: 'Script Name',
          translationPath: 'forms.scripts.name',
          description: 'Enter script Name',
          type: 'text',
          validationMessage: 'please enter script Name',
          isRequired: true,
          span: 24,
        },
        {
          value: undefined,
          name: 'scriptText',
          title: 'XSL Form',
          translationPath: 'forms.scripts.excelFile',
          description: 'XLS Form',
          type: 'file',
          span: 24,
          isRequired: true,
        },
        {
          value: '',
          name: 'version',
          title: 'Version',
          label: 'Version',
          translationPath: 'forms.scripts.version',
          description: 'Enter script Version',
          type: 'text',
          validationMessage: 'please enter script version',
          isRequired: false,
          span: 24,
        },
        {
          value: '',
          name: 'creator',
          title: 'Creator',
          label: 'Creator',
          translationPath: 'forms.scripts.creator',
          description: 'Enter script Creator',
          type: 'text',
          validationMessage: 'please enter script creator',
          isRequired: false,
          span: 24,
        },
        {
          value: '',
          name: 'repositoryLink',
          title: 'Repository Link',
          label: 'Repository Link',
          translationPath: 'forms.scripts.repositoryLink',
          description: 'Enter script Repository Link',
          type: 'text',
          validationMessage: 'please enter script Repository Link',
          isRequired: false,
          span: 24,
        },
      ],
    },
  ],
};

export const UpdateScriptForm: Form = {
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Script Name',
          label: 'Script Name',
          translationPath: 'forms.scripts.name',
          description: 'Enter script Name',
          type: 'text',
          validationMessage: 'please enter script Name',
          isRequired: true,
          span: 24,
        },
        {
          value: '',
          name: 'version',
          title: 'Version',
          label: 'Version',
          translationPath: 'forms.scripts.version',
          description: 'Enter script Version',
          type: 'text',
          validationMessage: 'please enter script version',
          isRequired: false,
          span: 24,
        },
        {
          value: '',
          name: 'creator',
          title: 'Creator',
          label: 'Creator',
          translationPath: 'forms.scripts.creator',
          description: 'Enter script Creator',
          type: 'text',
          validationMessage: 'please enter script creator',
          isRequired: false,
          span: 24,
        },
        {
          value: '',
          name: 'repositoryLink',
          title: 'Repository Link',
          label: 'Repository Link',
          translationPath: 'forms.scripts.repositoryLink',
          description: 'Enter script Repository Link',
          type: 'text',
          validationMessage: 'please enter script Repository Link',
          isRequired: false,
          span: 24,
        },
      ],
    },
  ],
};
