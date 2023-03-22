const App = require('./app/App');
const userController = require('./app/controllers/userController');
const JSONparser = require('./app/middlewares/JSONparser');
const URLParser = require('./app/middlewares/URLParser');
const BodyParser = require('./app/middlewares/BodyParser');

const PORT = process.env.PORT || 5000;

const app = new App();

app.use(JSONparser);
app.use(URLParser(`http://localhost:${PORT}`));
app.use(BodyParser);

app.setController(userController);

app.listen(PORT, () => console.log(`server listen on ${PORT}`));