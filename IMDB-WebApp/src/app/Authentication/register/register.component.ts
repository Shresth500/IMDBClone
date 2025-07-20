import { Component } from '@angular/core';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';
import {
  IAuth,
  IRegister,
  IRegisterState,
} from '../../Common/Model/Authentication';
import { Store } from '@ngrx/store';
import * as AuthFormSelectors from '../../Common/StateManagement/Authentication/AuthenticationForm/AuthForm.selector';
import * as AuthActions from '../../Common/StateManagement/Authentication/Auth/Auth.actions';
import * as AuthSelector from '../../Common/StateManagement/Authentication/Auth/Auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [AuthenticationFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private store: Store<{ authData: IAuth }>,
    private authStore: Store<{ registerData: IRegisterState }>,
    private router: Router
  ) {}
  RegisterDetails($event: void) {
    this.store
      .select(AuthFormSelectors.getRegisterData)
      .subscribe((registerData) => {
        this.authStore.dispatch(
          AuthActions.register({ registerData: registerData })
        );
      });

    this.authStore.select(AuthSelector.getRegisterUser).subscribe((user) => {
      if (user !== null) {
        this.router.navigateByUrl('auth/login');
      }
    });
  }
}
