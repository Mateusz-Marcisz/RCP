const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
let ejs = require('ejs');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});




setInterval(myTimer, 180000);

  function myTimer() {

	connection.connect(function(err) {
		

		let liczbaa =Math.floor(Math.random() * 100);
		console.log(liczbaa);
		let liczbab =Math.floor(Math.random() * 100);
		console.log(liczbab);
		let liczbac =Math.floor(Math.random() * 100);
		console.log(liczbac);


		var sql = "UPDATE `liczba` SET `liczbaa`='"+liczbaa+"',`liczbab`='"+liczbab+"',`liczbac`='"+liczbac+"'";
		connection.query(sql, function (err, result) {
		  if (err) throw err;
		  console.log(result.affectedRows + " record(s) updated");
		});
	  });

  };


  setInterval(myTimerr,86400000);

  function myTimerr() {

	connection.connect(function(err) {
		
		const dt = new Date();
		let day = dt.getDate();
		let month = dt.getMonth();
		month= month+1;
		let year = dt.getFullYear();
		let dataw = year+"-"+month+"-"+day;
		console.log(dataw);






		var sqlw = "INSERT INTO `dniw`(`data`) VALUES ('"+dataw+"')";
		connection.query(sqlw, function (err, result) {
		  if (err) throw err;
		  console.log(result.affectedRows + " record(s) updated");
		});

		var sql = "INSERT INTO `dni`(`data`) VALUES ('"+dataw+"')";
		connection.query(sql, function (err, result) {
		  if (err) throw err;
		  console.log(result.affectedRows + " record(s) updated");
		});



	  });

  };









const app = express();
app.set('view engine', 'ejs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});


/*app.get('/wrong', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/wrong'));
});
*/
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
				

	let username = request.body.username;
	let password = request.body.password;


	// Ensure the input fields exists and are not empty
    console.log(username);
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			//console.log(results);
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				if (username == "admin") {
					request.session.loggedin = true;
					request.session.username = username;
					response.redirect('/panel');
				}
				else {
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/wrong');

				};

			} else {
				
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}



  });



let ain = 1;
let dwai = 2;
let tri = 3;


setInterval(myTime, 180000);

  function myTime() {

	connection.connect(function() {

	connection.query("SELECT * FROM `liczba`", function (err, result, fields) {
	  if (err) throw err;
let data = JSON.parse(JSON.stringify(result));
		//console.log(data);


	  tri = (data[0].liczbaa);
	dwai = (data[0].liczbab);
	ain = (data[0].liczbac);

	});
	console.log("poprawny update "+tri+":"+dwai+":"+ain);
  });

  };



// http://localhost:3000/wrong
app.get('/wrong', function(request, response) {
	// If the user is loggedin




	let usernameq= 0;

	 usernameq= request.session.loggedin;
	 console.log(usernameq);
	if (usernameq == true) {
		  let woname= request.session.username;

		connection.query("SELECT * FROM `liczba`", function (err, result, fields) {
			if (err) throw err;
	  let data = JSON.parse(JSON.stringify(result));
			  //console.log(data);
	  
	  
			tri = (data[0].liczbaa);
		  dwai = (data[0].liczbab);
		  ain = (data[0].liczbac);
	  


		response.render('wrong.ejs', {name: woname , ain: ain, dwai: dwai, tri: tri});
	
	

	
		  });
	/******************************************************************************************* */
		  connection.query("SELECT `data`, `"+woname+"` FROM `dni`", function (err, result, fields) {
			if (err) throw err;
	  let data = JSON.parse(JSON.stringify(result));
			  //console.log(data);
	  
	  
console.log(data)
	
	
	
	
		  });

/***************************************************************************************************** */











	}
	else {

	response.redirect('/');

	};



	});
  

	app.post('/wrong', function(request, response) {
		// If the user is loggedin
	
	
	
	
		let usernameq= 0;
	
		 usernameq= request.session.loggedin;
		 console.log(usernameq);
		if (usernameq == true) {
	
	





			
			connection.query("SELECT * FROM `liczba`", function (err, result, fields) {
				if (err) throw err;
		  let data = JSON.parse(JSON.stringify(result));
				  //console.log(data);
		  
		  
				tri = (data[0].liczbaa);
			  dwai = (data[0].liczbab);
			  ain = (data[0].liczbac);
		  
			  let woname= request.session.username;
	
			response.render('wrong.ejs', {name: woname , ain: ain, dwai: dwai, tri: tri});
		
		
		
		
			  });
	
	
		}
		else {
	
		response.redirect('/');
	
		};
	
	
	
		});





app.post('/wronga', function(request, response) {



	let woname= request.session.username;

	response.render('wrong.ejs' , {name: woname , ain: "ain", dwai: "dwai", tri: tri});

		let zmienna = request.body.zmienna;

			if(tri == zmienna){
				//**********************************************************************



				
				const d = new Date();
				let hour = d.getHours();
				let minutes = d.getMinutes();
				let seconds = d.getSeconds();
				let time = hour+":"+minutes+":"+seconds
				console.log(time);


				let day = d.getDate();
				let month = d.getMonth();
				month= month+1;
				let year = d.getFullYear();
				let data = year+"-"+month+"-"+day;
				console.log(data);


				connection.query("UPDATE `dni` SET `"+woname+"`='"+time+"' WHERE `data`='"+data+"'", function (err, result, fields) {
					if (err) throw err;

			
				  });
				  //**************************************************************************
			}
			else{
				console.log("nieudane parowanie"+zmienna+tri);
			}


	// Ensure the input fields exists and are not empty
    console.log(zmienna);

  });

/********************************************************************************************************************************** */



app.post('/wyjscie', function(request, response) {
	// If the user is loggedin




	let usernameq= 0;

	 usernameq= request.session.loggedin;
	 console.log(usernameq);
	if (usernameq == true) {


		connection.query("SELECT * FROM `liczba`", function (err, result, fields) {
			if (err) throw err;
	  let data = JSON.parse(JSON.stringify(result));
			  //console.log(data);
	  
	  
			tri = (data[0].liczbaa);
		  dwai = (data[0].liczbab);
		  ain = (data[0].liczbac);
	  
		  let woname= request.session.username;

		response.render('wrongw.ejs', {name: woname , ain: ain, dwai: dwai, tri: tri});
	
	
	
	
		  });


	}
	else {

	response.redirect('/');

	};



	});
  







app.post('/wrongw', function(request, response) {



	let woname= request.session.username;

	response.render('wrongw.ejs' , {name: woname , ain: "ain", dwai: "dwai", tri: tri});

		let zmienna = request.body.zmienna;


		connection.query("SELECT `"+woname+"` FROM `dni` ORDER BY ID DESC LIMIT 1;", function (err, result, fields) {
			if (err) throw err;
	  let temp = JSON.parse(JSON.stringify(result));
			  //console.log(data);
	  

		let	tempa = (temp[0].woname);


console.log(tempa);




		  });








			if(tri == zmienna){
				//**********************************************************************



				
				const d = new Date();
				let hour = d.getHours();
				let minutes = d.getMinutes();
				let seconds = d.getSeconds();
				let time = hour+":"+minutes+":"+seconds
				console.log(time);


				let day = d.getDate();
				let month = d.getMonth();
				month= month+1;
				let year = d.getFullYear();
				let data = year+"-"+month+"-"+day;
				console.log(data);


				connection.query("UPDATE `dniw` SET `"+woname+"`='"+time+"' WHERE `data`='"+data+"'", function (err, result, fields) {
					if (err) throw err;

			
				  });
				  //**************************************************************************
			}
			else{
				console.log("nieudane parowanie"+zmienna+tri);
			}


	// Ensure the input fields exists and are not empty
    console.log(zmienna);

  });


/************************************************************************************************ */




  app.get('/panel', function(request, response) {


	let usernameq= request.session.username;
	if (usernameq == "admin") {

	response.render('panel.ejs');
	}
	else {

	response.redirect('/wrong');

	};



	});





	app.get('/token', function(request, response) {

		connection.query("SELECT * FROM `liczba`", function (err, result, fields) {
			if (err) throw err;
	  let data = JSON.parse(JSON.stringify(result));
			  //console.log(data);
	  
	  
			tri = (data[0].liczbaa);

		response.render('token.ejs' , {token: tri});
		  });


	
	
		});




	app.post('/logout', function(request, response) {
		let userlogout =request.session.username;
		console.log("user log out:	"+userlogout)
		request.session.loggedin = false;
		response.sendFile(path.join(__dirname + '/login.html'));
	
	
	
		});




		app.post('/zapytanie', function(request, response) {


			let usernameq= request.session.username;
			if (usernameq == "admin") {
		

				let woname= request.session.username;


				let zmiennaa = request.body.zmiennaa;
	
				let zmiennab = request.body.zmiennab;
	
				let co =request.body.co;
	
				let user =request.body.user;
	
				let haslo =request.body.haslo;
	
				let email =request.body.email;
	
				console.log(woname+" "+zmiennaa+" "+zmiennab+" "+co+" "+user+" "+haslo+" "+email);
	
	
	
	
				switch (co) {
				  case 'dodajwe':
	
				  connection.connect(function(err) {
			
	
			
			
					var sql ="UPDATE `dni` SET `"+user+"`='"+zmiennab+"' WHERE DATA='"+zmiennaa+"'" ;
					connection.query(sql, function (err, result) {
					  if (err) throw err;
					  console.log(result.affectedRows + " record(s) updated");
					});
				  });
	
	
					break;
	
				  case 'dodajwy':
	
				  connection.connect(function(err) {
				  var sql ="UPDATE `dniw` SET `"+user+"`='"+zmiennab+"' WHERE DATA='"+zmiennaa+"'" ;
				  connection.query(sql, function (err, result) {
					if (err) throw err;
					console.log(result.affectedRows + " record(s) updated");
				  });
				});
	
	
				  break;
	
				  case 'zm':
	
				  
	
				console.log(user+" "+haslo);
	
				connection.connect(function(err) {
					var sql ="UPDATE `accounts` SET `password` = '"+haslo+"' WHERE `accounts`.`username` = '"+user+"';" ;
					connection.query(sql, function (err, result) {
					  if (err) throw err;
					  console.log(result.affectedRows + " record(s) updated");
					});
				  });
	
	
					break;
	
	
	
					case 'do':
	//////////////////////////////////////////////////////////////////////////////
					connection.connect(function(err) {
						var sql ="INSERT INTO `accounts`(`username`, `password`, `email`) VALUES ('"+user+"','"+haslo+"','"+email+"')" ;
						connection.query(sql, function (err, result) {
						  if (err) throw err;
						  console.log(result.affectedRows + " record(s) updated");
						});
					  });
	
	
	
	//////////////////////////////////////////////////////////////////////////////
	
				connection.connect(function(err) {
					var sql ="ALTER TABLE `dni` ADD `"+user+"` TIME NOT NULL ;" ;
					connection.query(sql, function (err, result) {
					  if (err) throw err;
					  console.log(result.affectedRows + " record(s) updated");
					});
				  });
	
	/////////////////////////////////////////////////////////////////////////////////
	
	connection.connect(function(err) {
		var sql ="ALTER TABLE `dniw` ADD `"+user+"` TIME NOT NULL ;" ;
		connection.query(sql, function (err, result) {
		  if (err) throw err;
		  console.log(result.affectedRows + " record(s) updated");
		});
	  });
	
	/////////////////////////////////////////////////////////////////////////////////
	
	
					break;
				  default:
					
	
	
	
	
	
	
	
				}
				
	
				response.render('panel.ejs');




			}
			else {
		
			response.redirect('/wrong');
		
			};






		

		  });


		  app.post('/tabelka', function(request, response) {
			let user= request.session.username;
			connection.query("SELECT `dni`.`data`, `dniw`.`a`, `dni`.`a` FROM `dni` , `dniw`;", function (err, result, fields) {
				if (err) throw err;
		  let token = JSON.parse(JSON.stringify(result));
				  //console.log(data);
		  
		  			response.render('tabelka.ejs', {token: token});
	console.log(token)
		
		
		
		
			  });



		
		
		
			});




		
		
			
			
	


app.listen(3000);