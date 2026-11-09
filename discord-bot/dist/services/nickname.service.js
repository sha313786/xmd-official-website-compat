"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NicknameService = void 0;
const nickname_1 = require("../config/nickname");
class NicknameService {
    /**
     * Convert the input to uppercase and clean spaces.
     */
    static normalize(name) {
        return name
            .trim()
            .replace(/\s+/g, " ")
            .toUpperCase();
    }
    /**
     * Validate the RP name.
     */
    static validate(name) {
        const normalized = this.normalize(name);
        if (normalized.length < nickname_1.NicknameConfig.MIN_LENGTH ||
            normalized.length > nickname_1.NicknameConfig.MAX_LENGTH) {
            return {
                valid: false,
                message: `Name must be between ${nickname_1.NicknameConfig.MIN_LENGTH} and ${nickname_1.NicknameConfig.MAX_LENGTH} characters.`,
            };
        }
        if (!nickname_1.NicknameConfig.NAME_REGEX.test(normalized)) {
            return {
                valid: false,
                message: "Only letters (A-Z) and spaces are allowed.",
            };
        }
        return { valid: true };
    }
    /**
     * Format nickname.
     */
    static format(name) {
        return `${nickname_1.NicknameConfig.PREFIX} ${this.normalize(name)}`;
    }
    /**
     * Change Discord nickname.
     */
    static async changeNickname(member, rpName) {
        const nickname = this.format(rpName);
        await member.setNickname(nickname);
    }
}
exports.NicknameService = NicknameService;
