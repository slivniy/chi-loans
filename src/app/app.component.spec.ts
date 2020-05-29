import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { LoansState, LoansStateModel } from './state/loans.state';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;
  let state: LoansStateModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([
          LoansState
        ]),
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
    state = store.selectSnapshot( LoansState );
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('User is able to see all current loans', () => {
    const loansList = fixture.debugElement.queryAllNodes(By.css('.loans-list--loan-block'));
    expect(loansList.length).toEqual(state.loans.length);
  });

  it('The User is able to see the number representing the total amount of possible', () => {
    const loansTotal = fixture.debugElement.query(By.css('.loans-total'));
    const ne: HTMLElement = loansTotal.nativeElement;
    const amountInView = new DecimalPipe('en-US').transform(state.totalAmount);
    expect(ne.innerText).toContain(amountInView);
  });

  it('User can click button labelled “Invest”', () => {
    const button = fixture.debugElement.query(By.css('.loans-list--loan-invest-button'));
    button.triggerEventHandler('click', state.loans[0].id);
    state = store.selectSnapshot( LoansState );
    expect(state.activeLoan.id).toBe(state.loans[0].id);
  });

  it('User can put numeric value (invested amount) in the input', () => {
    const numericValue = 200;
    const button = fixture.debugElement.query(By.css('.loans-list--loan-invest-button'));
    button.triggerEventHandler('click', state.loans[0].id);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('#invest'));
    const ne: HTMLInputElement = input.nativeElement;
    ne.value = numericValue.toString();
    ne.dispatchEvent(new Event('change'));
    expect(app.investAmount).toBe(numericValue);
  });

  it('User can close popup', () => {
    app.setActiveLoan(state.loans[0].id);
    fixture.detectChanges();
    const buttonClose = fixture.debugElement.query(By.css('#closeModalButton'));
    buttonClose.triggerEventHandler('click', null);
    fixture.detectChanges();
    const investForm = fixture.debugElement.query(By.css('.invest-form--wrap'));

    state = store.selectSnapshot( LoansState );
    expect(investForm).toBe(null);
    expect(state.activeLoan).toBeUndefined();
  });

  it('The loan on which User have invested should have some visual indication', () => {
    const loanIndex = 2;
    app.setActiveLoan(state.loans[loanIndex].id);
    app.investAmount = 300;
    app.invest();
    fixture.detectChanges();
    const loanNodes = fixture.debugElement.queryAll(By.css('.loans-list--loan-block'));
    const mark = loanNodes[loanIndex].query(By.css('.loans-list--loan-invested-text'));
    expect(mark).not.toBe(null);
  });

  it('The available amount, for the loan User invested into, should decrease', () => {
    const loanIndex = 1;
    const investAmount = 1000;
    const initialAvailableAmount = store.selectSnapshot( LoansState ).loans[loanIndex].available;
    app.setActiveLoan(state.loans[loanIndex].id);
    app.investAmount = investAmount;
    app.invest();
    const updatedAvailableAmount = store.selectSnapshot( LoansState ).loans[loanIndex].available;
    expect(updatedAvailableAmount).toBe(initialAvailableAmount - investAmount);
  });

  it('the total available number should also adjust accordingly.', () => {
    const investAmount = 1000;
    const initialTotalAmount = store.selectSnapshot( LoansState ).totalAmount;
    app.setActiveLoan(state.loans[2].id);
    app.investAmount = investAmount;
    app.invest();
    const updatedTotalAmount = store.selectSnapshot( LoansState ).totalAmount;
    expect( updatedTotalAmount).toBe(initialTotalAmount - investAmount);
  });

  it('The form should be closed after invest click', () => {
    let investForm = fixture.debugElement.query(By.css('.invest-form--wrap'));
    expect(investForm).toBe(null);

    app.setActiveLoan(state.loans[2].id);
    fixture.detectChanges();
    investForm = fixture.debugElement.query(By.css('.invest-form--wrap'));
    expect(investForm).not.toBe(null);

    app.investAmount = 100;
    app.invest();
    fixture.detectChanges();
    investForm = fixture.debugElement.query(By.css('.invest-form--wrap'));
    expect(investForm).toBe(null);
  });
});
