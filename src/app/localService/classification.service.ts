import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Classification} from '../model/Classification';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService extends GeneriCrudService<Classification> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'classification/all',
      router
    );
  }
}
