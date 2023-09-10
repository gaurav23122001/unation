// src/background.ts

// Import the JSON data
import jsonData from "./const.json";

// Declare the `chrome` object to make TypeScript recognize it
declare const chrome: any;
declare const document: any;

const keywords = [
    "a55",
    "a55hole",
    "aeolus",
    "ahole",
    "anal",
    "analprobe",
    "anilingus",
    "areola",
    "areole",
    "arian",
    "aryan",
    "ass",
    "assbang",
    "assbanged",
    "assbangs",
    "asses",
    "assfuck",
    "assfucker",
    "assh0le",
    "asshat",
    "assho1e",
    "asshole",
    "assholes",
    "assmaster",
    "assmunch",
    "asswipe",
    "asswipes",
    "azazel",
    "azz",
    "b1tch",
    "ballsack",
    "bang",
    "banger",
    "barf",
    "bastard",
    "bastards",
    "bawdy",
    "beaner",
    "beardedclam",
    "beastiality",
    "beatch",
    "beater",
    "beaver",
    "beer",
    "beeyotch",
    "beotch",
    "biatch",
    "bigtits",
    "big tits",
    "bimbo",
    "bitch",
    "bitched",
    "bitches",
    "bitchy",
    "blow job",
    "blow",
    "blowjob",
    "blowjobs",
    "bod",
    "bodily",
    "boink",
    "bollock",
    "bollocks",
    "bollok",
    "bone",
    "boned",
    "boner",
    "boners",
    "bong",
    "boob",
    "boobies",
    "boobs",
    "booby",
    "booger",
    "bookie",
    "bootee",
    "bootie",
    "booty",
    "booze",
    "boozer",
    "boozy",
    "bosom",
    "bosomy",
    "brassiere",
    "breast",
    "breasts",
    "bugger",
    "bukkake",
    "bullturds",
    "bung",
    "busty",
    "butt fuck",
    "buttfuck",
    "buttfucker",
    "buttfucker",
    "buttplug",
    " c.0.c.k",
    "c.o.c.k.",
    "c.u.n.t",
    "c0ck",
    "c-0-c-k",
    "caca",
    "cahone",
    "cameltoe",
    "carpetmuncher",
    "cawk",
    "cervix",
    "chinc",
    "chincs",
    "chink",
    "chink",
    "chode",
    "chodes",
    "cl1t",
    "clit",
    "clits",
    "clitty",
    "cocain",
    "cocaine",
    "cock",
    "c-o-c-k",
    "cockblock",
    "cockholster",
    "cockknocker",
    "cocks",
    "cocksmoker",
    "cocksucker",
    "cock sucker",
    "coital",
    "commie",
    "coon",
    "coons",
    "corksucker",
    "crabs",
    "crack",
    "cracker",
    "crackwhore",
    "crap",
    "crappy",
    "cum",
    "cummin",
    "cumming",
    "cumshot",
    "cumshots",
    "cumslut",
    "cumstain",
    "cunilingus",
    "cunnilingus",
    "cunny",
    "cunt",
    "c-u-n-t",
    "cuntface",
    "cunthunter",
    "cuntlick",
    "cuntlicker",
    "cunts",
    "d0ng",
    "d0uch3",
    "d0uche",
    "d1ck",
    "d1ld0",
    "d1ldo",
    "dago",
    "dagos",
    "dawgie-style",
    "dick",
    "dickbag",
    "dickdipper",
    "dickface",
    "dickflipper",
    "dickhead",
    "dickheads",
    "dickish",
    "dick-ish",
    "dickripper",
    "dicksipper",
    "dickweed",
    "dickwhipper",
    "dickzipper",
    "diddle",
    "dike",
    "dildo",
    "dildos",
    "diligaf",
    "dillweed",
    "dimwit",
    "dingle",
    "dipship",
    "doggie-style",
    "doggy-style",
    "dong",
    "doofus",
    "doosh",
    "dopey",
    "douch3",
    "douche",
    "douchebag",
    "douchebags",
    "douchey",
    "drunk",
    "dumass",
    "dumbass",
    "dumbasses",
    "dummy",
    "dyke",
    "dykes",
    "enlargement",
    "erect",
    "erection",
    "erotic",
    "essohbee",
    "extacy",
    "extasy",
    "f.u.c.k",
    "fack",
    "fag",
    "fagg",
    "fagged",
    "faggit",
    "faggot",
    "fagot",
    "fags",
    "faig",
    "faigt",
    "fannybandit",
    "fart",
    "fartknocker",
    "fat",
    "felch",
    "felcher",
    "felching",
    "fellate",
    "fellatio",
    "feltch",
    "feltcher",
    "fisted",
    "fisting",
    "fisty",
    "floozy",
    "foad",
    "fondle",
    "foobar",
    "foreskin",
    "freex",
    "frigg",
    "frigga",
    "fubar",
    "f-u-c-k",
    "fuckass",
    "fucked",
    "fucked",
    "fucker",
    "fuckface",
    "fuckin",
    "fucking",
    "fucknugget",
    "fucknut",
    "fuckoff",
    "fucks",
    "fucktard",
    "fuck-tard",
    "fuckup",
    "fuckwad",
    "fuckwit",
    "fudgepacker",
    "fuk",
    "fvck",
    "fxck",
    "gae",
    "gai",
    "ganja",
    "gay",
    "gays",
    "gey",
    "gfy",
    "ghay",
    "ghey",
    "gigolo",
    "glans",
    "goatse",
    "godamn",
    "godamnit",
    "goddam",
    "goddammit",
    "goddamn",
    "goldenshower",
    "gonad",
    "gonads",
    "gook",
    "gooks",
    "gringo",
    "gspot",
    "g-spot",
    "gtfo",
    "guido",
    "h0m0",
    "h0mo",
    "handjob",
    "hard on",
    "he11",
    "hebe",
    "heeb",
    "hell",
    "hemp",
    "heroin",
    "herp",
    "herpes",
    "herpy",
    "hitler",
    "hiv",
    "hobag",
    "hom0",
    "homey",
    "homo",
    "homoey",
    "honky",
    "hooch",
    "hookah",
    "hooker",
    "hoor",
    "hootch",
    "hooter",
    "hooters",
    "horny",
    "hump",
    "humped",
    "humping",
    "hussy",
    "hymen",
    "inbred",
    "incest",
    "injun",
    "j3rk0ff",
    "jackass",
    "jackhole",
    "jackoff",
    "jap",
    "japs",
    "jerk",
    "jerk0ff",
    "jerked",
    "jerkoff",
    "jism",
    "jiz",
    "jizm",
    "jizz",
    "jizzed",
    "junkie",
    "junky",
    "kike",
    "kikes",
    "kill",
    "kinky",
    "kkk",
    "klan",
    "knobend",
    "kooch",
    "kooches",
    "kootch",
    "kraut",
    "kyke",
    "labia",
    "lech",
    "leper",
    "lesbians",
    "lesbo",
    "lesbos",
    "lez",
    "lezbian",
    "lezbians",
    "lezbo",
    "lezbos",
    "lezzie",
    "lezzies",
    "lezzy",
    "lmao",
    "lmfao",
    "loin",
    "loins",
    "lusty",
    "mams",
    "massa",
    "maxi",
    "menses",
    "menstruate",
    "menstruation",
    "meth",
    "m-fucking",
    "mofo",
    "molest",
    "moolie",
    "moron",
    "motherfucka",
    "motherfucker",
    "motherfucking",
    "mtherfucker",
    "mthrfucker",
    "mthrfucking",
    "muff",
    "muffdiver",
    "murder",
    "muthafuckaz",
    "muthafucker",
    "mutherfucker",
    "mutherfucking",
    "muthrfucking",
    "nad",
    "nads",
    "naked",
    "napalm",
    "nappy",
    "niglet",
    "nimrod",
    "ninny",
    "nipple",
    "nooky",
    "nude",
    "nympho",
    "opiate",
    "opium",
    "oral",
    "orally",
    "organ",
    "orgasm",
    "orgasmic",
    "orgies",
    "orgy",
    "ovary",
    "ovum",
    "ovums",
    "p.u.s.s.y.",
    "paddy",
    "paki",
    "pantie",
    "panties",
    "panty",
    "pastie",
    "pasty",
    "pcp",
    "pecker",
    "pedo",
    "pedophile",
    "pedophilia",
    "pedophiliac",
    "pee",
    "peepee",
    "penetrate",
    "penetration",
    "penial",
    "penile",
    "perversion",
    "peyote",
    "phalli",
    "phallic",
    "phuck",
    "pillowbiter",
    "pimp",
    "pinko",
    "piss",
    "pissed",
    "pissoff",
    "piss-off",
    "pms",
    "polack",
    "pollock",
    "poon",
    "poontang",
    "porn",
    "porno",
    "pornography",
    "pot",
    "potty",
    "prick",
    "prig",
    "prostitute",
    "prude",
    "pube",
    "pubic",
    "pubis",
    "punkass",
    "punky",
    "puss",
    "pussies",
    "pussy",
    "pussypounder",
    "puto",
    "queaf",
    "queef",
    "queef",
    "queer",
    "queero",
    "queers",
    "quicky",
    "quim",
    "racy",
    "rape",
    "raped",
    "raper",
    "rapist",
    "raunch",
    "rectal",
    "rectum",
    "rectus",
    "reefer",
    "reetard",
    "reich",
    "retard",
    "retarded",
    "revue",
    "rimjob",
    "ritard",
    "rtard",
    "r-tard",
    "rum",
    "rump",
    "rumprammer",
    "ruski",
    "s.h.i.t.",
    " s.o.b.",
    "s0b",
    "sadism",
    "sadist",
    "scag",
    "scantily",
    "schizo",
    "schlong",
    "screw",
    "screwed",
    "scrog",
    "scrot",
    "scrote",
    "scrotum",
    "scrud",
    "scum",
    "seaman",
    "seamen",
    "seduce",
    "sexual",
    "sh1t",
    "s-h-1-t",
    "shamedame",
    "shiteater",
    "shithole",
    "shithouse",
    "shitt",
    "shitted",
    "shitter",
    "shitty",
    "shiz",
    "sissy",
    "skag",
    "skank",
    "slave",
    "sleaze",
    "sleazy",
    "slut",
    "slutdumper",
    "slutkiss",
    "sluts",
    "smegma",
    "smut",
    "smutty",
    "snatch",
    "sniper",
    "snuff",
    "s-o-b",
    "sodom",
    "souse",
    "soused",
    "sperm",
    "spic",
    "spick",
    "spik",
    "spiks",
    "spooge",
    "spunk",
    "steamy",
    "stfu",
    "stiffy",
    "stoned",
    "strip",
    "stroke",
    "stupid",
    "suck",
    "sucked",
    "sucking",
    "sumofabiatch",
    "t1t",
    "tampon",
    "tard",
    "tawdry",
    "teabagging",
    "teat",
    "terd",
    "teste",
    "testee",
    "sissy",
    "testes",
    "testicle",
    "testis",
    "thrust",
    "thug",
    "tinkle",
    "tit",
    "titfuck",
    "titi",
    "tits",
    "tittiefucker",
    "titties",
    "titty",
    "tittyfuck",
    "tittyfucker",
    "toke",
    "toots",
    "tramp",
    "transsexual",
    "trashy",
    "tubgirl",
    "turd",
    "tush",
    "twat",
    "twats",
    "unwed",
    "urinal",
    "urine",
    "uterus",
    "uzi",
    "vag",
    "vagina",
    "valium",
    "viagra",
    "virgin",
    "vixen",
    "vodka",
    "vomit",
    "voyeur",
    "vulgar",
    "vulva",
    "wad",
    "wang",
    "wank",
    "wanker",
    "wazoo",
    "wedgie",
    "weed",
    "weenie",
    "weewee",
    "weiner",
    "weirdo",
    "wench",
    "wetback",
    "wh0re",
    "wh0reface",
    "whitey",
    "whiz",
    "whoralicious",
    "whore",
    "whorealicious",
    "whored",
    "whoreface",
    "whorehopper",
    "whorehouse",
    "whores",
    "whoring",
    "wigger",
    "womb",
    "woody",
    "wop",
    "x-rated",
    "xxx",
    "yeasty",
    "yobbo",
    "zoophile",
    "pervy",
];

const urls = [
    "https://www.xvideos.com/",
    "https://www.pornhub.com/",
    "https://www.xnxx.com/",
    "https://beeg.com/",
    "https://www.pornhd.com/",
    "https://xhamster.com/",
    "https://hqporner.com/",
    "https://www.eporner.com/",
    "https://sxyprn.com/",
    "https://spankbang.com/",
    "https://www.youjizz.com/",
    "https://daft.sex/",
    "https://yespornplease.com/",
    "https://www.porntrex.com/",
    "https://pornone.com/",
    "https://www.youporn.com/",
    "https://www.redtube.com/",
    "https://motherless.com/",
    "https://www.gotporn.com/",
    "https://www.pornktube.porn/",
    "http://ww1.veporn.io/",
    "https://www.porn.com/",
    "https://www.tube8.com/",
    "https://www.3movs.com/",
    "https://www.porntube.com/?cid=2930",
    "https://www.4tube.com/",
    "https://www.tubxporn.com/",
    "https://www.porngo.com/",
    "https://txxx.com/?promo=10718",
    "https://www.cumlouder.com/?nats=NDU5MC4xLjEyLjQyLjAuMC4wLjAuMA",
    "https://xfantasy.tv/",
    "https://www.porndig.com/",
    "https://www.tnaflix.com/",
    "https://porndoe.com/?utm_campaign=theporndude&utm_medium=trafficbuy&utm_source=theporndude",
    "https://en8.pornhd8k.net/",
    "https://porn4days.biz/",
    "https://www.porndish.com/",
    "https://veporn.com/",
    "https://en.luxuretv.com/",
    "http://www.perfectgirls.net/",
    "https://www.porn300.com/",
    "https://anysex.com/?promoid=13992423034350",
    "https://xmoviesforyou.com/",
    "https://netfapx.com/",
    "http://ww7.waxtube.com/",
    "https://www.drtuber.com/",
    "https://www.likuoo.video/",
    "https://pornobae.com/",
    "https://xxxstreams.org/",
    "https://letsjerk.to/",
    "http://www.joysporn.com/",
    "https://www.pornky.com/",
    "http://www.rushporn.com/",
    "http://www.porn00.org/",
    "https://anyporn.com/",
    "http://ww7.freeomovie.com/",
    "http://plusone8.com/",
    "https://vqtube.com/",
    "https://pervertslut.com/",
    "http://ww1.hdpornstarz.com/",
    "https://xtapes.to/",
    "https://www.cliphunter.com/",
    "https://tv.fakings.com/?af=GC1984ppt&ref=indextv&utm_source=GC1984ppt&utm_medium=directlink&utm_campaig=ppt",
    "https://fullxxxmovies.net/",
    "https://pornovideoshub.com/",
    "https://www.xopenload.video/",
    "https://www.slutload.com/",
    "https://taxi69.com/",
    "https://www.empflix.com/",
    "https://vrporn.com/?a=491827",
    "https://www.x18.xxx/",
    "https://www.nonktube.com/",
    "https://0dayporn.com/",
    "https://swingerpornfun.com/",
    "https://www.casting-porno-tube.com/",
    "https://justswallows.com/",
    "https://www.fux.com/",
    "https://landing.rk.com/?ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjoyMCwicyI6MzU4LCJlIjo3NzE0LCJwIjoyfQ&ad_id=176_rev",
    "https://landing.brazzersnetwork.com/?ad_id=176_rev&ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjoxNCwicyI6OTAsImUiOjg4MDMsInAiOjJ9",
    "https://www.adulttime.com/",
    "https://landing.teenslovehugecocks.com/?ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjoyMCwicyI6Mzk1LCJlIjo3NzI0LCJwIjoyfQ",
    "https://www.adulttime.com/",
    "https://landing.teenslovehugecocks.com/?ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjoyMCwicyI6Mzk1LCJlIjo3NzI0LCJwIjoyfQ",
    "https://landing.mofosnetwork.com/?ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjoxNSwicyI6MTc2LCJlIjo5MzcsInAiOjJ9&ad_id=176_rev",
    "https://www.digitalplaygroundnetwork.com/?ats=eyJhIjoxNzYsImMiOjU4NDYzODAyLCJuIjoxNywicyI6NTM2LCJlIjo4ODQ0LCJwIjoyfQ==",
    "https://landing.babesnetwork.com/?ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjoxNiwicyI6MTY2LCJlIjoxMjUzLCJwIjoyfQ&ad_id=176_rev",
    "https://www.bangbrosnetwork.com/home?cmp=exo_popusa_generalonly_at164v1&aid=gc1984&ppi=one&pp=k&prg=pps&adid=at164v1&theme=gc1984&co&ad1=feed164_mp4:2&ad2=c164:3&ad3=feed140_mp4:4&ad4=feed117_mp4:12&ad5=c117:11&ad6=feed120_mp4:22&ad7=c120:17&ad8=feed107_mp4:32&&ad9=c107:31&co",
    "https://goporndude.com/naughtyamerica",
    "https://www.familystrokes.com/porndude?nats=GC1984.2.72.5782.0.0.0.0.0",
    "https://landing.twistysnetwork.com/?ats=eyJhIjoxNzYsImMiOjQ3MjcyNzQyLCJuIjoyLCJzIjozMCwiZSI6MTIxLCJwIjoyfQ&ad_id=176_rev",
    "https://landing.fakehub.com/?ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjozMCwicyI6MjYxLCJlIjoxMTc0LCJwIjoyfQ=&cont=fh_rs_theporndude",
    "https://www.realitykings.com/scenes?site=45&ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjoyMCwicyI6NTk2LCJlIjo5NDEwLCJwIjoyfQ==",
    "https://www.vixen.com/tube2?nats=MzI3LjIuOC4yNS4wLjAuMC4wLjA",
    "https://www.exxxtrasmall.com/PornDude?nats=GC1984.2.35.5372.0.0.0.0.0",
    "https://www.videobox.com/?pid=GC",
    "https://www.teamskeet.com/PornDude?nats=GC1984.2.15.5352.0.0.0.0.0",
    "https://www.blacked.com/tube2?nats=MzI3LjIuMy4yNy4wLjAuMC4wLjA",
    "https://czechav.com/?nats=MTc0Mi4xLjYuNy4wLjAuMC4wLjA",
    "https://nubilefilms.com/tube/featured?coupon=13406",
    "https://www.evilangel.com/?utm_source=250584&utm_medium=affiliate&utm_campaign=",
    "https://passion-hd.com/?stan=ST12y624ahCQikh8curS8c7eTRVq&code=MzgzNjg6MjoxMzQ",
    "https://tiny4k.com/?stan=ST12y61WmYQnjDqtskBFAwhk7ihA&code=MzE2OTk6MjoxNDQ",
    "https://www.dogfartnetwork.com/en/join?utm_source=280590&utm_medium=affiliate&utm_campaign=",
    "https://www.julesjordan.com/trial/?nats=GC1984.3.3.6.0.0.0.0.0",
    "https://goporndude.com/letsdoeit",
    "https://www.mylf.com/PornDude?nats=GC1984.3.1.98.0.0.0.0.0",
    "https://www.analvids.com/recommended?aff=UBJGFRA8UU___",
    "https://newsensations.com/tour_ns/?nats=MTMwNzA4LjEuMi4zLjAuMC4wLjAuMA",
    "https://www.devilsfilm.com/?utm_source=250584&utm_medium=affiliate&utm_campaign=",
    "https://www.21naturals.com/?utm_source=250584&utm_medium=affiliate&utm_campaign=",
    "https://www.hardx.com/?utm_source=270532&utm_medium=affiliate&utm_campaign=",
    "https://www.bang.com/?aff=eyJ3IjoiMTE2NDkiLCJsIjoiMjcyNTQifQ==",
    "https://tour1.21sextury.com/?utm_source=250584&utm_medium=affiliate&utm_campaign=",
    "https://www.ftvgirls.com/models.html",
    "https://www.clubsweethearts.com/",
    "https://www.burningangel.com/?utm_source=250584&utm_medium=affiliate&utm_campaign=",
    "https://goporndude.com/hustler",
    "http://www.x-art.com/",
    "https://www.realitykings.com/scenes?site=336&ats=eyJhIjoxNzYsImMiOjQ1ODU2NDY0LCJuIjo2OCwicyI6NTcxLCJlIjo5MzE2LCJwIjoyfQ==&ad_id=176_rev",
    "https://pornworld.com/new-videos?aff=UBJGFRA8UU___",
    "https://www.realitykings.com/scenes?site=364&ad_id=176_PD&ats=eyJhIjoxNzYsImMiOjMxMzMzLCJuIjo2NiwicyI6NTY4LCJlIjo5MTEwLCJwIjoyfQ==",
    "https://www.metart.com/?AFTC=187.MA.1.2.5.0.0&utm_source=affiliate&utm_medium=access&utm_campaign=187.MA.1.2.5.0.0",
    "https://www.wicked.com/?utm_source=250584&utm_medium=affiliate&utm_campaign=",
    "https://www.stasyq.com/?reseller_id=9804000000045047",
    "https://pornprosnetwork.com/?stan=ST12y624ahCQikh8curS8c7eTRVq&code=MzgzNjg6MjoxMA",
    "https://goporndude.com/fuckingawesome",
    "https://www.hotmovies.com/?vod=236212",
    "https://www.spizoo.com/?nats=MTExNi4yLjEyLjI4LjAuMC4wLjAuMA",
];

// Handle the initial setup when the extension is installed
chrome.runtime.onInstalled.addListener((details:any) => {
    // Set the predefined data (array of JSON objects) to Chrome Extension storage
    chrome.storage.sync.set({ siteData: jsonData });
});

chrome.runtime.setUninstallURL("https://unplugnation.org/uninstall");


//---------------------------------------get data from local storage---------------------------------------
function getSyncData(key: string) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(key, (data: any) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data);
            }
        });
    });
}

//---------------------------------------store data to local storage---------------------------------------
chrome.runtime.onMessage.addListener(
    async (message: any, sender: any, sendResponse: any) => {
        if (message.action === "storeData") {
            chrome.storage.sync.set({ siteData: message.data.siteData });
            sendResponse({ success: true });
        }
    }
);
// ---------------------------------------redirect tabs---------------------------------------

const checkFBURL = (url: string)=>{

    const pattern = /^https:\/\/.*www\.facebook\.com\/.*/;

    if (pattern.test(url)) {
        return true;
    }
    return false;
}
const checkRedditURL = (url: string)=>{

    const pattern = /^https:\/\/.*www\.reddit\.com\/.*/;

    if (pattern.test(url)) {
        return true;
    }
    return false;
}
const checkYtURL = (url: string)=>{

    const pattern = /^https:\/\/.*www\.youtube\.com\/.*/;

    if (pattern.test(url)) {
        return true;
    }
    return false;
}

const checkTwitterURL = (url: string)=>{
    const pattern = /^https:\/\/(.*\.)?twitter\.com\/.*$/;
    if (pattern.test(url)) {
        return true;
    }
    return false;
}


const checkAndRedirectReddit = async (tab: chrome.tabs.Tab) => {
    const url: any = tab.url

    let siteData: any;
    await getSyncData("siteData").then((resp: any) => {
        siteData = resp.siteData;
    });
    const settings = siteData[5].settings;
    const redirectionUrl = siteData[5].settings["custom-url"];

    if ((settings["focus-mode"].active && !isTimeInRange(settings["focus-mode"].from, settings["focus-mode"].to)) || !settings["focus-mode"].active) {
        if (!settings.disable && !settings["disable-10"].value && !settings.disableHours.active) {
            if (!url.includes("unplugnation.org") && !url.includes(redirectionUrl)) {
                const redditAll = siteData[2].settings["r/all"];
                const redditPop = siteData[2].settings["r/popular"];
                const redditAf = siteData[2].settings["r/af"];
                const explicitKey = siteData[4].settings.keyword;
                const explicitBlock = siteData[4].settings.block;
                if (redditAll && url=="https://www.reddit.com/r/all/") {
                    chrome.tabs.update(tab.id!, { url: `https://www.reddit.com/` });
                }
                if (redditPop && url=="https://www.reddit.com/r/popular/") {
                    chrome.tabs.update(tab.id!, { url: `https://www.reddit.com/` });
                }
                if (
                    redditAf &&
                    url=="https://www.reddit.com/r/interestingasfuck/"
                ) {
                    chrome.tabs.update(tab.id!, { url: `https://www.reddit.com/` });
                }
                if (explicitKey && checkKeywordInURL(url)) {
                    chrome.tabs.update(tab.id!, { url: `${redirectionUrl}` });
                }
                if (explicitBlock && checkForURL(url)) {
                    chrome.tabs.update(tab.id!, { url: `${redirectionUrl}` });
                }
            }
        }
    }
}

chrome.tabs.onUpdated.addListener((tabId: any, changeInfo: any, tab: any) => {
    if (changeInfo.status == "loading") {
        checkAndHideData(tab);
        checkAndRedirectReddit(tab);
    }
});

//---------------------------------------functions on tab change---------------------------------------
chrome.tabs.onActivated.addListener(async (activeInfo: any) => {
    const siteData: any = await getSyncData("siteData");
    const settings = siteData.siteData[5].settings
    const fbValue = siteData.siteData[0].settings;
    const twitterValue = siteData.siteData[3].settings;
    const RedditSettings = siteData.siteData[2].settings;
    const ytSettings = siteData.siteData[1].settings;
    if (!settings.disable && !settings["disable-10"].value && !settings.disableHours.active) {
        chrome.tabs.get(activeInfo.tabId, function (tab: any) {
            if (checkFBURL(tab.url)) {
                const fbFeed = hideFbFeed(fbValue.feed);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: fbFeed,
                });
                const fbSideNav = toggleFbNavigation(fbValue.leftNavigation);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: fbSideNav,
                });
                const fbRightNav = toggleFbRightNavigation(fbValue.sideNavigation);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: fbRightNav,
                });
                const fbChat = toggleFbChatSideBar(fbValue.chat);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: fbChat,
                });
                const fbWatch = toggleFbWatch(fbValue["watch-feed"]);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: fbWatch,
                });
                const fbMarket = toggleFbMarket(fbValue["market-place"]);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: fbMarket,
                });
                const fbStories = toggleFbStories(fbValue.stories);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: fbStories,
                });
            }
            // -----------------------twitter check---------------------
            if (checkTwitterURL(tab.url)) {
                const cssMedia = toggleTwitterMediaCSS(twitterValue.media);
                const twitterFollow = toggleTwitterFollow(twitterValue.follow);
                const twitterTrends = toggleTwitterTrends(twitterValue.trends);
                const twitterFeed = toggleTwitterFeed(twitterValue.timeline);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: twitterFollow,
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: twitterTrends,
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: twitterFeed,
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: cssMedia,
                });
            }
            // ----------------------------
            if (checkRedditURL(tab.url)) {
                const redditComments = toggleRedditComments(
                    RedditSettings.comments
                );
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: redditComments,
                });
                chrome.scripting.executeScript({
                    target: { tabId: activeInfo.tabId },
                    args: [RedditSettings.nsfw],
                    func: hideRedditNSFW,
                });
            }
            if (tab.url === "https://www.reddit.com/") {
                const redditFront = hideRedditFront(RedditSettings.front);
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: redditFront,
                });
            }
            // -----------------------youtube check------------------
            if (checkYtURL(tab.url)) {
                const ytRecommendation = toggleYTRecommendation(ytSettings.recom);
                const ytComments = toggleYtComments(ytSettings.recom);
                const ytShorts = toggleYtShorts(ytSettings.shorts);
                const ytSuggestion = toggleYtSuggestion(ytSettings.suggestions);
                const ytSide = toggleYtSideBar(ytSettings.sideBar);
                if (tab.url == 'https://www.youtube.com/') {
                    chrome.scripting.insertCSS({
                        target: { tabId: tab.id },
                        css: ytRecommendation,
                    });
                }
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: ytSide,
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: ytComments,
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: ytShorts,
                });
                if (ytSettings.thumbnail === 1) {
                    const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(100px)!important}`;
                    const css2 = `ytd-thumbnail {display:block!important}`;
                    chrome.scripting.insertCSS({
                        target: { tabId: tab.id },
                        css: css1,
                    });
                    chrome.scripting.insertCSS({
                        target: { tabId: tab.id },
                        css: css2,
                    });
                }
                if (ytSettings.thumbnail === 2) {
                    const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(0px)!important}`;
                    const css2 = `ytd-thumbnail {display:none!important}`;
                    chrome.scripting.insertCSS({
                        target: { tabId: tab.id },
                        css: css1,
                    });
                    chrome.scripting.insertCSS({
                        target: { tabId: tab.id },
                        css: css2,
                    });
                }
                if (ytSettings.thumbnail === 0) {
                    const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(0px)!important}`;
                    const css2 = `ytd-thumbnail {display:block!important}`;
                    chrome.scripting.insertCSS({
                        target: { tabId: tab.id },
                        css: css1,
                    });
                    chrome.scripting.insertCSS({
                        target: { tabId: tab.id },
                        css: css2,
                    });
                }
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: ytSuggestion,
                });
                // chrome.scripting.executeScript({
                //     target: { tabId: activeInfo.tabId },
                //     args: [ytSettings.news],
                //     func: toggleYtNews,
                // });
            }
        });
    }
});

//---------------------------------------functions on calling message---------------------------------------
chrome.runtime.onMessage.addListener(
    async (message: any, sender: any, sendResponse: any) => {
        if (!message.disable && !message.disable10 && !message.pause) {
            // ------------------------------fb check--------------------------
            if (
                message.action === "hideFbData" &&
                checkFBURL(message.url)
            ) {
                const fbFeed = hideFbFeed(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: fbFeed,
                });
                sendResponse({ status: true });
            }

            if (
                message.action === "toggleFbNavigation" &&
                checkFBURL(message.url)
            ) {
                const fbSideNav = toggleFbNavigation(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: fbSideNav,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "toggleFbRightNavigation" &&
                checkFBURL(message.url)
            ) {
                const fbRightNav = toggleFbRightNavigation(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: fbRightNav,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "toggleFbChatSideBar" &&
                checkFBURL(message.url)
            ) {
                const fbChat = toggleFbChatSideBar(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: fbChat,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "toggleFbWatch" &&
                checkFBURL(message.url)
            ) {
                const fbWatch = toggleFbWatch(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: fbWatch,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "toggleFbMarket" &&
                checkFBURL(message.url)
            ) {
                const fbMarket = toggleFbMarket(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: fbMarket,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "toggleFbStories" &&
                checkFBURL(message.url)
            ) {
                const fbStories = toggleFbStories(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: fbStories,
                });
                sendResponse({ status: true });
            }
            // --------------------------------twitter check---------------------------
            if (
                message.action === "hideTwitterFeed" &&
                checkTwitterURL(message.url)
            ) {
                const twitterFeed = toggleTwitterFeed(message.data);

                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: twitterFeed,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideTwitterTrends" &&
                checkTwitterURL(message.url)
            ) {
                const twitterTrends = toggleTwitterTrends(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: twitterTrends,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideTwitterFollow" &&
                checkTwitterURL(message.url)
            ) {
                const twitterFollow = toggleTwitterFollow(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: twitterFollow,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideTwitterMedia" &&
                checkTwitterURL(message.url)
            ) {
                const cssMedia = toggleTwitterMediaCSS(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: cssMedia,
                });
                sendResponse({ status: true });
            }
            // ------------------------------reddit check--------------------------
            if (
                message.action === "hideRedditComments" &&
                checkRedditURL(message.url)
            ) {
                const redditComments = toggleRedditComments(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: redditComments,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideRedditFront" &&
                message.url === "https://www.reddit.com/"
            ) {
                const redditFront = hideRedditFront(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: redditFront,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideRedditNSFW" &&
                checkRedditURL(message.url)
            ) {
                chrome.scripting.executeScript({
                    target: { tabId: message.tabId },
                    args: [message.data],
                    func: hideRedditNSFW,
                });
                sendResponse({ status: true });
            }

            // --------------------------------youtube check------------------------

            if (
                message.action === "hideYtRecommendation" &&
                message.url == 'https://www.youtube.com/'
            ) {
                const ytRecommendation = toggleYTRecommendation(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: ytRecommendation,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideYtSideBar" &&
                checkYtURL(message.url)
            ) {
                const ytSide = toggleYtSideBar(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: ytSide,
                });
            }
            if (
                message.action === "hideYtComments" &&
                checkYtURL(message.url)
            ) {
                const ytComments = toggleYtComments(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: ytComments,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideYtShorts" &&
                checkYtURL(message.url)
            ) {
                const ytShorts = toggleYtShorts(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: ytShorts,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideYtSuggestions" &&
                checkYtURL(message.url)
            ) {
                const ytSuggestion = toggleYtSuggestion(message.data);
                chrome.scripting.insertCSS({
                    target: { tabId: message.tabId },
                    css: ytSuggestion,
                });
                sendResponse({ status: true });
            }
            if (
                message.action === "hideYtThumbnail" &&
                checkYtURL(message.url)
            ) {
                if (message.data === 1) {
                    const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(100px)!important}`;
                    const css2 = `ytd-thumbnail {display:block!important}`;
                    chrome.scripting.insertCSS({
                        target: { tabId: message.tabId },
                        css: css1,
                    });
                    chrome.scripting.insertCSS({
                        target: { tabId: message.tabId },
                        css: css2,
                    });
                }
                if (message.data === 2) {
                    const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(0px)!important}`;
                    const css2 = `ytd-thumbnail {display:none!important}`;
                    chrome.scripting.insertCSS({
                        target: { tabId: message.tabId },
                        css: css1,
                    });
                    chrome.scripting.insertCSS({
                        target: { tabId: message.tabId },
                        css: css2,
                    });
                }
                if (message.data === 0) {
                    const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(0px)!important}`;
                    const css2 = `ytd-thumbnail {display:block!important}`;
                    chrome.scripting.insertCSS({
                        target: { tabId: message.tabId },
                        css: css1,
                    });
                    chrome.scripting.insertCSS({
                        target: { tabId: message.tabId },
                        css: css2,
                    });
                }
                sendResponse({ status: true });
            } else {
                sendResponse({ status: false });
            }
        } else {
            sendResponse({ status: false });
        }
    }
);

//---------------------------------------facebook functions------------------------------
//---------------------------------------hide feed---------------------------------------
const hideFbFeed = (toggle: boolean) => `
div[role$="main"] {
        display: ${toggle ? "none" : "flex"} !important;
    }
`;
const toggleFbNavigation = (toggle: boolean) => `
div[class$="x1iyjqo2"] {
        display: ${toggle ? "none" : "block"} !important;
    }
`;
const toggleFbRightNavigation = (toggle: boolean) => `
div[role$="complementary"] {
        visibility: ${toggle ? "hidden" : "visible"} !important;
    }
`;
const toggleFbChatSideBar = (toggle: boolean) => `
div[aria-label$="New message"] {
    display: ${toggle ? "none" : "inline-flex"} !important;
} div[aria-label$="Messenger"]{
    display: ${toggle ? "none" : "flex"} !important;
}
`;
const toggleFbWatch = (toggle: boolean) => `
a[aria-label$="Video"] {
    display: ${toggle ? "none" : "flex"} !important;
} a[href$="https://www.facebook.com/watch/"]{
    display: ${toggle ? "none" : "block"} !important;
} div[aria-label$="Video"] {
    display: ${toggle ? "none" : "flex"} !important;
}
`;
const toggleFbMarket = (toggle: boolean) => `
a[aria-label$="Marketplace"] {
    display: ${toggle ? "none" : "flex"} !important;
} a[href$="https://www.facebook.com/marketplace/?ref=bookmark"]{
    display: ${toggle ? "none" : "block"} !important;
} div[aria-label$="Collection of Marketplace items"] {
    display: ${toggle ? "none" : "flex"} !important;
}
`;
const toggleFbStories = (toggle: boolean) => `
div[aria-label$="Stories"] {
    display: ${toggle ? "none" : "block"} !important;
}
`;

//---------------------------------------twitter functions---------------------------------------
//---------------------------------------hide twitter feeds---------------------------------------

const toggleTwitterFeed = (toggle: boolean) => `
div[aria-label$="Timeline"] {
        display: ${toggle ? "none" : "block"} !important;
    }
`;

// ---------------------------------------hide twitter trands-------------------------------------

const toggleTwitterTrends = (toggle: boolean) => `
div[aria-label$="Trending now"],a[aria-label$="Search and explore"]  {
        display: ${toggle ? "none" : "block"} !important;
    }
`;

// --------------------------------------hide who to follow------------------------------------

const toggleTwitterFollow = (toggle: boolean) => `
aside[aria-label$="Who to follow"] {
        display: ${toggle ? "none" : "block"} !important;
    }
`;

// -----------------------------------------hide media------------------------------------

const toggleTwitterMediaCSS = (toggle: boolean) => `
    div[data-testid$="videoComponent"],
    div[aria-label$="Image"] {
        display: ${toggle ? "none" : "block"} !important;
    }
`;

//--------------------------------reddit functions----------------------------

const toggleRedditComments = (toggle: boolean) =>
    `a[data-click-id$="comments"] {display: ${toggle ? "none" : "block"
    } !important;}`;

const hideRedditFront = (toggle: boolean) =>
    `div[class="FohHGMokxXLkon1aacMoi"], div[class="rpBJOHq2PR60pnwJlUyP0"] {display: ${toggle ? "none" : "block"
    } !important;}`;

const hideRedditNSFW = (toggle: boolean) => {
    const spanElements = document.querySelectorAll("span");
    spanElements.forEach((list: any, index: any) => {
        if (list.innerText === "nsfw") {
            let parent = list;
            let flag = 1;
            while (parent && !parent.hasAttribute("data-testid")) {
                if (parent.getAttribute("id") === "AppRouter-main-content") {
                    flag = 0;
                    break;
                }
                parent = parent.parentElement;
            }
            if (
                flag &&
                toggle &&
                parent &&
                parent.getAttribute("data-testid") === "post-container"
            ) {
                parent.style.display = "none";
            } else if (
                flag &&
                parent &&
                parent.getAttribute("data-testid") === "post-container"
            ) {
                parent.style.display = "";
            }
        }
    });
};

// ------------------------------------youtube functions----------------------------

const toggleYTRecommendation = (toggle: boolean) =>
    `div[id="primary"] {display: ${toggle ? "none" : "block"} !important;}`;

const toggleYtSideBar = (toggle: boolean) =>
    `div[id="sections"]>ytd-guide-section-renderer:nth-child(1), div[id="sections"]>ytd-guide-section-renderer:nth-child(2), div[id="sections"]>ytd-guide-section-renderer:nth-child(3), div[id="sections"]>ytd-guide-section-renderer:nth-child(4) {display: ${toggle ? "none" : "block"
    } !important;}`;

const toggleYtComments = (toggle: boolean) =>
    `ytd-comments[id="comments"] {display: ${toggle ? "none" : "block"
    } !important;}`;

const toggleYtShorts = (toggle: boolean) =>
    `a[title="Shorts"], ytd-rich-shelf-renderer[class="style-scope ytd-rich-section-renderer"], ytd-reel-shelf-renderer[class="style-scope ytd-item-section-renderer"]  {display: ${toggle ? "none" : "flex"
    } !important;}`;

const toggleYtSuggestion = (toggle: boolean) =>
    `div[id="related"]  {display: ${toggle ? "none" : "block"} !important;}`;

//---------------------------------------redirect function---------------------------------------

function isTimeInRange(fromTime: string, untilTime: string) {
    const currentTime = new Date();
    const fromTimeParts = fromTime.split(":");
    const untilTimeParts = untilTime.split(":");
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const fromHour = parseInt(fromTimeParts[0], 10);
    const fromMinute = parseInt(fromTimeParts[1], 10);
    const untilHour = parseInt(untilTimeParts[0], 10);
    const untilMinute = parseInt(untilTimeParts[1], 10);

    if (fromHour === untilHour && fromMinute === untilMinute) {
        // Action allowed only at one specific time
        return currentHour === fromHour && currentMinute === fromMinute;
    } else if (fromHour < untilHour || (fromHour === untilHour && fromMinute < untilMinute)) {
        // Action allowed between two times on the same day
        return (
            (currentHour > fromHour || (currentHour === fromHour && currentMinute >= fromMinute)) &&
            (currentHour < untilHour || (currentHour === untilHour && currentMinute < untilMinute))
        );
    } else {
        // Action allowed between two times crossing midnight (e.g., from 23:00 to 6:00)
        return (
            (currentHour > fromHour || (currentHour === fromHour && currentMinute >= fromMinute)) ||
            (currentHour < untilHour || (currentHour === untilHour && currentMinute < untilMinute))
        );
    }
}

// chrome.webNavigation.onBeforeNavigate.addListener((details: any) => {
//     if (details.url.includes('facebook.com')) {
//         // Redirect the user to a different URL
//         chrome.tabs.update(details.tabId, { url: 'https://www.google.com/' });
//     }
// });

function checkKeywordInURL(url:string) {
    const urlSearchParams = new URLSearchParams(url.split('?')[1]);
    const qParam = urlSearchParams.get('q');
    
    if (!qParam) {
        return false; // 'q' parameter not found in the URL
    }
    
    // Check if any of the keywords match the 'q' parameter
    for (const keyword of keywords) {
        if (qParam === keyword) {
            return true; // Match found
        }
    }
    
    return false; // No match found
}

chrome.webNavigation.onBeforeNavigate.addListener(async (details: any) => {
    const url = details.url;
    let siteData: any;
    await getSyncData("siteData").then((resp: any) => {
        siteData = resp.siteData;
    });
    const settings = siteData[5].settings;
    const redirectionUrl = siteData[5].settings["custom-url"];
    const urlLists = siteData[5].settings.customSites;
    if (details.frameId === 0) {


        if (settings["focus-mode"].active && isTimeInRange(settings["focus-mode"].from, settings["focus-mode"].to)) {
            if (!url.includes("unplugnation.org") || !url == redirectionUrl) {
                if (urlLists.active && urlLists.urlList.includes(url)) {
                    chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                }
                if (url.includes("facebook.com")) {
                    chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                }
                if (url.includes("youtube.com")) {
                    chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                }
                if (url.includes("reddit.com")) {
                    chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                }
                if (url.includes("twitter.com")) {
                    chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                }
                if (checkKeywordInURL(url)) {
                    chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                }
                if (checkForURL(url)) {
                    chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                }
            }

        }
        else {
            if (!settings.disable && !settings["disable-10"].value && !settings.disableHours.active) {
                const fbBlock = siteData[0].settings.block;
                const ytBlock = siteData[1].settings.block;
                const ytRedirect = siteData[1].settings.redirect;
                const redditBlock = siteData[2].settings.block;
                const twitterBlock = siteData[3].settings.block;
                const explicitKey = siteData[4].settings.keyword;
                const explicitBlock = siteData[4].settings.block;

                const redditAll = siteData[2].settings["r/all"];
                const redditPop = siteData[2].settings["r/popular"];
                const redditAf = siteData[2].settings["r/af"];
                // const redditComment = siteData[2].settings.comments;
                if (!url.includes("unplugnation.org") || !(url == redirectionUrl)) {
                    if (urlLists.active && urlLists.urlList.includes(url)) {
                        chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                    }
                    if (fbBlock && url.includes("facebook.com")) {
                        chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                    }
                    if (ytBlock && url.includes("youtube.com")) {
                        chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                    }
                    if(ytRedirect && url === 'https://www.youtube.com/'){
                        chrome.tabs.update(details.tabId, { url: "https://www.youtube.com/feed/subscriptions" });
                    }
                    if (redditBlock && url.includes("reddit.com")) {
                        chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                    }
                    if (twitterBlock && url.includes("twitter.com")) {
                        chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                    }
                    if (explicitKey && checkKeywordInURL(url)) {
                        chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                    }
                    if (explicitBlock && checkForURL(url)) {
                        chrome.tabs.update(details.tabId, { url: `${redirectionUrl}` });
                    }
                    if (redditAll && url=="https://www.reddit.com/r/all/") {
                        chrome.tabs.update(details.tabId, { url: `https://www.reddit.com/` });
                    }
                    if (redditPop && url=="https://www.reddit.com/r/popular/") {
                        chrome.tabs.update(details.tabId, { url: `https://www.reddit.com/` });
                    }
                    if (
                        redditAf &&
                        url=="https://www.reddit.com/r/interestingasfuck/"
                    ) {
                        chrome.tabs.update(details.tabId, { url: `https://www.reddit.com/` });
                    }
                }
            };
        }
    }
})

const checkAndHideData = async (tab: any) => {
    const url: any = tab.url;
    let siteData: any;
    await getSyncData("siteData").then((resp: any) => {
        siteData = resp.siteData;
    });
    const settings = siteData[5].settings
    if (!settings.disable && !settings["disable-10"].value && !settings.disableHours.active) {

        const fbData = siteData[0].settings;
        const twitterSettings = siteData[3].settings;
        const redditSettings = siteData[2].settings;
        const ytSettings = siteData[1].settings;
        if (checkFBURL(url)) {
            const fbSideNav = toggleFbNavigation(fbData.leftNavigation);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: fbSideNav,
            });
            const fbFeed = hideFbFeed(fbData.feed);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: fbFeed,
            });
            const fbRightNav = toggleFbRightNavigation(fbData.sideNavigation);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: fbRightNav,
            });
            const fbChat = toggleFbChatSideBar(fbData.chat);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: fbChat,
            });
            const fbWatch = toggleFbWatch(fbData["watch-feed"]);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: fbWatch,
            });
            const fbMarket = toggleFbMarket(fbData["market-place"]);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: fbMarket,
            });
            const fbStories = toggleFbStories(fbData.stories);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: fbStories,
            });
        }
        // ----------------------------twitter ceck------------------------
        if (checkTwitterURL(url)) {
            const cssMedia = toggleTwitterMediaCSS(twitterSettings.media);
            const twitterFollow = toggleTwitterFollow(twitterSettings.follow);
            const twitterTrends = toggleTwitterTrends(twitterSettings.trends);
            const twitterFeeds = toggleTwitterFeed(twitterSettings.timeline);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: twitterFollow,
            });
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: twitterTrends,
            });
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: cssMedia,
            });
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: twitterFeeds,
            });
        }
        // --------------------------reddit check----------------------
        if (checkRedditURL(url)) {
            const redditComments = toggleRedditComments(redditSettings.comments);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: redditComments,
            });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                args: [redditSettings.nsfw],
                func: hideRedditNSFW,
            });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                args: [redditSettings.comments],
                func: toggleRedditComments,
            });
        }
        if (url === "https://www.reddit.com/") {
            const redditFront = hideRedditFront(redditSettings.front);
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: redditFront,
            });
        }
        // ---------------------------yt check---------------------
        if (checkYtURL(url)) {
            const ytRecommendation = toggleYTRecommendation(ytSettings.recom);
            const ytComments = toggleYtComments(ytSettings.comment);
            const ytShorts = toggleYtShorts(ytSettings.shorts);
            const ytSuggestion = toggleYtSuggestion(ytSettings.suggestions);
            const ytSide = toggleYtSideBar(ytSettings.sideBar);
            if (url === 'https://www.youtube.com/') {

                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: ytRecommendation,
                });
            }
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: ytComments,
            });
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: ytShorts,
            });
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: ytSuggestion,
            });
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: ytSide,
            });
            if (ytSettings.thumbnail === 1) {
                const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(100px)!important}`;
                const css2 = `ytd-thumbnail {display:block!important}`;
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: css1,
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: css2,
                });
            }
            if (ytSettings.thumbnail === 2) {
                const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(0px)!important}`;
                const css2 = `ytd-thumbnail {display:none!important}`;
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: css1,
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: css2,
                });
            }
            if (ytSettings.thumbnail === 0) {
                const css1 = `a[id="thumbnail"]>yt-image>img {filter:blur(0px)!important}`;
                const css2 = `ytd-thumbnail {display:block!important}`;
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: css1,
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    css: css2,
                });
            }
            // chrome.scripting.executeScript({
            //     target: { tabId: tab.id },
            //     args: [ytSettings.news],
            //     func: toggleYtNews,
            // });
        }
    }
};

// function checkForKeywords(url: string): boolean {
//     // Add more keywords as needed
//     const lowercaseURL = url.toLowerCase();
//     return keywords.some((keyword) => lowercaseURL.includes(keyword));
// }
function checkForURL(url: string): boolean {
    // Add more keywords as needed
    const lowercaseURL = url.toLowerCase();
    return urls.some((keyword) => lowercaseURL.includes(keyword));
}
// Add an empty export statement to make it a module
export { };