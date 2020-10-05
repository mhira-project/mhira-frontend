export interface Question {
  id: number;
  type: string;
  text: string;
  help: string;
  isOptional: boolean;
  isPersonalInformation: boolean;
  validationRules: {
    minimum?: number;
    maximum?: number;
    precision?: string;
    regex?: string;
  };
  validationMessages: {
    minimum?: string;
    maximum?: string;
    precision?: string;
    regex?: string;
  };
  displayProperties: {
    width?: number;
    height?: number;
    representation?: string;
  };
  createdAt: string;
  updatedAt: string;
}
