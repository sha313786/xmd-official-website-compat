"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationCode = generateVerificationCode;
const CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function generateVerificationCode(length = 8) {
    let code = "";
    for (let i = 0; i < length; i++) {
        code += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }
    return code;
}
