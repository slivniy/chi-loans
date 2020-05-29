import { State, Action, StateContext, Store } from '@ngxs/store';
import * as LoansActions from './loans.actions';
import { Injectable } from '@angular/core';

export const LoansInitial = [
  {
    id: 1,
    title: 'Voluptate et sed tempora qui quisquam.',
    tranche: 'A',
    available: 11959,
    annualised_return: 8.60,
    term_remaining: 864000,
    ltv: 48.80,
    amount: 85754,
    invested: false
  }, {
    id: 5,
    title: 'Consectetur ipsam qui magnam minus dolore ut fugit.',
    tranche: 'B',
    available: 31405,
    annualised_return: 7.10,
    term_remaining: 1620000,
    ltv: 48.80,
    amount: 85754,
    invested: false
  }, {
    id: 12,
    title: 'Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.',
    tranche: 'C',
    available: 12359,
    annualised_return: 4.80,
    term_remaining: 879000,
    ltv: 48.80,
    amount: 85754,
    invested: false
  }
];

export interface Loan {
  id: number;
  title: string;
  tranche: string;
  available: number;
  annualised_return: number;
  term_remaining: number;
  ltv: number;
  amount: number;
  invested: boolean;
}

export interface LoansStateModel {
  loans: Loan[];
  activeLoan: Loan;
  totalAmount: number;
}

@State<LoansStateModel>({
  name: 'loansState',
  defaults: {
    loans: LoansInitial,
    activeLoan: undefined,
    totalAmount: LoansInitial.reduce( (acc, val) => acc + val.available, 0 )
  }
})

@Injectable()
export class LoansState {

  constructor(
    private store: Store
  ) {}

  @Action(LoansActions.SetActiveLoan)
  setEditableCRC(ctx: StateContext<LoansStateModel>, { id }: LoansActions.SetActiveLoan) {
    const state = ctx.getState();
    const loan = state.loans.find(u => u.id === id);
    ctx.patchState({
      activeLoan: { ...loan }
    });
  }

  @Action(LoansActions.ClearActiveLoan)
  clearActiveLoan(ctx: StateContext<LoansStateModel>) {
    ctx.patchState({
      activeLoan: undefined
    });
  }

  @Action(LoansActions.MakeInvest)
  makeInvest(ctx: StateContext<LoansStateModel>, { amount }: LoansActions.MakeInvest) {
    const state = ctx.getState();
    const updatedLoans = state.loans.map( loan => {
      return {
        ...loan,
        available: loan.id === state.activeLoan.id ? (loan.available - amount) : loan.available,
        invested: loan.id === state.activeLoan.id ? true : loan.invested
      };
    });
    ctx.patchState({
      activeLoan: undefined,
      loans: updatedLoans,
      totalAmount: updatedLoans.reduce( (acc, val) => acc + val.available, 0 )
    });
  }

}
