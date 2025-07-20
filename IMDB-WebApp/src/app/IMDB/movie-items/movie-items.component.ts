import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { IMovieInfo } from '../../Common/Model/Movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-items',
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './movie-items.component.html',
  styleUrl: './movie-items.component.scss',
})
export class MovieItemsComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}
  hovered = false;
  @Input() movie!: IMovieInfo;
  getShortDescription(text: string, wordLimit: number): string {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  onKnowMore() {
    this.router.navigateByUrl(`movieDetails/${this.movie.id}`);
  }
}
