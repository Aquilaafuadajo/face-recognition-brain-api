const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: 'bc5ce93b72d642de80bdac28e8d91471'
 });

const handleApiCall = (req, res) => {
  app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('error from image api'))
}

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}