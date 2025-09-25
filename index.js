const express = require('express');
const Datastore = require('nedb');



const app = express();

app.listen(4545, () => {
	console.log("listening at port 4545");
});

const database = new Datastore('database.db');
database.loadDatabase();
//database.insert({ name:"Alex", status:"🤑"});


app.use(express.static('public'));
//console.log("hello world");
app.use(express.json({ limit: '1mb' }));


app.get('/api', (request, response) => {
	database.find({}, (err, data) => {
		if (err) {
			response.end()
			return;
		}
		//console.log("hello 333333");
		response.json(data);
	})
	//response.json({ test: 123 });
});


app.post('/api', (request, response) => {
	console.log(request.body);

	const data = request.body;
	database.insert(data);
	response.json({
		status: "success",
		barcode: data.barcode
	});
});



