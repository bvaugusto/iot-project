'use strict';

const DeviceModel = require('../models/device.model');

function convertTimestampToDate(unixTimestamp) {
    return new Date(unixTimestamp * 1000);
}

function diffDateReturnMinute(finalDate, initialDate) {
    const dif = (finalDate - initialDate);
    return Math.round((dif / 1000) / 60);
}

function calculatePresence(paramsPresence, diffDate) {
    const { minute_class, qty_class } = paramsPresence;
    const totalClassMinutes = minute_class * qty_class;
    const missingQty = (qty_class * diffDate) / totalClassMinutes;
    const trunkMissingQty = Math.trunc(missingQty);

    if (trunkMissingQty >= qty_class) {
        trunkMissingQty = qty_class
    }

    return (trunkMissingQty || 0);
}

class DeviceService {
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    async fetchDevice(address) {
        const deviceClient = await this.deviceRepository.fetchDevice(address);
        return deviceClient;
    }

    async registrationDevice(address, name) {
        const newDevice = await this.deviceRepository.registrationDevice(address, name);
        return newDevice;
    }

    async isParametherPresence(deviceId) {
        const validateParameter = await this.deviceRepository.isParametherPresence(deviceId);
        return validateParameter;
    }

    async mountParametherPresence(deviceId, parameters) {
        const paramether = await this.deviceRepository.mountParametherPresence(deviceId, parameters);
        return paramether;
    }

    async registrationPresence(rssi, device) {
        const register = await this.deviceRepository.registrationPresence(rssi, device);
        return register;
    }

    async updatePresence(deviceId) {
        const countRegister = await this.deviceRepository.countRegister(deviceId);

        const initialData = await this.deviceRepository.searchDataByPosition(deviceId, 0);
        const finalData = await this.deviceRepository.searchDataByPosition(deviceId, (countRegister - 1));

        const initialDate = convertTimestampToDate(initialData.created_at.seconds);
        const finalDate = convertTimestampToDate(finalData.created_at.seconds);

        const diffDate = diffDateReturnMinute(finalDate, initialDate);
        const paramsPresence = await this.deviceRepository.getParamsDatePresence(deviceId);
        const missingQty = calculatePresence(paramsPresence, diffDate);
        const register = await this.deviceRepository.updatePresence(deviceId, missingQty);

        return register;
    }
}

module.exports = DeviceService;