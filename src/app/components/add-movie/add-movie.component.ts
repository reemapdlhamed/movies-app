import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  @Output() btnClicked = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onClick() {
    this.btnClicked.emit();
  }
}
