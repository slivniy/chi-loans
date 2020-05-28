enum LoansActionsTypes {
  SET_ACTIVE_LOAN = '[LOANS] Set active loan',
  CLEAR_ACTIVE_LOAN = '[LOANS] Clear active loan',
  MAKE_INVEST = '[LOANS] Make invest',
}

export class SetActiveLoan {
  static readonly type = LoansActionsTypes.SET_ACTIVE_LOAN;
  constructor(public id: number) { }
}

export class ClearActiveLoan {
  static readonly type = LoansActionsTypes.CLEAR_ACTIVE_LOAN;
}

export class MakeInvest {
  static readonly type = LoansActionsTypes.MAKE_INVEST;
  constructor(public amount: number) { }
}
