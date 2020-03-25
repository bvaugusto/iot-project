'use strict';

function getCurrentDate() {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    return date + "-" + (month + 1) + "-" + year;
}

class DeviceRepository {
    constructor(db) {
        this.db = db;
    }

    async fetchDevice(address) {
        const deviceSnapshot = await this.db
            .collection('devices')
            .where('bd_addr', '==', address)
            .limit(1)
            .get();

        const deviceId = deviceSnapshot.docs.map(device => device.id);

        return deviceId[0];
    }

    async registrationDevice(address, name) {
        return await this.db.collection('devices').add({ bd_addr: address, name })
            .then(ref => {
                return ref.id
            });
    }

    async registrationPresence(rssi, deviceId) {
        const FieldValue = require('firebase').firestore.FieldValue;
        const serverTimestamp = FieldValue.serverTimestamp();

        const snapshotRegistrationPresence = this.db
                .collection('devices')
                .doc(deviceId)
                .collection('presence')
                .doc(getCurrentDate())
                .collection('register');

        return snapshotRegistrationPresence.add({
            rssi, created_at: serverTimestamp
        }).then(ref => {
            return ref.id
          });
    }
}

module.exports = DeviceRepository;
