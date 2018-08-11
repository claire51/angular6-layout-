import {CrudService} from './crud.service';
import {UseAccounts} from '../model/Accounts';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
@Injectable()
export class KevolService extends CrudService<UseAccounts> {
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'https://jsonplaceholder.typicode.com',
      'posts');
  }
  }
