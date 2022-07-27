// mongoose causing slow intellisense performance
const mongoose = require("mongoose");
const Post = require("../models/post");
const fake_title = require("./fake_titles");

mongoose
  .connect(
    "mongodb+srv://Chudroy:ggXMdTH6rPOOt5Ip@cluster0.wmqob.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to mongoose");
  })
  .catch((err) => {
    console.log("Couldn't connect to Mongoose");
    console.log(err);
  });

const seedDB = async () => {
  try {
    await Post.deleteMany();
    for (let i = 0; i < 30; i++) {
      // let random_username = Math.floor(Math.random() * fake_users.length);
      let random_first_word = Math.floor(
        Math.random() * fake_title.first_word.length
      );
      let random_second_word = Math.floor(
        Math.random() * fake_title.second_word.length
      );

      const p = new Post({
        title: `${fake_title.first_word[random_first_word]} ${fake_title.second_word[random_second_word]}`,
        author: "62d6c797547c885ad6fc0cf2",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacus ligula, facilisis nec augue id, vulputate placerat turpis. Nullam auctor ante quam, eget efficitur leo tempus id. Suspendisse et venenatis sapien, eget faucibus leo. Nunc posuere tincidunt tellus eget dapibus. Vivamus nec ornare turpis. Maecenas maximus dapibus metus eget dictum. Aliquam erat volutpat. In eu dui ultricies magna congue venenatis. Vivamus tempor efficitur libero a facilisis. Curabitur id mi vulputate, pretium tellus at, lacinia nisl. Etiam pharetra facilisis orci eu venenatis. Curabitur et neque euismod, sollicitudin eros in, auctor nisi. Mauris sit amet egestas magna. Mauris nibh sem, aliquet vel lectus nec, faucibus condimentum mi. Fusce sed lectus libero.",
        image: {
          url: "https://res.cloudinary.com/dxzgh6tqt/image/upload/v1657879864/BilbaoBarrios/ud1rlxz6qkvqxchoycqz.jpg",
          filename: "BilbaoBarrios/lymkhpoykawwu1xqjwt6",
        },
        date: Date.now(),
        district: "Abando",
        neighbourhood: "Abandoibarra",
      });

      await p.save();
    }
  } catch (e) {
    console.log("error", e);
    console.log(e);
  }
};

const test = async () => {
  const test_url =
    "https://api.unsplash.com/photos/random?client_id=Nrv2sLhUUhAwKJeQQO5_wUayO2cHGFhxRJpsWyIshDU&collections=99144643";
};

// test().then(() => {
//     mongoose.connection.close()
// })

seedDB().then(() => {
  console.log("closing mongoose");
  mongoose.connection.close();
});
