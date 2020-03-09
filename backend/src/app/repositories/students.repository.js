'use strict';

class StudentRepository {
    constructor(db) {
        this.db = db;
    }

    async getClients() {
        const clientsSnapshot = await this.db
            .collection('students')
            .get();

        return clientsSnapshot.docs.map(client => {
            return {
                id: client.id,
                ...client.data()
            }
        });
    }
}

module.exports = StudentRepository;