(async () => {
    const poo = require('./src')

    poo.image('./image.png', 'https://api.frostzzone.repl.co/example.png', false)
  
    let qotd = await poo.qotd()
    console.log(qotd)

    let github = await poo.git()
    
    console.log(github.avatar)
    let encoded = poo.encode(69)
  
    console.log(encoded)
  
    console.log(poo.decode(encoded))
  
    console.log(poo.spoil("Hello"))

    let pass = poo.password()
    console.log(pass.password)
    console.log(pass.recoverCode)

  
    console.log(await poo.remove('emoji', 'Hello ๐ฉ'))
    
    console.log(await poo.remove('text', 'Hโกยฐโ โe๐ปl๐๐lo๐ฉ๐ฉยง'))
})()