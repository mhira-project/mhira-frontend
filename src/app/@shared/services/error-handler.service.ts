import { Injectable } from '@angular/core';
import { ApolloError, isApolloError } from 'apollo-client';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SkipLogicError } from '../../assessment-form/skip-logic';

type AnyError = ApolloError | SkipLogicError | Error;

export interface ErrorHandlerOptions {
  prefix?: string;
  forcePrefix?: boolean;
  duration?: number;
}

const isSkipLogicError = (error: AnyError): error is SkipLogicError => !!(error as SkipLogicError).isSkipLogicError;

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private messageService: NzMessageService) {}

  public handleError(error: AnyError, options: ErrorHandlerOptions = {}): void {
    if (isApolloError(error)) {
      // show error directly if it has no graphQL Errors
      if (!error?.graphQLErrors?.length) {
        const msg = options.prefix && options.forcePrefix ? `${options.prefix} - ${error.message}` : error.message;
        this.dispatchError(msg, error, options, 5000);
      }

      // show graphQL Errors
      for (const e of error.graphQLErrors) {
        const msg = options.prefix && options.forcePrefix ? `${options.prefix} - ${e.message}` : e.message;
        this.dispatchError(msg, e, options, 5000);
      }
    } else if (isSkipLogicError(error)) {
      const msg = options.prefix && options.forcePrefix ? `${options.prefix} - ${error.message}` : error.message;
      this.dispatchError(msg, error, options, 5000);
    } else {
      const msg = options.prefix ? `${options.prefix} - ${error}` : error.toString();
      this.dispatchError(msg, error, options);
    }
  }

  private dispatchError(msg: string, error: AnyError, options: ErrorHandlerOptions, duration: number = 3000): void {
    // show error to user
    this.messageService.error(msg, { nzDuration: options.duration ?? duration });

    // log error to console
    console.error(error);
  }
}
