
import { buildMenu } from "../lib/menu.js";

function formatDuration(seconds) {
  let remaining = Math.max(0, Math.floor(Number(seconds) || 0));
  const days = Math.floor(remaining / 86400);
  remaining %= 86400;
  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;
  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const parts = [];
  if (days) parts.push(days + "d");
  if (hours) parts.push(hours + "h");
  if (minutes) parts.push(minutes + "m");
  if (secs || !parts.length) parts.push(secs + "s");
  return parts.join(" ");
}

function messageTimestampMs(message) {
  const raw = message && message.messageTimestamp;
  const value = raw && typeof raw.toNumber === "function" ? raw.toNumber() : Number(raw);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value > 1000000000000 ? value : value * 1000;
}

function ownerNumber(config) {
  const owners = Array.isArray(config.ownerNumbers) ? config.ownerNumbers : [];
  return String(owners[0] || "").replace(/\D/g, "");
}

const commands = [
  {
    name: "menu",
    aliases: ["helpme"],
    category: "General",
    description: "Show the branded FEI XMD menu and available command sections.",
    run: async ctx => {
      const menu = buildMenu({ commands: ctx.commands, config: ctx.config, theme: ctx.theme });
      if (ctx.config.imageUrl) {
        try {
          await ctx.send({
            image: { url: ctx.config.imageUrl },
            caption: "⚡ *𝙁𝙀𝙄 𝙓𝙈𝘿 — 𝙒𝙃𝘼𝙏𝙎𝘼𝙋𝙋 𝘽𝙊𝙏 𝘽𝙔 𝘽𝙀𝙉𝙁𝙀𝙄 𝙏𝙀𝘾𝙃*\n" +
              "◆ 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝙥𝙖𝙞𝙧𝙞𝙣𝙜 𝙥𝙤𝙧𝙩𝙖𝙡: " + ctx.config.botUrl + "\n" +
              "⚡ 𝙋𝙊𝙒𝙀𝙍𝙀𝘿 𝘽𝙔 𝘽𝙀𝙉𝙁𝙀𝙄 𝙏𝙀𝘾𝙃"
          });
        } catch (error) {
          console.warn("FEI XMD menu artwork could not be sent; using the text menu:", error?.message || error);
        }
      }
      await ctx.reply(menu);
    }
  },
  {
    name: "help",
    category: "General",
    description: "List registered commands and their descriptions.",
    run: async ctx => {
      const rows = (ctx.commands || [])
        .filter(command => !command.hidden)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(command => ctx.config.prefix + command.name + (command.description ? " — " + command.description : ""));

      const header = "📚 𝙁𝙀𝙄 𝙓𝙈𝘿 𝙃𝙀𝙇𝙋\n" +
        "◆ " + rows.length + " 𝙍𝙀𝙂𝙄𝙎𝙏𝙀𝙍𝙀𝘿 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎\n\n";

      const chunks = [];
      let current = header;

      for (const row of rows) {
        if (current.length + row.length + 1 > 3300) {
          chunks.push(current.trimEnd());
          current = "📚 𝙁𝙀𝙄 𝙓𝙈𝘿 𝙃𝙀𝙇𝙋 (𝘾𝙊𝙉𝙏𝙄𝙉𝙐𝙀𝘿)\n\n";
        }
        current += "┃ ➤│ " + row + "\n";
      }

      if (current.trim()) chunks.push(current.trimEnd());
      for (const chunk of chunks) await ctx.reply(chunk);
    }
  },
  {
    name: "ping",
    category: "General",
    description: "Check bot responsiveness and estimated message response time.",
    run: async ctx => {
      const timestamp = messageTimestampMs(ctx.msg);
      const responseMs = timestamp === null ? null : Math.max(0, Date.now() - timestamp);

      await ctx.reply([
        "┏━━〔 🏓 𝙁𝙀𝙄 𝙓𝙈𝘿 · 𝙋𝙊𝙉𝙂 〕━━◆",
        "┃ ❖ 𝙎𝙩𝙖𝙩𝙪𝙨: " + (ctx.connectionOpen ? "𝙊𝙣𝙡𝙞𝙣𝙚 🟢" : "𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙣𝙜 🟡"),
        "┃ ❖ 𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: " + (responseMs === null ? "𝙐𝙣𝙖𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚" : responseMs + " ms"),
        "┃ ❖ 𝙐𝙥𝙩𝙞𝙢𝙚: " + formatDuration(process.uptime()),
        "┃ ❖ 𝙑𝙚𝙧𝙨𝙞𝙤𝙣: " + ctx.config.version,
        "┗━━━━━━━━━━━━━━━━━━━━━━◆"
      ].join("\n"));
    }
  },
  {
    name: "alive",
    aliases: ["uptime"],
    category: "General",
    description: "Show bot status, mode and uptime.",
    run: async ctx => {
      await ctx.reply(
        "✅ " + ctx.config.name + " 𝙞𝙨 " + (ctx.connectionOpen ? "𝙊𝙉𝙇𝙄𝙉𝙀." : "𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙄𝙉𝙂.") +
        "\n🔐 𝙈𝙤𝙙𝙚: " + String(ctx.mode || "public").toUpperCase() +
        "\n⏱️ 𝙐𝙥𝙩𝙞𝙢𝙚: " + formatDuration(process.uptime()) +
        "\n⚡ 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 " + ctx.config.ownerName
      );
    }
  },
  {
    name: "owner",
    category: "General",
    description: "Show Benfei Tech owner details.",
    run: async ctx => {
      const number = ownerNumber(ctx.config);
      await ctx.reply(
        "👑 𝙊𝙬𝙣𝙚𝙧: " + ctx.config.ownerName +
        (number ? "\n📱 𝙊𝙬𝙣𝙚𝙧 𝙉𝙪𝙢𝙗𝙚𝙧: +" + number : "")
      );
    }
  },
  {
    name: "support",
    category: "General",
    description: "Show support guidance for FEI XMD.",
    run: async ctx => {
      await ctx.reply(
        "🛟 " + ctx.config.name + " 𝙎𝙐𝙋𝙋𝙊𝙍𝙏\n" +
        "𝙁𝙤𝙧 𝙨𝙚𝙩𝙪𝙥 𝙝𝙚𝙡𝙥 𝙤𝙧 𝙗𝙪𝙜 𝙧𝙚𝙥𝙤𝙧𝙩𝙨, 𝙘𝙤𝙣𝙩𝙖𝙘𝙩 " +
        ctx.config.ownerName + ".\n\n" +
        "◆ 𝙂𝙞𝙩𝙃𝙪𝙗: https://github.com/Benfeitech/FEI-XMD"
      );
    }
  },
  {
    name: "time",
    category: "General",
    description: "Show the current server time in Nigeria.",
    run: async ctx => {
      const value = new Intl.DateTimeFormat("en-NG", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }).format(new Date());

      await ctx.reply("🕒 𝙉𝙞𝙜𝙚𝙧𝙞𝙖 𝙏𝙞𝙢𝙚: " + value);
    }
  },
  {
    name: "date",
    category: "General",
    description: "Show the current date in Nigeria.",
    run: async ctx => {
      const value = new Intl.DateTimeFormat("en-NG", {
        timeZone: "Africa/Lagos",
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(new Date());

      await ctx.reply("📅 𝘿𝙖𝙩𝙚 𝙞𝙣 𝙉𝙞𝙜𝙚𝙧𝙞𝙖: " + value);
    }
  },
  {
    name: "version",
    category: "General",
    description: "Show FEI XMD version and connection status.",
    run: async ctx => {
      await ctx.reply(
        "🤖 " + ctx.config.name + " v" + ctx.config.version +
        "\n🟢 𝙎𝙩𝙖𝙩𝙪𝙨: " + (ctx.connectionOpen ? "𝙊𝙣𝙡𝙞𝙣𝙚" : "𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙣𝙜") +
        "\n🔐 𝙈𝙤𝙙𝙚: " + String(ctx.mode || "public").toUpperCase() +
        "\n📦 𝘽𝙖𝙞𝙡𝙚𝙮𝙨: 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝙒𝙝𝙞𝙨𝙠𝙚𝙮𝙎𝙤𝙘𝙠𝙚𝙩𝙨 𝙉𝙋𝙈 𝙋𝙖𝙘𝙠𝙖𝙜𝙚"
      );
    }
  },
  {
    name: "jid",
    aliases: ["id"],
    category: "General",
    description: "Show the current chat and message sender IDs.",
    run: async ctx => {
      await ctx.reply(
        "💬 𝘾𝙝𝙖𝙩 𝙄𝘿: " + ctx.jid +
        "\n👤 𝙎𝙚𝙣𝙙𝙚𝙧 𝙄𝘿: " + (ctx.senderJid || "𝙐𝙣𝙖𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚")
      );
    }
  },
  {
    name: "whoami",
    category: "General",
    description: "Show your WhatsApp sender information.",
    run: async ctx => {
      await ctx.reply(
        "👤 𝙉𝙖𝙢𝙚: " + (ctx.msg?.pushName || "𝙐𝙣𝙠𝙣𝙤𝙬𝙣") +
        "\n🆔 𝙔𝙤𝙪𝙧 𝙄𝘿: " + (ctx.senderJid || "𝙐𝙣𝙖𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚") +
        "\n👑 𝙊𝙬𝙣𝙚𝙧: " + (ctx.owner ? "𝙔𝙚𝙨" : "𝙉𝙤")
      );
    }
  }
];

export default commands;
             
