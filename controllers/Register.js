
const handleRegister = (req,res,knex,bcrypt)=>{
	const {name,email,password} = req.body;
	if( !email || !password || !name )
		return res.status(400).json('incorrect form submission');
	
	const hash = bcrypt.hashSync(password);
	knex.transaction(trx=>{
		trx('login').insert({
			'email' : email,
			'hash' : hash
		})
		.returning('email')
		.then(loginEmail=>{
		return trx('users').insert({
				'name' : name,
				'email' : loginEmail[0],
				'joined' : new Date()
			})
			.returning('*')
			.then(user=>res.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=>res.status(400).json('unable to register'))
}

module.exports = {
	'handleRegister' : handleRegister
}