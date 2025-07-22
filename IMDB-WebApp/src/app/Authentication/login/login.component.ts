import { Component } from '@angular/core';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';
import { IAuth, IAuthState, ILogin } from '../../Common/Model/Authentication';
import { Store } from '@ngrx/store';
import * as AuthFormSelectors from '../../Common/StateManagement/Authentication/AuthenticationForm/AuthForm.selector';
import * as AuthActions from '../../Common/StateManagement/Authentication/Auth/Auth.actions';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/Authentication/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true, // ← if this is a standalone component
  imports: [AuthenticationFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // ✅ corrected key from styleUrl → styleUrls
})
export class LoginComponent {
  constructor(
    private store: Store<{ authData: IAuth }>,
    private authStore: Store<IAuthState>,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  LoginDetails($event: void): void {
    // this.store
    //   .select(AuthFormSelectors.getLoginData)
    //   .subscribe((loginCredentials) => {
    //     this.authStore.dispatch(
    //       AuthActions.login({ userData: loginCredentials })
    //     );
    //     this.router.navigateByUrl('');
    //   });
    this.store
      .select(AuthFormSelectors.getLoginData)
      .subscribe((loginCredentials) => {
        this.authService.login(loginCredentials).subscribe((data) => {
          this.router.navigateByUrl('');
        });
      });
  }
}
