import { Pipe, PipeTransform } from '@angular/core';
import { getName } from 'i18n-iso-countries';

@Pipe({
  name: 'country',
})
export class CountryPipe implements PipeTransform {
  transform(countryCode: string): string {
    return getName(countryCode, 'en');
  }
}
