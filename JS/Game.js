/*
 REMEMBER

 There is a system for irregular plurals.
 Under "nationalities" create an attribute named "plurals".
 There, create an attribute for the nationality of the irregular plural.
 For example...

 plurals: {Suiss: "Suiss"}
 ...or...
 plurals: {Alaman: "Alamani"}
 */
var decks = {
    doc_sedentary: [
        "Commander",
        "Commander",
        "Commander",
        "Commander",
        "Commander",

        "Merchant",
        "Merchant",
        "Merchant",
        "Merchant",
        "Merchant",

        "Queen",
        "Queen",
        "Queen",
        "Queen",
        "Queen",

        "Priest",
        "Priest",
        "Priest",
        "Priest",
        "Priest",

        "Raider",

        "Envoy",
        "Envoy",
        "Envoy",

        "Scribe",
        "Scribe",
        "Scribe",
        "Scribe",
        "Scribe",

        "Just king",
        "Just king",
        "Just king",

        "Builder",
        "Builder",
        "Builder",
        "Builder",
        "Builder",

        "Builder king",

        "Farmer",
        "Farmer",
        "Farmer",
        "Farmer",
        "Farmer",

        "Peaceful king",
        "Peaceful king",
        "Peaceful king",
        "Peaceful king",
        "Peaceful king",

        "Expansionist king",
        "Expansionist king",
        "Expansionist king",

         "Vengeful king"
    ],
    doc_nomadic: [
        "Commander",
        "Commander",
        "Commander",
        "Commander",
        "Commander",

        "Merchant",
        "Merchant",
        "Merchant",
        "Merchant",
        "Merchant",

        "Queen",
        "Queen",
        "Queen",
        "Queen",
        "Queen",

        "Priest",
        "Priest",
        "Priest",
        "Priest",
        "Priest",

        "Raider",
        "Raider",
        "Raider",
        "Raider",
        "Raider",

        "Envoy",
        "Envoy",
        "Envoy",

        "Storyteller",
        "Storyteller",
        "Storyteller",
        "Storyteller",
        "Storyteller",

        "Builder king",

        "Peaceful king",
        "Peaceful king",
        "Peaceful king",
        "Peaceful king",
        "Peaceful king",

        "Expansionist king",
        "Expansionist king",
        "Expansionist king",

        "Just king",

        "Explorer",
        "Explorer",
        "Explorer",
        "Explorer",
        "Explorer",

        "Migrant",
        "Migrant",
        "Migrant",
        "Migrant",
        "Migrant",

        "Migrant king",

        "Conqueror",
        "Conqueror",
        "Conqueror",
        "Conqueror",
        "Conqueror",

        "Great conqueror",

        "Hunter",
        "Hunter",
        "Hunter",

        "Guerrilla commander",

        "Vengeful king"
    ],
    aok: [
        "Commander",
        "Commander",
        "Commander",
        "Commander",
        "Commander",

        "Merchant",
        "Merchant",
        "Merchant",
        "Merchant",
        "Merchant",

        "Queen",
        "Queen",
        "Queen",
        "Queen",
        "Queen",

        "Priest",
        "Priest",
        "Priest",
        "Priest",
        "Priest",

        "Raider",
        "Raider",
        "Raider",
        "Raider",
        "Raider",

        "Envoy",
        "Envoy",
        "Envoy",

        "Scribe",
        "Scribe",
        "Scribe",
        "Scribe",
        "Scribe",

        "Just king",
        "Just king",
        "Just king",

        "Builder",
        "Builder",
        "Builder",
        "Builder",
        "Builder",

        "Builder king",

        "Farmer",
        "Farmer",
        "Farmer",
        "Farmer",
        "Farmer",

        "Peaceful king",
        "Peaceful king",
        "Peaceful king",
        "Peaceful king",
        "Peaceful king",

        "Expansionist king",
        "Expansionist king",
        "Expansionist king",
        "Expansionist king",
        "Expansionist king",

        "Conqueror",
        "Conqueror",
        "Conqueror",
        "Conqueror",
        "Conqueror",

        "Great conqueror",

        "Guerrilla commander",

        "Militia commander",

        "Strategist",

        "Priest-king",

        "Spy",

        "Vengeful king"
    ],
    da: [
        "Commander",
        "Commander",
        "Commander",
        "Commander",
        "Commander",

        "Merchant",
        "Merchant",
        "Merchant",
        "Merchant",
        "Merchant",

        "Queen",
        "Queen",
        "Queen",
        "Queen",
        "Queen",

        "Priest",
        "Priest",
        "Priest",
        "Priest",
        "Priest",

        "Raider",
        "Raider",
        "Raider",
        "Raider",
        "Raider",

        "Envoy",
        "Envoy",
        "Envoy",

        "Scribe",
        "Scribe",
        "Scribe",
        "Scribe",
        "Scribe",

        "Just king",
        "Just king",
        "Just king",

        "Builder",
        "Builder",
        "Builder",
        "Builder",
        "Builder",

        "Builder king",

        "Farmer",
        "Farmer",
        "Farmer",
        "Farmer",
        "Farmer",

        "Peaceful king",
        "Peaceful king",
        "Peaceful king",
        "Peaceful king",
        "Peaceful king",

        "Expansionist king",
        "Expansionist king",
        "Expansionist king",
        "Expansionist king",
        "Expansionist king",

        "Conqueror",
        "Conqueror",
        "Conqueror",
        "Conqueror",
        "Conqueror",

        "Great conqueror",

        "Guerrilla commander",

        "Militia commander",

        "Strategist",

        "Priest-king",

        "Spy",

        "Vengeful king",

        "Bandit",
        "Earthquake",
        "Pessimist",
        "Rebel",
        "Retired bandit",
        "Optimist",
        "Demoralized rebel"
    ]
    };
    var players = {
    egypt: {
        nation: {doc: "Old Kingdom Egypt", aok: "New Kingdom Egypt", da: "Lybia"},
        nationality: {doc: "Egyptian", aok: "Egyptian", da: "Egyptian"},

        doc_deck: decks.doc_sedentary.concat([
            "Pyramid-building Pharao",
            "Pyramid-building Pharao",
            "Pyramid-building Pharao",
            "Pyramid-building Pharao",
            "Pyramid-building Pharao",

            "Infrastructure-building Pharao",
            "Infrastructure-building Pharao",
            "Infrastructure-building Pharao",
            "Infrastructure-building Pharao",
            "Infrastructure-building Pharao",

            "Pepi II Neferkare",
            "Imhotep",
            "Hamiunu"
        ]),

        aok_deck: decks.aok.concat([
            "Habiru",
            "Loyal vassal",
            "Ahmose I",
            "Hatshepsut",
            "Thuthmose III",
            "Amenhotep III",
            "Nefertiti",
            "Seti I",
            "Ramses I",
            "Ramses II",
            "Ramses III"
        ]),

        da_deck: decks.da.concat([])
    },
    nubia: {
        nation: {doc: "Ta-Seti", aok: "Kerma", da: "Kush"},
        nationality: {doc: "Nubian", aok: "Kerman", da: "Kushite"},

        doc_deck: decks.doc_nomadic.concat([
            "Archer king",
            "Archer king",
            "Archer king",
            "Archer king",
            "Archer king"
        ]),
        aok_deck: decks.aok.concat([
            "Kaa",
            "Teriahi",
            "Awawa",
            "Utereses"
        ]),

        da_deck: decks.da.concat([])
    },
    mesopotamia: {
        nation: {doc: "Sumer", aok: "Akkad", da: "Assyria"},
        nationality: {doc: "Sumerian", aok: "Akkadian", da: "Assyrian"},

        doc_deck: decks.doc_sedentary.concat([
            "Ea-Nasir",
            "Urukagina of Lagash",
            "Messanepada"
        ]),

        aok_deck: decks.aok.concat([
            "Sargon I",
            "Enheduanna",
            "Naram-Sim"
        ]),

        da_deck: decks.da.concat([])
    },
    lebanon_magreb: {
        nation: {doc: "Byblos", aok: "Sidon", da: "Tyre"},
        nationality: {doc: "Byblian", aok: "Sidonian", da: "Tyrian"},

        doc_deck: decks.doc_sedentary.concat([]),

        aok_deck: decks.aok.concat([
            "Zimredda",
            "Abdi-Milkuti",
            "Eshmunazar I",
             "Eshmunazar II"
        ]),

        da_deck: decks.da.concat([])
    },
    coastal_syria: {
        nation: {doc: "Ebla", aok: "Ugarit", da: "Hamath"},
        nationality: {doc: "Eblaite", aok: "Ugaritic", da: "Hamathite"},

        doc_deck: decks.doc_sedentary.concat([]),

        aok_deck: decks.aok.concat([
            "Ammurapi",
            "Ilimilku of Shuban"
        ]),

        da_deck: decks.da.concat([])
    },
    anatolia: {
        nation: {doc: "Hattians", aok: "Hittites", da: "Phrygia"},
        nationality: {doc: "Hattian", aok: "Hittite", da: "Phrygian"},

        doc_deck: decks.doc_sedentary.concat([]),

        aok_deck: decks.aok.concat([]),

        da_deck: decks.da.concat([])
    }
};
