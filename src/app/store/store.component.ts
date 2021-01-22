import { Component, OnInit } from '@angular/core';
import { StoreService } from "../services/store.service";
import { Store } from '../modals/storeModal';

import { catchError, retryWhen, delayWhen, tap, take  } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  store: Store[];
  errMessage:string = null;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {

    this.storeService.getStore()
    .pipe(
      catchError(err  => {
        this.errMessage = "Something went wrong";
        // console.log('Handling...', this.errMessage);
        return throwError(err);
    }),
    retryWhen(err => {
      return err
              .pipe(
                  take(1),
                  delayWhen(() => timer(4000)),   // to handle error take one and make second retry after 4 secs
                  tap(() => {
                    this.errMessage = 'Retring to fetch again....' // return dynamic msg error
                  }),
                  delayWhen(() => timer(4000)),
                  tap(() => {
                    this.errMessage = 'Unfortunately, you can not complete this process, you can retry later'
                  }),
              );
   })
  )
    .subscribe(
      res => this.store = res,
      err =>  console.log('err', err)
    );

  }

}
