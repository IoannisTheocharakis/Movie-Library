import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ICollection } from '../models/collections.model';
import { IMovieDetails } from '../models/movies.model';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  collections = signal<ICollection[]>([]);

  private setCollectionsToSignal() {
    const collections: ICollection[] = JSON.parse(
      localStorage.getItem('collections') || '[]'
    );
    this.collections.set(collections);
    return collections;
  }

  getCollections() {
    return this.setCollectionsToSignal();
  }

  setCollection(title: string, description: string) {
    const collection = { id: uuidv4(), title, description, movies: [] };
    const collections = this.getCollections();
    collections.push(collection);
    localStorage.setItem('collections', JSON.stringify(collections));
    this.setCollectionsToSignal();
  }

  updateCollection(id: string, title: string, description: string) {
    let collections = this.getCollections();
    collections = collections.map((collection) => {
      if (collection.id === id) {
        return { ...collection, title, description };
      } else {
        return collection;
      }
    });
    localStorage.setItem('collections', JSON.stringify(collections));
    this.setCollectionsToSignal();
  }

  getCollection(id: string) {
    const collections: ICollection[] = this.getCollections();
    const collection = collections.find((data) => data.id === id);
    return collection ?? null;
  }

  removeCollection(id: string) {
    let collections = this.getCollections();
    collections = collections.filter((data) => data.id !== id);
    localStorage.setItem('collections', JSON.stringify(collections));
    this.setCollectionsToSignal();
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
    this.setCollectionsToSignal();
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
    this.setCollectionsToSignal();
  }

  transferMoveToOtherCollection(
    fromCollectionID: string,
    toCollectionID: string,
    movie: IMovieDetails
  ) {
    this.removeMovieFromCollection(fromCollectionID, movie.id);
    this.setMovieToCollection(toCollectionID, movie);
  }
}
