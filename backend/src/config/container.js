const awilix = require('awilix');

const { createContainer, asClass, asValue, InjectionMode } = awilix;

const Firebase = require('../app/services/firebase');
const studentRepository = require('../app/repositories/students.repository');

const configClients = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const clientConnection = new Firebase(configClients, process.env.FIREBASE_CLIENTS_APPLICATION_NAME);

const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
});

container.register({
    db: asValue(clientConnection.db),
    connection: asValue(clientConnection),
    studentRepository: asClass(studentRepository).scoped(),
});

module.exports = container;