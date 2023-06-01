import app from './index';

const port = process.env.PORT || 50001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
