const {
  DataMovies = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  DataMovies, PORT, NODE_ENV, JWT_SECRET,
};
