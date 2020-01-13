
/*
*request handlers
*/
//dependencies
var data = require('./data');
var helpers = require('./helpers');

// Define all the handlers
var handlers = {};


//users i.e eits
handlers.eits = function(data,callback){
var acceptableMethods = ['post','get','put','delete'];
if(acceptableMethods.indexOf(data.method) > -1){
	handlers._eits[data.method](data,callback);
} else {
	callback(405);
}
};

//container for the users submethods
//Required data = firstName,lastName,phone,password,tosAgreement
handlers._eits = {};

//eits - post
//Check if all the required fields are filled
handlers._eits.post = function(data,callback){
	var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
	var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
	var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim() == 10 ? data.payload.phone.trim() : false;
	var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
	var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

	if (firstName && lastName && phone && password && tosAgreement) {
		//ensure that the eit doesnt already exist
		_data.read('eits',phone,function(err,data){
			if(err){
				//hash the password
				var hashedPassword = helpers.hash(password);

				//create the eit object
				if (hashedPassword){
					var eitObject = {
					'firstName' : firstName,
					'lastName' : lastName,
					'phone' : phone,
					'hashedPassword' : hashedPassword,
					'tosAgreement' : true
				};
				//store the eit

				_data.create('eits',phone,eitObject,function(err){
					if (!err){
						callback(200);
					}else {
						console.log(err);
						callback(500,{'Error' : 'Could not create the New Eit'});
					}
				});

				} else {
					callback(500,{'Error' : 'Could not hash the eit\'s password'});
				}

				

			}else{
				//an eit with that phone number already exists
				callback(400,{'Error' : 'An Eit with that phone number already exists'});

			}
		}) 

	}else{
		 callback(405,{'Error' : 'Missing required fields'});
	}
};


//eits - get
handlers._eits.get = function(data,callback){

};

//eits - put
handlers._eits.put = function(data,callback){

};

//eits - delete
handlers._eits.delete = function(data,callback){

};

//ping handler
handlers.ping = function(data,callback){
	callback(200);
}


// Not found handler
handlers.notFound = function(data,callback){
  callback(404);
};
// const  notFoundHandler = callback =>
// data => callback (404,'Not Found');


// export the module
module.exports = handlers