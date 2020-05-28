import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoansState, LoansStateModel } from './state/loans.state';
import {Select, Store} from '@ngxs/store';
import * as LoansActions from './state/loans.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @Select( LoansState ) LoansState$: Observable<LoansStateModel>;
  investAmount: number;

  constructor(
    private store: Store
  ) {}

  setActiveLoan(id: number) {
    this.store.dispatch( new LoansActions.SetActiveLoan(id) );
  }

  invest() {
    this.store.dispatch( new LoansActions.MakeInvest( this.investAmount ) );
    this.investAmount = undefined;
  }

  closeModal() {
    this.investAmount = undefined;
    this.store.dispatch( new LoansActions.ClearActiveLoan() );
  }
}
