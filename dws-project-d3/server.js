const express = require('express');
const circleRoutes = require('./routes/circleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/circles', circleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});