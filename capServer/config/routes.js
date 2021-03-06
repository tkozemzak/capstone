const homepage = require("../controllers/homepage.js");
const login = require("../controllers/login.js");
const register = require("../controllers/register.js");
const news = require("../controllers/news.js");
const profile = require("../controllers/profile.js");
const search = require("../controllers/search.js");

module.exports = function(app) {


//register
app.post('/register', register.register)

//Login
  app.post('/login', login.login)

//news
  app.get("/news/:id", news.random)
  app.get("/everything/:id", news.everything)
//fetchUserGames
  app.get("/games/:id", profile.games)

  //search
  app.post("/search", search.searchUsers)

  //message
  app.post("/message", search.message)
  app.get("/message/:id", profile.fetchMessages)
}

// function authenticateUser(req, res, next) {
//   if (!req.session.user) {
//     res.redirect('/');
//   } else {
//     next();
//   }
// }
