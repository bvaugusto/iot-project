'use strict';

const { asValue, asClass } = require('awilix');
const Firebase = require('../services/firebase');

module.exports = async(req, res, next) => {

    // repositories
    const StudentRepository = require('../repositories/students.repository');

    // services
    const StudentService = require('../services/student');

    // controllers
    const StudentController = require('../controller/student.controller');

    let dependencies = {
        // Repository
        studentRepository: asClass(StudentRepository).scoped(),

        // Service
        studentService: asClass(StudentService).scoped(),

        // Controller
        studentController: asClass(StudentController).scoped(),
    };

    req.container.register(dependencies);

    return next();
};