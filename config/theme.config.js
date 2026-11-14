JavaScript

export default Object.freeze({
  botTitle: "⚡ 𝙁𝙀𝙄 𝙓𝙈𝘿 𝘽𝙊𝙏",
  menu: {
    top: "┏━━〔 ",
    titleEnd: " 〕━━◆",
    infoLine: "┃ ❖ ",
    itemLine: "┃ ➤│ ",
    blankLine: "┃",
    bottom: "┗━━━━━━━━━━━━◆"
  },
  sections: [
    { key: "General", title: "🏠 𝙂𝙀𝙉𝙀𝙍𝘼𝙇", categories: ["General"] },
    { key: "AI & Chat", title: "🧠 𝘼𝙄 𝘾𝙃𝘼𝙏", categories: ["AI & Chat"] },
    { key: "AI Media", title: "🎨 𝘼𝙄 𝙈𝙀𝘿𝙄𝘼", categories: ["AI Media"] },
    { key: "News Desk", title: "📰 𝙉𝙀𝙒𝙎 𝘿𝙀𝙎𝙆", categories: ["News"] },
    { key: "Group Tools", title: "👥 𝙂𝙍𝙊𝙐𝙋 𝙏𝙊𝙊𝙇𝙎", categories: ["Group"] },
    { key: "Downloads", title: "📥 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙎", categories: ["Downloads"] },
    {
      key: "Fun Games",
      title: "🎮 𝙁𝙐𝙉 𝙂𝘼𝙈𝙀𝙎",
      commandNames: ["calc", "poll", "coinflip", "dice", "8ball", "choose", "trivia", "riddle", "activity", "pokemon"]
    },
    {
      key: "Fun Mix",
      title: "🎉 𝙁𝙐𝙉 𝙈𝙄𝙓",
      categories: ["Fun"],
      excludeNames: ["pokemon"]
    },
    {
      key: "Anime Info",
      title: "🌸 𝘼𝙉𝙄𝙈𝙀 𝙄𝙉𝙁𝙊",
      categories: ["Anime Info", "Anime Rankings"]
    },
    {
      key: "Anime Art",
      title: "🖼 𝘼𝙉𝙄𝙈𝙀 𝘼𝙍𝙏",
      categories: ["Anime Random", "Anime Tools", "Anime Images"]
    },
    {
      key: "Anime GIFs",
      title: "🎞 𝘼𝙉𝙄𝙈𝙀 𝙂𝙄𝙁𝙎",
      commandNames: ["angry","baka","bleh","blowkiss","blush","bored","carry","clap","confused","cry","cuddle","dance","facepalm","feed","handhold","handshake","happy","highfive"]
    },
    {
      key: "Anime Reactions",
      title: "💞 𝘼𝙉𝙄𝙈𝙀 𝙍𝙀𝘼𝘾𝙏𝙄𝙊𝙉𝙎",
      commandNames: ["hug","kabedon","kiss","lappillow","laugh","lurk","nod","nom","nope","nya","pat","peck","poke","pout","run","salute","shake"]
    },
    {
      key: "Anime Moves",
      title: "⚡ 𝘼𝙉𝙄𝙈𝙀 𝙈𝙊𝙑𝙀𝙎",
      commandNames: ["shocked","shrug","sip","sleep","smile","smug","spin","stare","teehee","think","thumbsup","tickle","wag","wave","wink","yawn","yeet"]
    },
    { key: "Canvas Tools", title: "🖼 𝘾𝘼𝙉𝙑𝘼𝙎 𝙏𝙊𝙊𝙇𝙎", categories: ["Canvas"] },
    { key: "Media Tools", title: "🛠️ 𝙈𝙀𝘿𝙄𝘼 𝙏𝙊𝙊𝙇𝙎", categories: ["Media & Tools"] },
    { key: "Chat Privacy", title: "🔒 𝘾𝙃𝘼𝙏 𝙋𝙍𝙄𝙑𝘼𝘾𝙔", categories: ["Chat & Privacy"] },
    { key: "Status Tools", title: "📱 𝙎𝙏𝘼𝙏𝙐𝙎 𝙏𝙊𝙊𝙇𝙎", categories: ["Status"] },
    { key: "Owner Tools", title: "👑 𝙊𝙒𝙉𝙀𝙍 𝙏𝙊𝙊𝙇𝙎", categories: ["Owner"] }
  ]
});
