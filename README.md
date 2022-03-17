# 💩 poopoo-api

Welcome to an "ok" api
[![NPM](https://nodei.co/npm/poopoo-api.png)](https://nodei.co/npm/poopoo-api/)
[![downloadsBadge](https://img.shields.io/npm/dt/poopoo-api?style=for-the-badge)](https://npmjs.com/poopoo-api)[![versionBadge](https://img.shields.io/npm/v/poopoo-api?style=for-the-badge)](https://npmjs.com/poopoo-api)

⭐ If you like this package, don't forget to star Github repo [here](https://github.com/frostzzone/poopoo-api)

---

# Example code:

```js
(async () => {
    const poo = require('./src')

    poo.image('./image.png', 'https://api.frostzzone.repl.co/example.png', false) // saves image for later use :troll:

    //reqired to be used in await
    let qotd = await poo.qotd()
    console.log(qotd)

    let github = await poo.git()
    //Returns an object
    /* Example response
{
    "url": "https://api.github.com/users/frostzzone",
    "avatar": "https://avatars.githubusercontent.com/u/65735427?v=4",
    "account_type": "User",
    "name": "frostzzone",
    "company": "At",
    "blog": "https://frostzzone.github.io",
    "location": "Neptune",
    "email": "None",
    "bio": "Hello i am frostzzone,\r\nI code in: node.js, html, css, a lil bit of vue.js, and scratch\r\nI make discord bots :p",
    "twitter": "Not Set",
    "public_repos": 22,
    "public_gists": 2,
    "followers": 7,
    "following": 12,
    "created_at": "2020-05-21T19:59:34Z",
    "updated_at": "2022-03-08T15:39:29Z"
}
*/
    console.log(github.avatar)

    //encodes input to binary
    let encoded = poo.encode(69)
    console.log(encoded)
    //decodes binary
    console.log(poo.decode(encoded))
    //Makes the input annoying Discord Spoilers :troll:
    console.log(poo.spoil("Hello"))

    let pass = poo.password()
    console.log(pass.password)
    console.log(pass.recoverCode)

    //remove all emojis
    console.log(await poo.remove('emoji', 'Hello 💩'))
    //remove every thing except abc's and numbers 
    console.log(await poo.remove('text', 'H♡°■●e👻l💀🙂lo💩💩§'))
})()
```

# Documantion:


| Methods       | Type           | Required      | Output     | Description |
| ------------- |:-------------:|:-------------:|:-------------:| :--------------:|
| image('Path for image', 'image url', log if success) | String, String, Boolean | true, true, false | *None* | Download an image from a url for later use |
| qotd() | None | None | *String* | Give a random question (Question Of The Day) |
| github('User') | String | true | *Object* | Gives info about a user on github |
| encode('input') | String/Number/Boolean | true | *String* | Converts the input into binary |
| decode('input') | String/Number | true | *String* | Convert binary back into text |
| spoil('input') | String/Number | true | *String* | Makes the input a very annoying discord spoiler spam |
| password() | None | None | *Object* | Creates a random password with a recover code |
| remove('type', 'input') | Option, String | true, true | *String* | **emoji** - removes all emojis, **text** - removes everything except letters and numbers |