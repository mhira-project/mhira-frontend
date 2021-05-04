import { Injectable } from '@angular/core';
import { ApolloError, isApolloError } from 'apollo-client';
import { NzMessageService } from 'ng-zorro-antd';

type AnyError = ApolloError | Error;

export interface ErrorHandlerOptions {
  prefix?: string;
  forcePrefix?: boolean;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private messageService: NzMessageService) {}

  public handleError(error: AnyError, options: ErrorHandlerOptions = {}): void {
    // show error to user
    if (isApolloError(error)) {
      for (const e of error.graphQLErrors) {
        const msg = options.forcePrefix ? `${options.prefix} - ${e.message}` : e.message;
        this.messageService.error(msg, { nzDuration: options.duration ?? 5000 });
      }
    } else {
      this.messageService.error(`${options.prefix} - ${error}`, { nzDuration: options.duration ?? 3000 });
    }

    // log error to console
    console.error(error);
  }
}
