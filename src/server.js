const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  const mongoose = require('mongoose')
  
  const db = mongoose
    .connect(
      process.env.DB_URL
      )
      .then(() => {
        console.log('Conectou ao banco!')
      })
      .catch((err) => console.log(err));
  console.log(`Listening on port ${port}`);
});
