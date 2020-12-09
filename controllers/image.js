import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '01463a36f4cc4f6fa49817ecb5157545'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_EMBED_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('Cannot get entries'))
}

export default { handleImage, handleApiCall };