import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FeeAllocation} from '../model/FeeAllocation';

@Injectable({
  providedIn: 'root'
})
export class FeeallocationService extends GeneriCrudService<FeeAllocation> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'feeAllocation/all',
      router
    );
  }
}
