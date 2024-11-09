import { IMovieDetails } from './movies.model';

export interface ICollection {
  id: string;
  title: string;
  description: string;
  movies: IMovieDetails[];
}
