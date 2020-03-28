'use strict';

const BaseModel = require('./base.model');

const Model = BaseModel({});

class AuthModel extends Model {
    constructor(student) {
        super(student);
    }
}

module.exports = AuthModel;