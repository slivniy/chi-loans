import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoansState, LoansStateModel } from './state/loans.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @Select( LoansState ) LoansState$: Observable<LoansStateModel>;
}
