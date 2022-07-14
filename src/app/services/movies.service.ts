import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../models/movies';
import { environment } from './../../environments/environment';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http.get<Movies>(`${environment.apiUrl}/api/movies`);
  }
  getMovieDetails(id: any): Observable<Movies> {
    const movieInfoRequest = this.http.get(
      `${environment.apiUrl}/api/movies/${id}`
    );
    // const movieTrailerRequest = this.http.get(
    //   `${environment.apiUrl}/api/movies/${id}`
    // );

    return forkJoin({
      movieInfoRequest,
      // movieTrailerRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['movieInfoRequest'],

          // trailers: resp['movieTrailerRequest']?.results,
        };
      })
    );
  }
  addMovie(data: any, file: File) {
    const movieForm = new FormData();
    movieForm.append('name', data?.name);
    movieForm.append('description', data?.description);
    movieForm.append('image', file, file.name);
    movieForm.append('category_id', data?.category_id);

    return this.http.post<Movies>(
      `${environment.apiUrl}/api/movies`,
      movieForm
    );
  }
  updateMovie(data: any, id: any, file: File) {
    const movieForm = new FormData();
    movieForm.append('name', data?.name);
    movieForm.append('description', data?.description);
    movieForm.append('image', file, file.name);
    movieForm.append('category_id', data?.category_id);
    movieForm.append('_method', 'put');
    console.log('updatedData', data);
    return this.http.post(`${environment.apiUrl}/api/movies/${id}`, movieForm);
  }
  deleteMovie(id: any) {
    return this.http.delete<Movies>(`${environment.apiUrl}/api/movies/${id}`);
  }
  listMoviesByCategory(id: any) {
    return this.http.get(`${environment.apiUrl}/api/moviesByCategory/${id}`);
  }
}
