import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NestJsQueriesService } from '../../../@shared/services/nestjs-queries.service';

@Injectable({
  providedIn: 'root',
})
export class ScriptsService {
  constructor(private apollo: Apollo, private nestJsQueriesService: NestJsQueriesService) {}
}
