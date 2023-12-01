const express = require('express');
const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = process.env.PORT || 5000;;

app.use(express.json());

app.get('/api/latest-prices', async (req, res) => {
  try {
    const response = await fetch('https://api.porssisahko.net/v1/latest-prices.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});