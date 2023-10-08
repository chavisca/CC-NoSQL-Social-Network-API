const usernames = [
    'smoothsilk',
    'milktoast',
    'smurf223',
    'fiveaces',
    'mongooseexpert',
    'truthdecay',
    'stepbystep',
    'sweatervest',
    'zombievirus',
    'tacticalswan',
    'sambucajones',
    'greenlightning',
    'stormycloud',
    'fivegee',
    'alarmchili',
    'pockettarget',
    'auxfaux',
    'dingoatemybaby',
    'summerlovin',
    'argonautilus',
    'copylinguini',
];

const emails = [
    'sunnyday2023@fake.com',
    'totalrecall2000@notreal.com',
    'puppyloverOP@dogs.org',
    'crazycatlady@news.net',
    'toocoldinaz@lol.com',
    'ddrmaster@samba.org',
    'drapplesauce@fda.gov',
    'senorgoose@topgun.com',
    'therealmaverick@tombstone.sln',
    'windmillfighter@quixote.don',
    'andthentherewastwo@count.com',
    'youthinkyouknowme@edge.net',
    'commachameleon@eighty.dot',
    'warmsakesock@dojo.jp',
    'trumpetboy245@band.org',
    'tiramissyou@culinary.ch',
    'goinggoinggawn@auction.org',
    'readytorumble@wba.ok',
    'burneraccount213312@palindromenumbers.net',
    'devilcorn@fearfarm.ca',
    'helloitsme@adele.sng',
];

const users = [];
const getUserName = () => usernames[Math.floor(Math.random() * usernames.length)];
const getEmail = () => emails[Math.floor(Math.random() * emails.length)];
const getRandomName = () => `${getUserName()} ${getEmail()}`;

module.exports = getRandomName;