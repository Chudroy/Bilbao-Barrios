# Bilbao-Barrios
A forum in which the boards are based on neighbourhoods

[Link to the active website on Heroku](https://bilbao-barrios.herokuapp.com/).

### MVC (Model, View, Controller) Project Structure

The data models, views and functionality are separated in the project folder structure, optimizing the development process by allowing changes to be made with ease, and also separating concerns, so that development can be done seperately on the view component or on the business logic, for example. Finally, this architecture works well for potential scalability.

###  CRUD for posts with images and comments

Create, Read, Update, Delete functionality, with available permissions according to current User

### Errors and Async Error handling with friendly error messages

Errors on page are handled with user-friendly messages, so they know if the problem is client-side (i.e, invalid credentials) or server-side (server-side validation errors).

### Cookie & Session Management with HMAC signing

HMAC signed cookies used for session management across different pages of the website. The website remembers filtered neighbourhoods, for example, and if a user is signed in.

### Authentication and Authorization with Passport.js

Passport.js middleware for a secure user experience. This middleware creates hashed passwords with salt on user registration, and compares user inputted password attempts with stored passwords.

### Liking Posts and Comments

Posts and comments can be liked or disliked, once, by each user. In the database, likes are stored along with a list of user IDs to check against, to prevent repeated likes or dislikes.

### Image upload with Multer and Cloudinary

Multer middleware for multipart/form-data POST requests. This middleware connects with Cloudinary storage API to upload and save images to their database. This avoids the overhead of storing images in the server database, instead only saving a URL string that links to the image stored on Cloudinary's side.

### Environment variables with dotenv

Environment variables are used to safely upload the project to Github without exposing sensitive developre credentials. To recreate this website on your own machine, create a .env file that matches any process.ENV.{{VARIABLE_NAMES}} found in the project. These are:

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_KEY
- CLOUDINARY_SECRET
- DB_URL
- SECRET

### Content Security Policy, Prevention of Database Injection and XSS (Cross Site Scripting) with HelmetJS

Content security policy to prevent loading resources from unspecified URLs, thus preventing common security exploits such as XSS.

### Mongo Cloud Database with Mongo Atlas

Cloud based database, eases development process. No need to switch to local db in development.
