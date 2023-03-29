import { Patient } from '../@types/patient';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';

export class PatientModel {
  public static fromJson(json: FormattedPatient): FormattedPatient {
    const name = [json.firstName, json.middleName, json.lastName].filter((s) => !!s).join(' ');
    json.patientTitle = [json.medicalRecordNo, name].filter((s) => !!s).join(' - ');

    json.formattedStatus = {
      color: json.status ? 'green' : 'orange',
      title: json?.status?.name ?? 'not set',
    };

    json.formattedInformants = json?.informants?.map((informant) =>
      [informant?.firstName?.charAt(0), informant?.middleName?.charAt(0), informant?.lastName?.charAt(0)]
        .filter((s) => !!s)
        .join('')
    );

    json.formattedCaseManagers = json?.caseManagers?.map((cm) =>
      [cm?.firstName?.charAt(0), cm?.middleName?.charAt(0), cm?.lastName?.charAt(0)].filter((s) => !!s).join('')
    );

    return json;
  }

  public static updateData(json: any): Patient {
    const excludedProperties = [
      'caseManagers',
      'informants',
      'updatedAt',
      'createdAt',
      'status',
      'emergencyContacts',
      'formattedCaseManagers',
      'formattedCreatedAt',
      'formattedUpdatedAt',
      'formattedBirthDate',
      'formattedStatus',
      'formattedInformants',
      'patientTitle',
      '__typename',
    ];
    const patient: any = {};
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        if (!excludedProperties.includes(key)) {
          patient[key] = json[key];
        }
      }
    }
    return patient;
  }

  public static toJson(value: Patient): string {
    return JSON.stringify(value);
  }
}
