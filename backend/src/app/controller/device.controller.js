'use strict';

class DeviceController {

    constructor(deviceService, authService) {
        this.deviceService = deviceService;
        this.authService = authService;
    }

    async post(req, res) {
        const { rssi, address, name } = req.body;

        try {
            await this.authService.signInAnonymously();
            
            let deviceId = await this.deviceService.fetchDevice(address);
            if (deviceId === undefined) {
                deviceId = await this.deviceService.registrationDevice(address, name);
            }

            const isParamether = await this.deviceService.isParametherPresence(deviceId);
            if (!isParamether) {
                const parameters = { minute_class: 50, qty_class: 4, missing_qty: 0 };
                await this.deviceService.mountParametherPresence(deviceId, parameters);
            }

            await this.deviceService.registrationPresence(rssi, deviceId);
            await this.deviceService.updatePresence(deviceId);

            return res.status(200).send({ message: 'Registro realizado com sucesso!'});
        } catch (error) {
            return res.status(404).send({ message: error.message });
        }
    }
}

module.exports = DeviceController;