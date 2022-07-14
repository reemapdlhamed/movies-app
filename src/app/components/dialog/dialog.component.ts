import {
  Component,
  ElementRef,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from './../../services/movies.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnChanges {
  actionBtn: string = 'Save';
  category: any;
  file: any;
  movieForm: FormGroup;
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';

  fileChangeEvent(fileInput: any) {
    this.file = fileInput.target.files[0];
  }

  constructor(
    private fb: FormBuilder,
    private MoviesService: MoviesService,
    @Inject(MAT_DIALOG_DATA) public editMovie: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private CategoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category_id: ['', Validators.required],
    });
    // console.log('editMovie', this.editMovie);
    if (this.editMovie) {
      this.actionBtn = 'Update';
      this.movieForm.controls['name'].setValue(this.editMovie.name);
      this.movieForm.controls['description'].setValue(
        this.editMovie.description
      );
      this.movieForm.controls['image'].setValue(this.editMovie.image);
      this.movieForm.controls['category_id'].setValue(
        this.editMovie.Category_id
      );
    }
    this.CategoryService.getAllCategories().subscribe((resData) => {
      this.category = resData;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.editMovie) {
      this.actionBtn = 'Update';
      this.movieForm.controls['name'].setValue(this.editMovie.name);
      this.movieForm.controls['description'].setValue(
        this.editMovie.description
      );
      this.movieForm.controls['image'].setValue(this.editMovie.image);
      this.movieForm.controls['category_id'].setValue(
        this.editMovie.Category_id
      );
    }
  }
  addMovie() {
    // console.log(this.movieForm.value);
    if (!this.editMovie) {
      if (this.movieForm.valid) {
        this.MoviesService.addMovie(this.movieForm.value, this.file).subscribe({
          next: (resData) => {
            alert('added');
            location.reload();
            this.movieForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('error');
          },
        });
      }
    } else {
      this.updateMovie();
    }
  }
  updateMovie() {
    this.MoviesService.updateMovie(
      this.movieForm.value,
      this.editMovie.id,
      this.file
    ).subscribe({
      next: (resData) => {
        // console.log(resData);
        // console.log('  this.editMovie.file', this.movieForm.value);

        alert('updated');
        this.movieForm.reset();
        this.dialogRef.close('updated');
        location.reload();
      },
      error: () => {
        alert('error while updating');
      },
    });
  }
}
