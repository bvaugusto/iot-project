'use strict';

const StudentModel = require('../models/student.model');

class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
}

module.exports = StudentService;