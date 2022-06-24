// mongoose causing slow intellisense performance
const mongoose = require("mongoose")
const Post = require("../models/post")
const fake_users = require("./fake_users")

mongoose.connect("mongodb://localhost:27017/BilbaoBarrios")
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
        let r = Math.floor(Math.random() * fake_users.length)
        const p = new Post({
            title: "Test Post Title",
            author: fake_users[r].username,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacus ligula, facilisis nec augue id, vulputate placerat turpis. Nullam auctor ante quam, eget efficitur leo tempus id. Suspendisse et venenatis sapien, eget faucibus leo. Nunc posuere tincidunt tellus eget dapibus. Vivamus nec ornare turpis. Maecenas maximus dapibus metus eget dictum. Aliquam erat volutpat. In eu dui ultricies magna congue venenatis. Vivamus tempor efficitur libero a facilisis. Curabitur id mi vulputate, pretium tellus at, lacinia nisl. Etiam pharetra facilisis orci eu venenatis. Curabitur et neque euismod, sollicitudin eros in, auctor nisi. Mauris sit amet egestas magna. Mauris nibh sem, aliquet vel lectus nec, faucibus condimentum mi. Fusce sed lectus libero."
        })
        await p.save()
    }
}

const test = () => {
    console.log(fake_users.length)
}

seedDB().then(() => {
    mongoose.connection.close()
})

