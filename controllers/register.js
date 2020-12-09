const handleRegister = (req, res, bcrypt, db) => {
    const saltRounds = 10;
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission')
    }
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(async loginEmail => {
            const user = await trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                });
            res.json(user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.json('unable to register'))
}

export default handleRegister;