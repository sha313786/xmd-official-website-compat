"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveLogs = void 0;
exports.recordLiveLog = recordLiveLog;
exports.liveLogs = [];
function recordLiveLog(message) {
    const line = `[${new Date().toISOString()}] ${message}`;
    exports.liveLogs.push(line);
    if (exports.liveLogs.length > 50)
        exports.liveLogs.shift();
    console.log(line);
}
