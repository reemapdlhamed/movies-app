import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MoviesService } from './../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  category: any;
  file: any;
  constructor(
    public MoviesService: MoviesService,
    public ActivatedRoute: ActivatedRoute,
    private CategoryService : CategoryService
  ) {}
  fileChangeEvent(fileInput: any) {
    this.file = fileInput.target.files[0];
  }

  dialog: any;
  ngOnInit(): void {
    this.CategoryService.getAllCategories().subscribe((resData) => {
      this.category = resData;
    });
  }
  editMovie() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    });
  }
}
