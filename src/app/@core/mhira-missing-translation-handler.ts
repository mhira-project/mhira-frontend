import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class MhiraMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    console.warn(
      `[Translations]: Missing translation for key "${params.key}" of language "${params.translateService.currentLang}"`
    );
    return params.key;
  }
}
