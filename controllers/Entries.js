const Clarifai = require('clarifai') ;
//Clarifai API
const app = new Clarifai.App({
 apiKey: apiKey: process.env.API_CLARIFAI_KEY
})
const handleApiCall = (req,res)=>{
	const {imageUrl} = req.body;
	app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
	.then(response=> res.json(response))
	.catch(err=>res.status(400).json('unable to work with API'))
}

const handleEntries = (req,res,knex)=>{
	const {id} = req.body;
	knex('users').where('id',id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries=>res.json(entries[0]))
	.catch(err=>res.status(400).json('unable to get entries'))
}

module.exports = {
	'handleEntries' : handleEntries,
	'handleApiCall' : handleApiCall
}