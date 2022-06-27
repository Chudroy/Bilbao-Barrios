// mongoose causing slow intellisense performance
const mongoose = require("mongoose")
const Post = require("../models/post")
const fake_users = require("./fake_users")
const fake_title = require("./fake_titles")

mongoose.connect("mongodb://localhost:27017/BilbaoBarrios", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to mongoose")
    })
    .catch((err) => {
        console.log("Couldn't connect to Mongoose")
        console.log(err);
    })

const seedDB = async () => {
    await Post.deleteMany();
    for (let i = 0; i < 30; i++) {
        let random_username = Math.floor(Math.random() * fake_users.length)
        let random_first_word = Math.floor(Math.random() * fake_title.first_word.length)
        let random_second_word = Math.floor(Math.random() * fake_title.second_word.length)

        const p = new Post({
            title: `${fake_title.first_word[random_first_word]} ${fake_title.second_word[random_second_word]}`,
            author: fake_users[random_username].username,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacus ligula, facilisis nec augue id, vulputate placerat turpis. Nullam auctor ante quam, eget efficitur leo tempus id. Suspendisse et venenatis sapien, eget faucibus leo. Nunc posuere tincidunt tellus eget dapibus. Vivamus nec ornare turpis. Maecenas maximus dapibus metus eget dictum. Aliquam erat volutpat. In eu dui ultricies magna congue venenatis. Vivamus tempor efficitur libero a facilisis. Curabitur id mi vulputate, pretium tellus at, lacinia nisl. Etiam pharetra facilisis orci eu venenatis. Curabitur et neque euismod, sollicitudin eros in, auctor nisi. Mauris sit amet egestas magna. Mauris nibh sem, aliquet vel lectus nec, faucibus condimentum mi. Fusce sed lectus libero."
        })

        await p.save()
    }
}

const test = async () => {
    console.log(fake_title.first_word, fake_title.second_word)
    console.log(fake_users.length)
}

// test().then(() => {
//     mongoose.connection.close()
// })

seedDB().then(() => {
    mongoose.connection.close()
})
