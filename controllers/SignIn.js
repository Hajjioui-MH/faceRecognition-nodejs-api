
const handleSignIn = (knex,bcrypt)=>(req,res)=>{
	const {email,password} = req.body;
	if( !email || !password )
		return res.status(400).json('incorrect form submission');

	knex('login').select().where('email',email)
	.then(data=>{
		//wrong email =>data is undefined=> <data[0].hash>-> error
		const isValid = bcrypt.compareSync(password, data[0].hash)
		if (isValid) {
			knex('users').where('email', data[0].email)
			.then(user=>res.json(user[0]))
			.catch(err=>res.status(400).json('unable to get user info'))
		}
		else{
			//Wrong password
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err=>res.status(400).json('wrong credentials !'))//data is empty
}

module.exports = {
	'handleSignIn' : handleSignIn
}