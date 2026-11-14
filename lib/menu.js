
export function getSectionCommands(section, commands = []) {
  const visible = commands.filter(command => !command.hidden);

  if (Array.isArray(section.commandNames)) {
    const selected = new Set(section.commandNames.map(value => String(value).toLowerCase()));
    return visible.filter(command => selected.has(String(command.name).toLowerCase()));
  }

  const categories = Array.isArray(section.categories) && section.categories.length
    ? section.categories
    : [section.key];

  const excluded = new Set(section.excludeNames || []);

  return visible.filter(command =>
    categories.includes(command.category) && !excluded.has(command.name)
  );
}

export function buildMenu({ commands = [], config = {}, theme = {} } = {}) {
  const menu = theme.menu || {};
  const sections = Array.isArray(theme.sections) ? theme.sections : [];
  const prefix = String(config.prefix || ".");
  const safeName = String(config.name || "FEI XMD").replace(/[\r\n]/g, " ").slice(0, 40);

  const lines = [
    String(menu.top || "┏━━〔 ") + safeName + String(menu.titleEnd || " 〕━━◆"),
    String(menu.infoLine || "┃ ❖ ") + "𝙑𝙚𝙧𝙨𝙞𝙤𝙣: " + String(config.version || "1.0.0"),
    String(menu.infoLine || "┃ ❖ ") + "𝙋𝙧𝙚𝙛𝙞𝙭: " + prefix,
    String(menu.infoLine || "┃ ❖ ") + "𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙡𝙤𝙖𝙙𝙚𝙙: " + commands.filter(command => !command.hidden).length,
    String(menu.blankLine || "┃")
  ];

  if (!commands.length) {
    lines.push(String(menu.infoLine || "┃ ❖ ") + "𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙢𝙤𝙙𝙪𝙡𝙚𝙨 𝙖𝙧𝙚 𝙗𝙚𝙞𝙣𝙜 𝙥𝙧𝙚𝙥𝙖𝙧𝙚𝙙.");
  } else {
    const assigned = new Set();

    for (const section of sections) {
      const members = getSectionCommands(section, commands)
        .filter(command => !assigned.has(command.name));

      lines.push(
        String(menu.top || "┏━━〔 ") +
        String(section.title || section.key) +
        String(menu.titleEnd || " 〕━━◆")
      );

      if (!members.length) {
        lines.push(String(menu.itemLine || "┃ ➤│ ") + "(𝙉𝙤 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙮𝙚𝙩)");
      } else {
        for (const command of members) {
          assigned.add(command.name);

          lines.push(
            String(menu.itemLine || "┃ ➤│ ") +
            prefix + command.name +
            (command.description ? " — " + command.description : "")
          );
        }
      }

      lines.push(String(menu.bottom || "┗━━━━━━━━━━━━◆"), "");
    }

    const ungrouped = commands.filter(command =>
      !command.hidden && !assigned.has(command.name)
    );

    if (ungrouped.length) {
      lines.push("𝙊𝙏𝙃𝙀𝙍");

      for (const command of ungrouped) {
        lines.push(String(menu.itemLine || "┃ ➤│ ") + prefix + command.name);
      }
    }
  }

  lines.push("⚡ 𝙋𝙊𝙒𝙀𝙍𝙀𝘿 𝘽𝙔 𝘽𝙀𝙉𝙁𝙀𝙄 𝙏𝙀𝘾𝙃");

  return lines.join("\n");
}
