import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { LoansState, LoansStateModel } from './state/loans.state';
import { DecimalPipe } from '@angular/common';

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
        ])
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
    fixture.detectChanges();
    state = store.selectSnapshot( LoansState );
    expect(state.activeLoan.id).toBe(state.loans[0].id);
  });

  xit('User can put numeric value (invested amount) in the input', () => {
  });

  xit('User can close popup', () => {
  });

  xit('the form should be closed after invest click', () => {
  });

  xit('the available amount, for the loan User invested into, should decrease', () => {
  });

  xit('the total available number should also adjust accordingly.', () => {
  });

  xit('The loan on which User have invested should have some visual indication', () => {
  });
});
