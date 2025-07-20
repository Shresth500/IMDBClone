import { Component } from '@angular/core';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';
import { IAuth, ILogin } from '../../Common/Model/Authentication';
import { Store } from '@ngrx/store';
import * as AuthFormSelectors from '../../Common/StateManagement/Authentication/AuthenticationForm/AuthForm.selector';

@Component({
  selector: 'app-login',
  standalone: true, // ← if this is a standalone component
  imports: [AuthenticationFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // ✅ corrected key from styleUrl → styleUrls
})
export class LoginComponent {
  constructor(private store: Store<{ authData: IAuth }>) {}

  LoginDetails($event: void): void {
    this.store
      .select(AuthFormSelectors.getLoginData)
      .subscribe((loginCredentials) => {
        console.log(loginCredentials);
      });
  }
}
