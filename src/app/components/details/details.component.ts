import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/models/movies';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from './../../services/movies.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  movie: Movies;
  movieId: 0;
  routeSub: Subscription = new Subscription();
  movieSub: Subscription = new Subscription();
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private MoviesService: MoviesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((Params: Params) => {
      this.movieId = Params['id'];
      this.getMovieDetails(this.movieId);
    });
  }
  getMovieDetails(id: any) {
    this.movieSub = this.MoviesService.getMovieDetails(id).subscribe(
      (resData) => {
        // console.log('moviedetailes', resData);
        this.movie = resData;
      }
    );
  }
}
