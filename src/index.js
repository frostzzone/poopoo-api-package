const generatePassword = require('./passwordgenerate.js')
var path = require('path');
const Jimp = require('jimp')
const chalk = require('chalk')
var isInvalid = require('./is-invalid-path.js');
const isValidUrl = require('./isValidUrl.js')
const question = require('./qotd.js')
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var item
const github = require('./githubuser.js')
const imageTypes = ['.png', '.apng', '.jpeg', '.webp', '.ico', '.bmp']

function textReplace(haystack, needle, replacement) {
    needle = needle.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
        .replace(/\x08/g, "\\x08");
    return haystack.replace(new RegExp(needle, 'g'), replacement);
}

function isValidUrl(string) {
    return isValidUrl.isValidUrl()
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
    qotd: question.qotd(),
    git: github.user(),
    encode: encode,
    decode: decode,
spoil: spoiler,
      password: pass,
  remove: remove
}