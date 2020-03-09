'use strict';

const StudentModel = require('../models/student.model');

class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    async getClients() {
        const student = this.studentRepository.getClients();
        return student;
    }
}

module.exports = StudentService;