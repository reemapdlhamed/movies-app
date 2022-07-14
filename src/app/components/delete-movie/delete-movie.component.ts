import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css'],
})
export class DeleteMovieComponent implements OnInit {
  dialog: any;
  constructor() {}

  ngOnInit(): void {}
 
}
