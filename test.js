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