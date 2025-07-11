import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-page',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.scss',
})
export class AuthenticationPageComponent {}
