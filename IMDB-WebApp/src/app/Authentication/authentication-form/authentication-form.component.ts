import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule, NgForm } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { IAuth, ILogin, IRegister } from '../../Common/Model/Authentication';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthFormActions from '../../Common/StateManagement/Authentication/AuthenticationForm/AuthForm.action';

@Component({
  selector: 'app-authentication-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    RouterLink,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.scss',
})
export class AuthenticationFormComponent implements OnInit {
  @Output() LoginDetails = new EventEmitter<void>();
  @Output() RegisterDetails = new EventEmitter<void>();
  loginFormData$: Observable<ILogin> | undefined;
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLogged: Boolean = true;
  ngOnInit(): void {
    const fullUrl = this.router.url;
    const lastUrlSegment = fullUrl.split('?')[0].split('/').pop();
    if (lastUrlSegment === 'login') this.isLogged = true;
    else this.isLogged = false;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ authData: IAuth }>
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password2: [''],
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onLogin() {
    let loginData: ILogin = { ...this.loginForm.value };
    this.store.dispatch(
      AuthFormActions.appendLoginCredentials({ loginData: loginData })
    );
    this.LoginDetails.emit();
  }
  onRegister() {
    let registerData = { ...this.registerForm.value };
    registerData.password2 = registerData.password;
    this.store.dispatch(
      AuthFormActions.appendRegisterCredentials({
        registerData: registerData,
      })
    );
    this.RegisterDetails.emit();
  }
}
