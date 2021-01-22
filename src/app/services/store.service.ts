import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Store } from '../modals/storeModal';
import { Observable, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

private ROOT_URL = 'https://api.mocki.io/v1/846f3611';

  constructor(private http: HttpClient) { }


  getStore(): Observable<Store[]> {
    return this.http.get<Store[]>(this.ROOT_URL).pipe(share());
  }
}
