import $ from 'jquery';

const Kinvey = (function()
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
	//===========================================
	//Your application's key.
	let _appKey = "";
	//Your application's secret.
	let _appSecret = "";
	//The authentification for the currently logged in user.
	let _authToken = "";

	//Initializes your Kinvey application connection.
    return function(appKey, appSecret)
	{
		//Instancing is done here.
		_appKey = appKey;
		_appSecret = appSecret;
		_authToken = localStorage.getItem('authToken');

		//Internal
		//===========================================
		//Sends a HTTP GET request to the specified Kinvey url.
		let GetRequest = function(Auth, args, Callback, ErrorCallback)
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
		let PutRequest = function(Auth, args, obj, Callback, ErrorCallback)
		{

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
		let DeleteRequest = function(Auth, args, Callback, ErrorCallback)
		{

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
		let PostRequest = function(Auth, args, obj, Callback, ErrorCallback)
		{

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
		//Returns whether the user is logged in.
		let LogInStatus = function()
		{
			return localStorage.getItem('authToken') !== "" && localStorage.getItem('authToken') !== null;
		}
		//Returns the right authentification, if no user is logged in this will return the app authen, otherwise the user.
		let GetAuthen = function(ForceApp)
		{
			if(ForceApp === true || LogInStatus() === false) return {'Authorization': "Basic " + btoa(_appKey + ":" + _appSecret)};
			return {'Authorization': "Kinvey " + localStorage.getItem('authToken')};
		}
		//Sets local storage data.
		let SetUserData = function(Username, ID, authToken)
		{
			localStorage.setItem('Username', Username);
			localStorage.setItem('ID', ID);
			localStorage.setItem('authToken', authToken);
		}
		//Clears local storage data.
		let ClearUserData = function()
		{
			localStorage.removeItem('Username');
			localStorage.removeItem('ID');
			localStorage.removeItem('authToken');
		}

		//Other
		let emtpyFunc = (function() { });

        return {
			//Authentification
			//----------------------------------
			//Login to your Kinvey application as a user.
			//Once a login is successful all requests afterwards will be sent as that user.
			Login: (function(Username, Password, Callback, ErrorCallback)
			{
				//Check if missing callbacks, and prevent errors.
				if(Callback === undefined) Callback = emtpyFunc;
				if(ErrorCallback === undefined) ErrorCallback = emtpyFunc;

				//Authentificate with the app to login an account.
				let Auth = GetAuthen(true);

				//A callback that will run the user callback after assigning the auth token.
				let tunnelCallback = function(data) { SetUserData(Username, data._id, data._kmd.authtoken); Callback(data); }
				//A callbacck that will clear the auth in case of failure.
				let tunnelErrorCallback = function(data) { ClearUserData(); ErrorCallback(data);}

				//Run the request with the tunneled callbacks.
				PostRequest(Auth, "/user/" + appKey + "/login", {username: Username, password: Password}, tunnelCallback, tunnelErrorCallback);
			}),
			// Registers a user within your Kinvey application.
			// Once a register is successful all requests afterwards will be sent as that user.
			Register: (function(Username, Password, Callback, ErrorCallback)
			{
				//Check if missing callbacks, and prevent errors.
				if(Callback === undefined) Callback = emtpyFunc;
				if(ErrorCallback === undefined) ErrorCallback = emtpyFunc;

				//Create an object to hold the data.
				let sendObj = {username: Username, password: Password};

				//Authentificate with the app to register an account.
				let Auth = GetAuthen(true);

				//A callback that will run the user callback after assigning the auth token.
				let tunnelCallback = (function(data) { SetUserData(Username, data._id, data._kmd.authtoken); Callback(data); });
				//A callbacck that will clear the auth in case of failure.
				let tunnelErrorCallback = function(data) {  ClearUserData(); ErrorCallback(data);}

				//Run the request with the tunneled callbacks.
				PostRequest(Auth, "/user/" + appKey + "/", sendObj, tunnelCallback, tunnelErrorCallback);
			}),
			//----------------------------------
			//Get
			//----------------------------------
			//Returns an array of all objects within a Kinvey data collection.
			//or if 2 arguments are supplied:
			//Returns an object within a Kinvey data collection, that has the _id specified.
			GetData: (function(dataName, dataID, Callback, ErrorCallback)
			{
				//Get authentification.
				let Auth = GetAuthen();

				//Check if missing callbacks, and prevent errors.
				if(Callback === undefined) Callback = emtpyFunc;
				if(ErrorCallback === undefined) ErrorCallback = emtpyFunc;

				if(dataID === undefined)
				{
					return getData_array();
				}
				else
				{
					return getData_byID();
				}

				function getData_array()
				{
					return GetRequest(Auth, "/appdata/" + appKey + "/" + dataName + "/", Callback, ErrorCallback);
				}
				function getData_byID()
				{
					return GetRequest(Auth, "/appdata/" + appKey + "/" + dataName + "/" + dataID, Callback, ErrorCallback);
				}
			}),
			//----------------------------------
			//Update
			//Updates an entry within a Kinvey data collection.
			//----------------------------------
			UpdateData: (function(dataName, dataID, updatedObject, Callback, ErrorCallback)
			{
				//Get authentification.
				let Auth = GetAuthen();

				//Check if missing callbacks, and prevent errors.
				if(Callback === undefined) Callback = emtpyFunc;
				if(ErrorCallback === undefined) ErrorCallback = emtpyFunc;

				PutRequest(Auth, "/appdata/" + appKey + "/" + dataName + "/" + dataID, updatedObject, Callback, ErrorCallback);
			}),
			//----------------------------------
			//Delete
			//Deletes an entry within a Kinvey data collection.
			//----------------------------------
			DeleteData: (function(dataName, dataID, Callback, ErrorCallback)
			{
				//Get authentification.
				let Auth = GetAuthen();

				//Check if missing callbacks, and prevent errors.
				if(Callback === undefined) Callback = emtpyFunc;
				if(ErrorCallback === undefined) ErrorCallback = emtpyFunc;

				DeleteRequest(Auth, "/appdata/" + appKey + "/" + dataName + "/" + dataID, Callback, ErrorCallback);
			}),
			//----------------------------------
			//Create
			// Creates an entry within a Kinvey data collection.
			//----------------------------------
			CreateData: (function(dataName, newObject, Callback, ErrorCallback)
			{
				//Get authentification.
				let Auth = GetAuthen();

				//Check if missing callbacks, and prevent errors.
				if(Callback === undefined) Callback = emtpyFunc;
				if(ErrorCallback === undefined) ErrorCallback = emtpyFunc;

				PostRequest(Auth, "/appdata/" + appKey + "/" + dataName + "/", newObject, Callback, ErrorCallback);
			}),
			//----------------------------------
			//Other
			//Returns a boolean on whether the user is logged in.
			LoggedStatus: (function()
			{
				return LogInStatus();
			}),
			//Log the user out.
			Logout: (function()
			{
				ClearUserData();
			}),
			//Returns the logged in ID.
			LoggedID: (function()
			{
				return localStorage.getItem('ID');
			}),
			//Returns the username of the logged user.
			LoggedUsername: (function()
			{
				return localStorage.getItem('Username');
			})
        };
    }



})();

export default Kinvey;
