'use strict';

class StudentController {

    constructor(studentService) {
        this.studentService = studentService;
    }

    async get(req, res) {
        try {
            const student = await this.studentService.getClients();
            return res.status(200).send(student);
        } catch (e) {
            return res.status(404).send({ message: 'Student not found!' });
        }
    }

    async post(req, res) {
        try {

            console.log(req);

        } catch (error) {
            return res.status(404).send({ message: error.message });
        }
    }
}

module.exports = StudentController;