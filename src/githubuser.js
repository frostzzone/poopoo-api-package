const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))
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
module.exports = {
    user: github
}