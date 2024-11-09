import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ICollection } from '../models/collections.model';
import { IMovieDetails } from '../models/movies.model';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  getCollections() {
    const collections: ICollection[] = JSON.parse(
      localStorage.getItem('collections') || '[]'
    );
    return collections;
  }

  setCollection(title: string, description: string) {
    const collection = { id: uuidv4(), title, description, movies: [] };
    const collections = this.getCollections();
    collections.push(collection);
    localStorage.setItem('collections', JSON.stringify(collections));
  }

  getCollection(id: string) {
    const collections: ICollection[] = this.getCollections();
    const collection = collections.find((data) => data.id === id);
    return collection ?? null;
  }

  setMovieToCollection(collectionID: string, movie: IMovieDetails) {
    let collections = this.getCollections();
    collections = collections.map((data) => {
      if (collectionID === data.id) {
        const movieIndex = data.movies.findIndex(
          (data) => data.id === movie.id
        );
        if (movieIndex !== -1) {
          return data;
        } else {
          return {
            ...data,
            movies: [...data.movies, movie],
          };
        }
      }
      return data;
    });
    localStorage.setItem('collections', JSON.stringify(collections));
  }

  removeMovieFromCollection(collectionID: string, movieID: number | string) {
    let collections = this.getCollections();
    collections = collections.map((data) => {
      if (collectionID === data.id) {
        return {
          ...data,
          movies: data.movies.filter((movie) => movie.id !== movieID),
        };
      }
      return data;
    });
    localStorage.setItem('collections', JSON.stringify(collections));
  }
}
