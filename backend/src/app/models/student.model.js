'use strict';

const BaseModel = require('./base.model');

const Model = BaseModel({
    name: String
});

class StudentModel extends Model {
    constructor(student) {
        super(student);
    }
}

module.exports = StudentModel;