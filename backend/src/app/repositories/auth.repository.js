'use strict';

class AuthRepository {
    constructor(auth) {
        this.auth = auth;
    }

    async signInAnonymously() {
        const email = process.env.EMAIL_AUTH;
        const password = process.env.PASSWORD_AUTH;

        return await this.auth.signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                return { error }
            });
    }
}

module.exports = AuthRepository;