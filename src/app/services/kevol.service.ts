import {CrudService} from './crud.service';
import {UseAccounts} from '../model/Accounts';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
@Injectable()
export class KevolService extends CrudService<UseAccounts> {
  constructor(httpClient: HttpClient , router: Router) {
    super(
      httpClient,
      'posts',
    router);
  }
  }
