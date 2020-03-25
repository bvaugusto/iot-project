'use strict';

class DeviceController {

    constructor(deviceService) {
        this.deviceService = deviceService;
    }

    async post(req, res) {
        const { rssi, address, name } = req.body;

        try {
            let deviceId = await this.deviceService.fetchDevice(address);
            if (deviceId === undefined) {
                deviceId = await this.deviceService.registrationDevice(address, name);
            }

            const response = await this.deviceService.registrationPresence(rssi, deviceId);

            return res.status(200).send(response);
        } catch (error) {
            return res.status(404).send({ message: error.message });
        }
    }
}

module.exports = DeviceController;