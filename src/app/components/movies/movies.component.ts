import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from './../../services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../dialog/dialog.component';
import { CategoryService } from './../../services/category.service';
import { Category } from './../../models/category';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  selectedOption: string;
  category: any;
  public movies: any;
  public sort: string = '';
  private routeSub: Subscription = new Subscription();
  private movieSub: Subscription = new Subscription();
  constructor(
    private MoviesService: MoviesService,
    private router: Router,
    public dialog: MatDialog,
    private CategoryService: CategoryService
  ) {}

  searchMovies(event: any) {
    // console.log(this.selectedOption);
  }
  categorizedMovies() {
    this.MoviesService.listMoviesByCategory(this.selectedOption).subscribe(
      (resData) => {
        this.movies = resData;
        // console.log(resData);
      }
    );
  }
  openmovieDetailes(id: string): void {
    this.router.navigate(['details', id]);
  }
  editMovie(id, name, description, image: File, category_id , category) {
    // console.log('image', image);

    this.dialog.open(DialogComponent, {
      width: '30%',
      data: { id, name, description, image, category_id , category},
    });
  }
  deleteMovie(id: any) {
    this.MoviesService.deleteMovie(id).subscribe((resData) => {
      alert('deleted');
      location.reload();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    this.MoviesService.getAllMovies().subscribe((resData) => {
      // console.log('movies', resData);
      this.movies = resData;
      // console.log(this.movies?.message[0]?.id);
    });
    this.CategoryService.getAllCategories().subscribe((resData) => {
      this.category = resData;
      // console.log(this.category);
    });
  }
  ngOnDestroy(): void {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe;
    }
  }
}
