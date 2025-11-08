const express = require('express');
const db = require('./db');
const todosRouter = require('./routes/todos');

const app = express();
app.use(express.json());
app.use('/todos', todosRouter);

const PORT = process.env.PORT || 3000;

async function init() {
  try {
    await db.init();
    console.log('DB initialized');
  } catch (err) {
    console.error('DB init failed, continuing without DB:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

init();
