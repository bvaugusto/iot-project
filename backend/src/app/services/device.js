'use strict';

const DeviceModel = require('../models/device.model');

class DeviceService {
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    
    async createDevice() {
        const student = this.deviceRepository.getClients();
        return student;
    }

    async getDevice(address) {
        const device = this.deviceRepository.getDevice();
        return device;
    }

    async fetchDevice(address) {
        const deviceClient = await this.deviceRepository.fetchDevice(address);
        return deviceClient;
    }

    async registrationDevice(address, name) {
        const newDevice = await this.deviceRepository.registrationDevice(address, name);
        return newDevice;
    }

    async registrationPresence(rssi, device) {
        const newPresence = await this.deviceRepository.registrationPresence(rssi, device);
        return newPresence;
    }
}

module.exports = DeviceService;