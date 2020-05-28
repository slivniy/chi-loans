enum LoansActionsTypes {
  SET_ACTIVE_LOAN = '[LOANS] Set active loan',
}

export class SetActiveLoan {
  static readonly type = LoansActionsTypes.SET_ACTIVE_LOAN;
  constructor(public id: number) { }
}
