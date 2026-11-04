/* Quiz data for The Art of Gifting.
   Art forms and categories reflect what Me Meraki lists on memeraki.com.
   Edit this file to change recommendations; no build step needed. */
window.MM = (function () {
  var SHOP = "https://www.memeraki.com";

  var artforms = {
    madhubani: { name: "Madhubani", origin: "Mithila, Bihar", premium: false,
      line: "Fine double-line work where no corner is left empty. Fish, peacocks and lotuses for luck.",
      why: "It is the most 'wall-ready' folk style: bright, busy and instantly cheerful." },
    warli: { name: "Warli", origin: "Maharashtra", premium: false,
      line: "White figures on an earthy ground. Triangles, circles and dancers holding hands.",
      why: "Calm and graphic. It sits happily in a minimal flat without shouting." },
    gond: { name: "Gond", origin: "Madhya Pradesh", premium: false,
      line: "Trees and animals filled in with tiny dots and dashes, so the picture seems to hum.",
      why: "Playful and full of life. Good for people who love detail." },
    kalamkari: { name: "Kalamkari", origin: "Andhra Pradesh and Telangana", premium: false,
      line: "'Pen-work' drawn with a bamboo pen and natural dyes. Trees of life and epics.",
      why: "A storyteller's pick. Looks rich without being loud." },
    pichwai: { name: "Pichwai", origin: "Nathdwara, Rajasthan", premium: true,
      line: "Lotus ponds, cows and moonlit nights painted in dense, jewel-bright detail.",
      why: "Devotional, grand and made for a festive home." },
    phad: { name: "Phad", origin: "Rajasthan", premium: true,
      line: "Long scroll paintings that tell epic stories in one continuous frame.",
      why: "A conversation piece. Everyone asks what story is on the wall." },
    miniature: { name: "Miniature painting", origin: "Rajput and Mughal courts", premium: true,
      line: "Courtly scenes painted at palm size, with a brush that has a few hairs.",
      why: "Collector energy. Small, precious and quietly regal." },
    kalighat: { name: "Kalighat", origin: "Kolkata, West Bengal", premium: false,
      line: "Bold sweeping brush strokes. Born outside a temple, sharp-witted from the start.",
      why: "Cheeky and graphic. Great for friends with a sense of humour." },
    cheriyal: { name: "Cheriyal scroll", origin: "Telangana", premium: false,
      line: "Red-ground storytelling panels, painted like a comic strip for the village.",
      why: "Strong colour and narrative. A wall that has something to say." },
    ganjifa: { name: "Ganjifa cards", origin: "Odisha, Karnataka and Rajasthan", premium: false,
      line: "Hand-painted playing cards from Mughal-era card games, each one a tiny artwork.",
      why: "An art gift you can actually play with. Easy to post, easy to love." },
    tanjore: { name: "Tanjore", origin: "Thanjavur, Tamil Nadu", premium: true,
      line: "Gold foil, raised gesso and glass beads that catch the diya light.",
      why: "Made for Diwali. It glows when the lamps are lit." },
    papermache: { name: "Kashmir papier-mâché", origin: "Kashmir", premium: false,
      line: "Hand-painted floral patterns, often with gold, on boxes, bowls and ornaments.",
      why: "Festive, shelf-friendly and easy to gift to anyone." },
    lippan: { name: "Lippan kaam", origin: "Kutch, Gujarat", premium: false,
      line: "Clay relief with tiny mirrors. Whitewashed walls, but make it sparkle.",
      why: "Earthy texture with a little shine. Works in modern interiors." },
    terracotta: { name: "Terracotta", origin: "Across India", premium: false,
      line: "Fired clay, shaped and painted by hand. Warm, tactile and honest.",
      why: "Easy to place on a desk or shelf. Good for an office gift." }
  };

  var aesthetics = [
    { id: "bold", label: "Bold and colourful", hint: "More is more. Every wall needs a party.", forms: ["madhubani", "kalamkari", "gond"] },
    { id: "earthy", label: "Earthy and minimal", hint: "Clay, white lines and breathing space.", forms: ["warli", "lippan", "terracotta"] },
    { id: "regal", label: "Regal and heritage", hint: "Palace rooms, lotus ponds and old stories.", forms: ["pichwai", "miniature", "phad"] },
    { id: "quirky", label: "Quirky and witty", hint: "Characters, jokes and a story on every inch.", forms: ["kalighat", "cheriyal", "ganjifa"] },
    { id: "festive", label: "Festive and glowing", hint: "Gold, shimmer and diya light.", forms: ["tanjore", "papermache", "pichwai"] }
  ];

  var recipients = [
    { id: "parents", label: "Mummy, papa or grandparents", hint: "The ones who notice what is on the wall.", boost: ["pichwai", "tanjore", "phad", "miniature", "madhubani"],
      note: "For the wall you walk past every day. Happy Diwali." },
    { id: "friend", label: "A close friend", hint: "Someone who would frame a meme and a Madhubani.", boost: ["ganjifa", "kalighat", "gond", "warli"],
      note: "Because you deserve something nicer than another box of sweets. Happy Diwali." },
    { id: "partner", label: "My partner", hint: "A piece you will both see every morning.", boost: ["madhubani", "kalamkari", "miniature", "lippan"],
      note: "For our wall, our home and every Diwali after this one." },
    { id: "sibling", label: "A sibling or cousin", hint: "First flat, first wall. They need help.", boost: ["gond", "warli", "ganjifa", "kalighat"],
      note: "Your new place needs art. Consider this the start. Happy Diwali." },
    { id: "colleague", label: "A colleague or boss", hint: "Desk-sized, tasteful and never awkward.", boost: ["papermache", "terracotta", "warli", "ganjifa"],
      note: "A small piece of India's hand-painted heritage for your desk. Happy Diwali." },
    { id: "me", label: "Myself", hint: "Self-gifting is a Diwali tradition now.", boost: [],
      note: "From me, to me. Happy Diwali." }
  ];

  var budgets = [
    { id: "b1", label: "Under ₹2,000", hint: "A little something", penalty: { premium: 2.5 },
      format: "Small hand-painted pieces, Ganjifa cards, art kits or a Me Meraki gift card." },
    { id: "b2", label: "₹2,000 to ₹5,000", hint: "Thoughtful, not extravagant", penalty: { premium: 1.2 },
      format: "Decor plates, papier-mâché pieces and small framed artworks." },
    { id: "b3", label: "₹5,000 to ₹12,000", hint: "A proper wall piece", penalty: { premium: 0 },
      format: "A medium hand-painted artwork on paper or cloth, ready to hang." },
    { id: "b4", label: "₹12,000 and up", hint: "The one they will keep for life", penalty: { premium: 0 },
      format: "A statement original, or a commissioned piece made to order." }
  ];

  return { shop: SHOP, artforms: artforms, aesthetics: aesthetics, recipients: recipients, budgets: budgets };
})();
