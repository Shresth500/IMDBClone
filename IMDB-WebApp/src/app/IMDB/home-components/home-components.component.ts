import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { IMovie, IMovieState } from '../../Common/Model/Movies';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../../Services/Authentication/auth-service.service';

@Component({
  selector: 'app-home-components',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './home-components.component.html',
  styleUrl: './home-components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponentsComponent implements OnInit {
  movieListData$!: Observable<IMovie | null>;
  ngOnInit(): void {}

  constructor(
    private movieStore: Store<IMovieState>,
    private cookieService: CookieService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  isAuthorized() {
    return this.cookieService.check('refresh');
  }

  LogOut() {
    this.cookieService.deleteAll();
    this.authService.logout();
  }
}
