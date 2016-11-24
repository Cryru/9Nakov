
window.Kinvey = (function()
{
	//////////////////////////////////////////////////////////////////////////////
    // SoulKinvey - A basic library to interact with the Kinvey backend.        //
    //                                                                          //
    // Copyright © 2016 Vlad Abadzhiev - TheCryru@gmail.com                     //
    //                                                                          //
    // For any questions and issues: https://github.com/Cryru/SoulKinvey-JS     //
    //////////////////////////////////////////////////////////////////////////////
	//This is the asynchronous version of the library.
	//Declarations
	//=============================
	//Your application's key.
	let _appKey = "";
	//Your application's secret.
	let _appSecret = "";
	//The authentification for the currently logged in user.
	let _Auth = {};
	
	//Initializes your Kinvey application connection.
    return function(appKey, appSecret) 
	{
		//Instancing is done here.
		_appKey = appKey;
		_appSecret = appSecret;
		Auth = JSON.parse(localStorage.getItem('authtoken'));
	
		//Internal
		//=============================
		//Sends a HTTP GET request to the specified Kinvey url.
		let GetRequest = function(args, Callback, ErrorCallback) 
		{ 
		
			let request = 
			{
				method: "GET",
				url: "https://baas.kinvey.com" + args,
				headers: Auth,
				success: Callback,
				error: ErrorCallback
			}
			
			$.ajax(request);
		}
		
		//Sends a HTTP GET request to the specified Kinvey url.
		let PutRequest = function(args, obj, Callback, ErrorCallback) 
		{ 		
			let response = {};
		
			let request = 
			{
				method: "PUT",
				url: "https://baas.kinvey.com" + args,
				headers: Auth,
				data: obj,
				success: Callback,
				error: ErrorCallback
			}
			
			$.ajax(request);
		}
		//Sends a HTTP GET request to the specified Kinvey url.
		let DeleteRequest = function(args, Callback, ErrorCallback) 
		{ 		
			let response = {};
		
			let request = 
			{
				method: "DELETE",
				url: "https://baas.kinvey.com" + args,
				headers: Auth,
				success: Callback,
				error: ErrorCallback
			}
			
			$.ajax(request);
			
		}
		//Sends a HTTP GET request to the specified Kinvey url.
		let PostRequest = function(args, obj, Callback, ErrorCallback) 
		{ 		
			let response = {};
		
			let request = 
			{
				method: "POST",
				url: "https://baas.kinvey.com" + args,
				headers: Auth,
				data: obj,
				success: Callback,
				error: ErrorCallback
			}
			
			$.ajax(request);
			
		}
	
        return {
			//Authentification
			//----------------------------------
			//Login to your Kinvey application as a user.
			//Once a login is successful all requests afterwards will be sent as that user.
			Login: (function(Username, Password, Callback, ErrorCallback) 
			{				
				Auth = {'Authorization': "Basic " + btoa(Username + ":" + Password)};

				//A callback that will run the user callback after assigning the auth token.
				let tunnelCallback = function() { localStorage.setItem('authtoken', JSON.stringify(Auth)); Callback();}
				//A callbacck that will clear the auth in case of failure.
				let tunnelErrorCallback = function() { localStorage.setItem('authtoken', ""); Auth = null; ErrorCallback();}

				//Run the request with the tunneled callbacks.
				GetRequest("/user/" + appKey + "/", tunnelCallback, tunnelErrorCallback);
			}),
			// Registers a user within your Kinvey application.
			// Once a register is successful all requests afterwards will be sent as that user.
			Register: (function(Username, Password, Callback, ErrorCallback) 
			{				
				//Create an object to hold the data.
				sendObj = {username: Username, password: Password};
			
				Auth = {'Authorization': "Basic " + btoa(_appKey + ":" + _appSecret)};

				//A callback that will run the user callback after assigning the auth token.
				let tunnelCallback = (function() 
				{ 
					Auth = {'Authorization': "Basic " + btoa(Username + ":" + Password)}; 
					localStorage.setItem('authtoken', JSON.stringify(Auth)); 
					Callback();
				});
				//A callbacck that will clear the auth in case of failure.
				let tunnelErrorCallback = function() { localStorage.setItem('authtoken', ""); Auth = null; ErrorCallback();}

				//Run the request with the tunneled callbacks.
				PostRequest("/user/" + appKey + "/", sendObj, tunnelCallback, tunnelErrorCallback);
			}),
			//----------------------------------
			//Get
			//----------------------------------
			//Returns an array of all objects within a Kinvey data collection.
			//or if 2 arguments are supplied:
			//Returns an object within a Kinvey data collection, that has the _id specified.
			GetData: (function(dataName, dataID, Callback, ErrorCallback) 
			{ 
				if(dataID == undefined)
				{
					return getData_array();
				}
				else
				{
					return getData_byID();
				}
			
				function getData_array()
				{
					return GetRequest("/appdata/" + appKey + "/" + dataName + "/", Callback, ErrorCallback);
				}
				function getData_byID()
				{
					return GetRequest("/appdata/" + appKey + "/" + dataName + "/" + dataID, Callback, ErrorCallback);
				}
			}),
			//----------------------------------
			//Update
			//Updates an entry within a Kinvey data collection.
			//----------------------------------
			UpdateData: (function(dataName, dataID, updatedObject, Callback, ErrorCallback) 
			{ 
				PutRequest("/appdata/" + appKey + "/" + dataName + "/" + dataID, updatedObject, Callback, ErrorCallback);
			}),
			//----------------------------------
			//Delete
			//Deletes an entry within a Kinvey data collection.
			//----------------------------------
			DeleteData: (function(dataName, dataID, Callback, ErrorCallback) 
			{ 
				DeleteRequest("/appdata/" + appKey + "/" + dataName + "/" + dataID, Callback, ErrorCallback);
			}),
			//----------------------------------
			//Create
			// Creates an entry within a Kinvey data collection.
			//----------------------------------
			CreateData: (function(dataName, newObject, Callback, ErrorCallback) 
			{ 
				PostRequest("/appdata/" + appKey + "/" + dataName + "/", newObject, Callback, ErrorCallback);
			})
			//----------------------------------
        };
    }
	
	
	
})();