import { State, Action, StateContext, Store } from '@ngxs/store';
import * as LoansActions from './loans.actions';
import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface Loan {
  id: number;
  title: string;
  tranche: string;
  available: number;
  annualised_return: number;
  term_remaining: number;
  ltv: number;
  amount: number;
}

export interface LoansStateModel {
  loans: Loan[];
}

@State<LoansStateModel>({
  name: 'loansState',
  defaults: {
    loans: [
      {
        id: 1,
        title: 'Voluptate et sed tempora qui quisquam.',
        tranche: 'A',
        available: 11959,
        annualised_return: 8.60,
        term_remaining: 864000,
        ltv: 48.80,
        amount: 85754
      }, {
        id: 5,
        title: 'Consectetur ipsam qui magnam minus dolore ut fugit.',
        tranche: 'B',
        available: 31405,
        annualised_return: 7.10,
        term_remaining: 1620000,
        ltv: 48.80,
        amount: 85754
      }, {
        id: 12,
        title: 'Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.',
        tranche: 'C',
        available: 12359,
        annualised_return: 4.80,
        term_remaining: 879000,
        ltv: 48.80,
        amount: 85754
      }
    ]
  }
})

@Injectable()
export class LoansState {

  constructor(
    private store: Store
  ) {
  }

  // @Action(CatalogCRCsActions.SetEditableCRC)
  // setEditableCRC(ctx: StateContext<CatalogCRCsStateModel>, payload: CatalogCRCsActions.SetEditableCRC) {
  //   const state = ctx.getState();
  //   const crc = state.crcs.find(u => u.id === payload.id);
  //   ctx.patchState({
  //     editableCRCForm: {
  //       model: {
  //         ...crc,
  //       }
  //     }
  //   });
  // }

}
