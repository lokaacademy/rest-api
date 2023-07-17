const userRoute = require('./user')
const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
      });

    userRoute(app, fs)
}


module.exports = appRouter