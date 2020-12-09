const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    
    db('users').select('*').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('Cannot get user'))
}

export default handleProfileGet;