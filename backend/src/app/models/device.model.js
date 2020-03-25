'use strict';

const BaseModel = require('./base.model');

const Model = BaseModel({
  rssi: Number,
  address: String,
  name: String
});

class DeviceModel extends Model {
    constructor(device) {
        super(device)
    }
}

module.exports = DeviceModel;