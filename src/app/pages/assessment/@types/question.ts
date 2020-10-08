export interface Question {
  id: number;
  type: string;
  text: string;
  help: string;
  isOptional: boolean;
  isPersonalInformation: boolean;
  options: any[];
  value: number | string | number[] | string[];
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
    rows?: number;
    width?: number;
    height?: number;
    representation?: string;
  };
  createdAt: string;
  updatedAt: string;
}
