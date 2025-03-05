// List of occasions with date and messages
const occasions = {
  "01-01": "✨ Happy New Year 2025! ✨",
  "01-06": "🎉 ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦਾ ਗੁਰੂ ਪਰਵ 🙏",
  "01-14": "🌞 Makar Sankranti / Magha Bihu / Pongal / Hazarat Ali's Birthday! 🌾",
  "01-20": "✊ Martin Luther King Jr. Day! 🕊️",
  "01-26": "🇮🇳 Republic Day! 🎆",
  "02-02": "🎨 Basant Panchami / Sri Panchami! 🌼 / 🦫 Groundhog Day! 🕳️",
  "02-07": "🌹 Rose Day! 🌹",
  "02-08": "💍 Propose Day! 💌",
  "02-09": "🍫 Chocolate Day! 🍬",
  "02-10": "🧸 Teddy Day! 🐻",
  "02-11": "🤝 Promise Day! ✋",
  "02-12": "🎂 Guru Ravidas's Birthday! 🎉 / 🤗 Hug Day! 🤗",
  "02-13": "💋 Kiss Day! 😘",
  "02-14": "💖 Valentine's Day! 🌹",
  "02-17": "🇺🇸 Presidents' Day! 🗽",
  "02-19": "🗡️ Shivaji Jayanti! 🚩",
  "02-23": "📿 Swami Dayananda Saraswati Jayanti! 🙏",
  "02-26": "🙏 Maha Shivaratri! 🌙",
  "03-08": "🌸 International Women's Day! 👩‍👧‍👦",
  "03-13": "🔥 Holika Dahan! 🌟",
  "03-14": "🎨 Holi / Dolyatra! 🌈",
  "03-17": "🍀 St. Patrick's Day! ☘️",
  "03-20": "🌼 Spring Equinox! 🌷",
  "03-28": "☪️ Jamat-Ul-Vida! 🕌",
  "03-30": "🌸 Chaitra Sukladi / Gudi Padava / Ugadi / Cheti Chand! 🌼",
  "03-31": "☪️ Id-ul-Fitr (Eid)! 🌙",
  "04-01": "🎭 April Fool's Day! 🤡",
  "04-06": "🕉️ Ram Navami! 🙏",
  "04-10": "🙏 Mahavir Jayanti! 🌼",
  "04-13": "🌾 Vaisakhi / Vishu! 🎉",
  "04-14": "🎉 Meshadi (Tamil New Year)! 🌞",
  "04-15": "🎉 Vaisakhadi / Bahag Bihu! 🎊",
  "04-18": "✝️ Good Friday! ✨",
  "04-22": "🌍 Earth Day! 🌱",
  "05-01": "👷‍♂️ Labor Day! 👩‍🏭",
  "05-09": "🎂 Guru Rabindranath Tagore's Birthday! 📖",
  "05-11": "🌷 Mother's Day! 💐",
  "05-12": "☸️ Buddha Purnima! 🌸",
  "05-26": "🇺🇸 Memorial Day! 🌺",
  "06-07": "☪️ Id-ul-Zuha (Bakrid)! 🐐",
  "06-14": "🇺🇸 Flag Day! 🎌",
  "06-15": "👨‍👧‍👦 Father's Day! 🧡",
  "06-20": "☀️ Summer Solstice! 🌞",
  "06-27": "🛕 Rath Yatra! 🚩",
  "07-04": "🇺🇸 Independence Day (USA)! 🎇",
  "07-06": "☪️ Muharram! 🌙",
  "07-27": "👨‍👩‍👧‍👦 Parents' Day! 🏠",
  "08-09": "🎁 Raksha Bandhan! 🎀",
  "08-15": "🇮🇳 Independence Day! 🎆",
  "08-27": "🛕 Ganesh Chaturthi! 🌺",
  "09-01": "🇺🇸 Labor Day! 👷‍♂️",
  "09-05": "🎉 Milad-un-Nabi / Onam (Thiru Onam Day)! 🌾",
  "09-11": "🇺🇸 Patriot Day! 🕯️",
  "09-22": "🍁 Autumnal Equinox! 🍂",
  "10-02": "🕊️ Gandhi Jayanti & Dussehra (Maha Navami)! 🏹",
  "10-09": "🛡️ Leif Erikson Day! ⛵",
  "10-13": "🦅 Indigenous Peoples' Day! 🌎",
  "10-20": "🪔 Diwali (Deepavali)! 🎆",
  "10-22": "🏔️ Govardhan Puja! 🙏",
  "10-23": "🤝 Bhai Duj! 🎊",
  "10-31": "🎃 Halloween! 🕸️",
  "11-05": "🎉 ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਗੁਰੂ ਪਰਵ 🙏",
  "11-11": "🎖️ Veterans Day! 🇺🇸",
  "11-14": "👶 Children's Day (India) 🎉 / 🔬 World Diabetes Day 🌍",
  "11-27": "🦃 Thanksgiving Day! 🍁",
  "12-07": "🇺🇸 Pearl Harbor Remembrance Day! ⚓",
  "12-21": "❄️ Winter Solstice! ⛄",
  "12-24": "🎄 Christmas Eve! 🎁",
  "12-25": "🎅 Christmas! 🎄",
  "12-31": "🎉 New Year's Eve! 🍾"
};

// Get today's date
const today = new Date();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(today.getDate()).padStart(2, '0');
const dateKey = `${month}-${day}`;

// Check if today matches any occasion
const greetingMessage = occasions[dateKey] || "👋 Welcome to GroupChatOn – connect, share & enjoy! Have a great day!";

// Display the sparkling text greeting
const greetingDiv = document.getElementById("greetingDiv");
if (greetingDiv) {
  greetingDiv.innerHTML = `<p class="sparkling-text">${greetingMessage}</p>`;
}
