'use strict';

const { asClass } = require('awilix');
const Firebase = require('../services/firebase');

module.exports = async(req, res, next) => {

    // repositories
    const AuthRepository = require('../repositories/auth.repository');
    const DeviceRepository = require('../repositories/device.repository');

    // services
    const AuthService = require('../services/auth');
    const DeviceService = require('../services/device');

    // controllers
    const AuthController = require('../controller/auth.controller');
    const DeviceController = require('../controller/device.controller');

    let dependencies = {
        // Repository
        authRepository: asClass(AuthRepository).scoped(),
        deviceRepository: asClass(DeviceRepository).scoped(),

        // Service
        authService: asClass(AuthService).scoped(),
        deviceService: asClass(DeviceService).scoped(),

        // Controller
        AuthController: asClass(AuthController).scoped(),
        deviceController: asClass(DeviceController).scoped(),
    };

    req.container.register(dependencies);

    return next();
};