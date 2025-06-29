# MovieLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## API Key Setup

To run this application, you need an API key from [The Movie Database (TMDb)](https://developer.themoviedb.org/docs/getting-started). Please follow these steps:

1. Create an account on TMDb and generate your API key.
2. Run the command `ng generate environments` to generate the environment files.
3. In the development environment file, add the following format:

   ```typescript
   export const environment = {
     production: false,
     apiKey: 'YOUR_API_KEY_HERE',
     imagePath: 'https://image.tmdb.org/t/p/',
   };

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
