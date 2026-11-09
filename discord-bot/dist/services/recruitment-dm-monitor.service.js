"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruitmentDMMonitorService = exports.RecruitmentDMMonitorService = void 0;
const recruitment_dm_service_1 = require("./recruitment-dm.service");
const logger_1 = require("../config/logger");
class RecruitmentDMMonitorService {
    static interval = null;
    static start() {
        if (this.interval) {
            return;
        }
        logger_1.Logger.info("Recruitment DM monitor started.");
        // Run immediately when the bot starts
        void recruitment_dm_service_1.RecruitmentDMService.processApplications();
        // Check every 60 seconds (optimized for Supabase log and query quotas)
        this.interval = setInterval(() => {
            void recruitment_dm_service_1.RecruitmentDMService.processApplications();
        }, 60_000);
    }
    static stop() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
        logger_1.Logger.info("Recruitment DM monitor stopped.");
    }
}
exports.RecruitmentDMMonitorService = RecruitmentDMMonitorService;
exports.recruitmentDMMonitorService = RecruitmentDMMonitorService;
