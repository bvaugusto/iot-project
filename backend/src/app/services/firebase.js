'use strict';

const app = require('firebase/app');

require('firebase/auth');
require('firebase/database');
require('firebase/firestore');

const firebase = require('firebase');

class Firebase {
    constructor(config, name) {
        let fbApp;

        try {
            if (!name) {
                fbApp = app.initializeApp(config);
            } else {
                fbApp = app.initializeApp(config, name);
            }
        } catch (e) {
            fbApp = firebase.apps.find(fb => fb.name === config.projectId);
        }
        this.auth = app.auth(fbApp);
        this.db = firebase.firestore(fbApp);
        this.firestore = firebase.firestore;
    }
}

module.exports = Firebase;