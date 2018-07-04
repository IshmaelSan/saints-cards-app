// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
  	apiKey: "AIzaSyDg8MfKG2uDdvKLJOddX-BOm5mX6EXD1AU",
    authDomain: "test-project-f1b99.firebaseapp.com",
    databaseURL: "https://test-project-f1b99.firebaseio.com",
    projectId: "test-project-f1b99",
    storageBucket: "test-project-f1b99.appspot.com",
    messagingSenderId: "774907008659"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
