'use strict';

const AuthModel = require('../models/auth.model');

class AuthService {

    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async signInAnonymously() {
        const anonymous = this.authRepository.signInAnonymously();
        return anonymous;
    }
}

module.exports = AuthService;