'use strict';

const { asClass } = require('awilix');
const Firebase = require('../services/firebase');

module.exports = async(req, res, next) => {

    // repositories
    const StudentRepository = require('../repositories/students.repository');
    const DeviceRepository = require('../repositories/devices.repository');

    // services
    const StudentService = require('../services/student');
    const DeviceService = require('../services/device');

    // controllers
    const StudentController = require('../controller/student.controller');
    const DeviceController = require('../controller/device.controller');

    let dependencies = {
        // Repository
        studentRepository: asClass(StudentRepository).scoped(),
        deviceRepository: asClass(DeviceRepository).scoped(),

        // Service
        studentService: asClass(StudentService).scoped(),
        deviceService: asClass(DeviceService).scoped(),

        // Controller
        studentController: asClass(StudentController).scoped(),
        deviceController: asClass(DeviceController).scoped(),
    };

    req.container.register(dependencies);

    return next();
};