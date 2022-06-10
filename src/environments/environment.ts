// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // firebase: {
  //   projectId: 'firstapp-168dc',
  //   appId: '1:946362524946:web:1d297dc88ceb18650bffcb',
  //   databaseURL: 'https://firstapp-168dc-default-rtdb.firebaseio.com',
  //   storageBucket: 'firstapp-168dc.appspot.com',
  //   locationId: 'asia-south1',
  //   apiKey: 'AIzaSyA9Hy447T6ULxNkTINi7lUdIBMD5fodYzw',
  //   authDomain: 'firstapp-168dc.firebaseapp.com',
  //   messagingSenderId: '946362524946',
  //   measurementId: 'G-V3MR0BXSB6',
  // },
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyA9Hy447T6ULxNkTINi7lUdIBMD5fodYzw",
    authDomain: "firstapp-168dc.firebaseapp.com",
    databaseURL: "https://firstapp-168dc-default-rtdb.firebaseio.com",
    projectId: "firstapp-168dc",
    storageBucket: "firstapp-168dc.appspot.com",
    messagingSenderId: "946362524946",
    appId: "1:946362524946:web:1d297dc88ceb18650bffcb",
    measurementId: "G-V3MR0BXSB6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
