const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))
var item
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
module.exports = {
    qotd: qotd
}