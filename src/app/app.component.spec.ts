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
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('User is able to see all current loans', () => {
    const loansList = fixture.debugElement.queryAllNodes(By.css('.loans-list--loan-block'));
    const state: LoansStateModel = store.selectSnapshot( LoansState );
    expect(loansList.length).toEqual(state.loans.length);
  });

  it('The User is able to see the number representing the total amount of possible', () => {
    const state: LoansStateModel = store.selectSnapshot( LoansState );
    const loansTotal = fixture.debugElement.query(By.css('.loans-total'));
    const ne: HTMLElement = loansTotal.nativeElement;
    const amountInView = new DecimalPipe('en-US').transform(state.totalAmount);
    expect(ne.innerText).toContain(amountInView);

  });

  xit('User can put numeric value (invested amount) in the input', () => {
  });

  xit('User can click button labelled “Invest”', () => {
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
