const generatePassword = require('./passwordgenerate.js')
var path = require('path');
const Jimp = require('jimp')
const chalk = require('chalk')
var isInvalid = require('./is-invalid-path.js');
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var item

const imageTypes = ['.png', '.apng', '.jpeg', '.webp', '.ico', '.bmp']

function textReplace(haystack, needle, replacement) {
    needle = needle.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
        .replace(/\x08/g, "\\x08");
    return haystack.replace(new RegExp(needle, 'g'), replacement);
}

function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }

    return true;
}

function listsGetRandomItem(list, remove) {
    var x = Math.floor(Math.random() * list.length);
    if (remove) {
        return list.splice(x, 1)[0];
    } else {
        return list[x];
    }
}

async function image(path1, url1, logs) {
    const path = path1 || undefined
    const url = url1 || undefined
    const log = logs || false
    if (path == undefined) return console.log("Specify a file path (refer to docs)")
    if (isInvalid(path)) return console.log(`Invalid file path ${path}`)
    if (!(imageTypes.some(word => path.endsWith(word)))) return console.log(`Currently accepted image types are ` + chalk.red(imageTypes.join(", ")))
    if (url == undefined) return console.log(chalk.red("You need to specify a image url"))
    if (isValidUrl(url) !== true || url.includes("<" || ">" || "<script>" || "</script>") || encodeURIComponent(url).includes("%3C" || "%3E" || "%20")) return console.log(chalk.red(`Url is invalid '${url}'`))
    await Jimp.read(url).then(png => {
        return png.write(path);
    }).catch(err => {
        console.log(err);
    });
    if (log == true) {
        console.log(`Saved image at ${path}`)
    }
}

async function qotd() {
    try {
        const response = await fetch('https://api.frostzzone.repl.co/qotd');
        const data = await response.json();
        item = data['question']
        return item;
    } catch (err) {
        console.log(chalk.hex('#FFA500')("There were issues with the api, using a built in list") + '\n' + chalk.hex('#ff0000').bold(`List may be out of date`))
        const list = [
            "Are you happy about yourself?",
            "Do you like playing video games? If yes, then what is your favorite game genre?",
            "What was your favorite hobby as a kid?",
            "Has your life been rough recently?",
            "Why did you choose your usernames? What is the story behind them?",
            "If you have a chance to change the past, what would you change?",
            "Have you ever been bullied at school/work? What did you do to stop the bullying?",
            "Do you know any coding languages?",
            "Is there anything that you about yourself that you find weird?",
            "What continents are you from? (Asia/Africa/North America/South America/Antarctica/Europe/Australia)",
            "[Troll Question] Do you like hamburger with pinapples?",
            "Would you rather to eat at KFC or McDonalds?",
            "Have you broken any rules in a Discord server?",
            "Do you have a job? If yes, then what is it?",
            "What is your favorite season? (Spring/Summer/Autumn/Winter)",
            "What do you do during freetimes?",
            "Would you consider yourself a nerd?",
            "If you have a choice to choose your nationality, what country would you want to be in?",
            "What chatting app do you use the most? (Discord, Skype, Twitter DM, Messenger, Slack, etc)",
            "Does Children's Online Privacy Protection Rule (\"COPPA\") actually protects children or is it blocking kids from seeing the reality?",
            "Do you have enough money to afford Minecraft?",
            "If you have a chance to change your past, what would you change?",
            "Have you ever been hacked? If yes, how did you try to get your accounts back?",
            "What can you do to calm yourself down when you are mad?"
        ]
        item = listsGetRandomItem(list, false)
        return (item);
    }
}

async function github(user) {
    if (user == undefined) {
        console.log(chalk.hex('#ff0000').bold(`Please specify a user`))
        const object = new Object();
        object['url'] = "undefined"
        object['avatar'] = "undefined"
        object['account_type'] = "undefined"
        object['name'] = "undefined"
        object['company'] = "undefined"
        object['blog'] = "undefined"
        object['location'] = "undefined"
        object['email'] = "undefined"
        object['bio'] = "undefined"
        object['twitter'] = "undefined"
        object['public_repos'] = "undefined"
        object['public_gists'] = "undefined"
        object['followers'] = "undefined"
        object['following'] = "undefined"
        object['created_at'] = "undefined"
        object['updated_at'] = "undefined"
        return object;
    }
    const response = await fetch('https://api.github.com/users/' + user);
    const data = await response.json();
    const object = new Object();
    object['url'] = data.url;
    object['avatar'] = data.avatar_url;
    object['account_type'] = data.type;
    object['name'] = data.login;
    if (data.company == null) {
        object['company'] = "None"
    } else {
        object['company'] = data.company;
    }
    if (data.blog == null) {
        object['blog'] = "None"
    } else {
        object['blog'] = data.blog;
    }
    if (data.location == null) {
        object['location'] = "Not set"
    } else {
        object['location'] = data.location;
    }
    if (data.email == null) {
        object['email'] = "None"
    } else {
        object['email'] = data.email;
    }
    if (data.bio == null) {
        object['bio'] = "No Bio"
    } else {
        object['bio'] = data.bio;
    }
    if (data.twitter_username == null) {
        object['twitter'] = "Not Set";
    } else {
        object['twitter'] = data.twitter_username;
    }
    object['public_repos'] = data.public_repos;
    object['public_gists'] = data.public_gists;
    object['followers'] = data.followers;
    object['following'] = data.following;
    object['created_at'] = data.created_at;
    object['updated_at'] = data.updated_at;
    return object;
}

function encode(tex) {
    if (tex !== undefined) {
        let text = String(tex)
        return text.split('').map((char) => '00'.concat(char.charCodeAt(0).toString(2)).slice(-8)).join(' ')
    } else {
        console.log(chalk.hex('#ff0000').bold(`Please provide an input`))
        return "undefined"
    }
}

function decode(binar) {
    if (binar !== undefined) {
        let binary = String(binar)
        var string = '';
        binary.split(' ').map(function(bin) {
            string += String.fromCharCode(parseInt(bin, 2));
        });
        return string
    } else {
        console.log(chalk.hex('#ff0000').bold(`Please provide an input`))
        return "undefined"
    }
}

          function spoiler(tex){
            if (tex !== undefined) {
              let text = String(tex)
        text = textReplace(text, '', '||||')
        return text.slice(2, text.length - 2);
    } else {
              console.log(chalk.hex('#ff0000').bold(`Please provide an input`))
        return "undefined"
    }
          }

function pass(){
  var outcome = []
    generatePassword.loopPassword(outcome)
    var password = outcome.join('')
    var recoverCode = []
    generatePassword.loopRecover(recoverCode)
  const object = new Object();
  object['password'] = String(password)
  object['recoverCode'] = String(recoverCode.join(''))
  return object
}

async function remove(typ, text){
  let type = typ.toLowerCase();
  if(text == undefined){
    console.log(chalk.hex('#ff0000').bold(`Please provide a input`))
        return "undefined"
  }
  if(type == "emoji"){
  return await text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  } else if(type == "text"){
    return await text.replace(/[^\w\s]/gi, '');
  } else {
    console.log(chalk.hex('#ff0000').bold(`Invalid type, valid types: emoji, text`))
    return "undefined"
  }
}

module.exports = {
    image: image,
    qotd: qotd,
    git: github,
    encode: encode,
    decode: decode,
spoil: spoiler,
      password: pass,
  remove: remove
}