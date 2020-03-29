'use strict';

const FieldValue = require('firebase').firestore.FieldValue;

function getCurrentDate() {
    const timestamp = new Date().getTime();
    const currentDate = new Date(timestamp);

    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    return date + "-" + (month + 1) + "-" + year;
}

function createSnapshotDatePresence(instanceDB, deviceId) {
    return instanceDB
        .collection('devices')
        .doc(deviceId)
        .collection('presence')
        .doc(getCurrentDate());
}

function createSnapshotRegister(instanceDB, deviceId) {
    return instanceDB
        .collection('devices')
        .doc(deviceId)
        .collection('presence')
        .doc(getCurrentDate())
        .collection('register');
}

class DeviceRepository {
    constructor(db) {
        this.db = db;
    }

    async fetchDevice(address) {
        const ref = this.db.collection('devices');

        return await ref.where('bd_addr', '==', address)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size) {
                    return querySnapshot.docs[0].id
                }
                return false;
            });
    }

    async registrationDevice(address, name) {
        return await this.db.collection('devices').add({ bd_addr: address, name })
            .then(ref => { return ref.id });
    }

    async isParametherPresence(deviceId) {

        const snapShotIsParametherPresence = createSnapshotDatePresence(this.db, deviceId);

        return await snapShotIsParametherPresence
            .get()
            .then(parameters => {
                return parameters.exists
            });
    }

    async mountParametherPresence(deviceId, parameters) {
        const snapshotMountParametherPresence = createSnapshotDatePresence(this.db, deviceId);

        return snapshotMountParametherPresence
            .set({...parameters })
            .then(ref => {
                return ref
            });
    }

    async registrationPresence(rssi, deviceId) {
        const serverTimestamp = FieldValue.serverTimestamp();
        const snapshotRegistrationPresence = createSnapshotRegister(this.db, deviceId);

        return snapshotRegistrationPresence.add({
            rssi,
            created_at: serverTimestamp
        }).then(ref => {
            return ref.id;
        });
    }

    async countRegister(deviceId) {
        const snapshotupdatePresence = createSnapshotRegister(this.db, deviceId);

        return snapshotupdatePresence.get().then(querySnapshot => { return querySnapshot.size });
    }

    async searchDataByPosition(deviceId, position) {

        const snapshotSearchDataByPosition = createSnapshotRegister(this.db, deviceId);

        return snapshotSearchDataByPosition.orderBy("created_at", "asc")
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    return querySnapshot.docs[position].data();
                } else {
                    return 0;
                }
            });
    }

    async getParamsDatePresence(deviceId) {
        const snapshotParamsDatePserence = createSnapshotDatePresence(this.db, deviceId);

        return await snapshotParamsDatePserence.get()
            .then(doc => {
                return doc.data()
            });
    }

    async updatePresence(deviceId, missingQty) {
        const snapshotParamsDatePserence = createSnapshotDatePresence(this.db, deviceId);

        return snapshotParamsDatePserence.set({
            missing_qty: missingQty
        }, { merge: true });
    }
}

module.exports = DeviceRepository;