import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AddMovieComponent } from '../components/add-movie/add-movie.component';

@NgModule({
  declarations: [NavBarComponent, AddMovieComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NavBarComponent, AddMovieComponent],
})
export class CoreModule {}
