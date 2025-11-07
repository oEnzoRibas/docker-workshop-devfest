const express = require('express');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// register routes: call exported function which attaches the router to the app
routes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});