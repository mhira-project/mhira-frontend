import { pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TypescriptTranslationLoader extends TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../../translations/${lang}.ts`)).pipe(pluck('default'));
  }
}
