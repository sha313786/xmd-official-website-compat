import {
  Events,
  GuildMember,
} from "discord.js";

import { xmdHierarchyService } from "../services/xmd-hierarchy.service";

export default {
  name: Events.GuildMemberUpdate,

  once: false,

  async execute(
    oldMember: GuildMember,
    newMember: GuildMember
  ): Promise<void> {
    const xmdRoleIds = new Set(
      [
        "1525393594213597255",
        "1525393512466612267",
        "1525430179298676786",
        "1525430047912099911",
        "1525393398092005386",
        "1525393143808131142",
        "1525393070621986906",
        "1525392993824276531",
        "1525392923217367111",
        "1525392704324899027",
        "1525392517959520296",
        "1525392467170426880",
        "1525392415744331946",
        "1525392344973836380",
        "1525392245216514128",
        "1525392204024123512",
        "1525392168573992991",
        "1525391856140161045",
        "1525391750103826524",
        "1525391646936662066",
        "1525391222158659754",
      ]
    );

    const oldXmdRoles = oldMember.roles.cache.filter((role) =>
      xmdRoleIds.has(role.id)
    );

    const newXmdRoles = newMember.roles.cache.filter((role) =>
      xmdRoleIds.has(role.id)
    );

    const changed =
      oldXmdRoles.size !== newXmdRoles.size ||
      oldXmdRoles.some(
        (role) => !newXmdRoles.has(role.id)
      ) ||
      newXmdRoles.some(
        (role) => !oldXmdRoles.has(role.id)
      );

    if (!changed) {
      return;
    }

    console.log(
      `[XMD HIERARCHY] XMD role changed for ${newMember.user.tag}`
    );

    xmdHierarchyService.scheduleUpdate(
      newMember.guild
    );
  },
};