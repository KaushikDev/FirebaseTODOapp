  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBZwn4c0KmEGXXFScg_c8aLTte1CRmTknY",
    authDomain: "todo-app-612b7.firebaseapp.com",
    databaseURL: "https://todo-app-612b7.firebaseio.com",
    storageBucket: "todo-app-612b7.appspot.com",
    messagingSenderId: "439347897690"
  };
  firebase.initializeApp(config);



//+++++++++++Initialising document and initialising variables and functions+++++++
$("document").ready(function(){
		 const email = document.getElementById("email");
		 const password = document.getElementById("password");
		 const signin = document.getElementById("signin");
	   	 const signinG = document.getElementById("googleAuth");
	         const signinE = document.getElementById("emailAuth");
 		 const signout = document.getElementById("signout");
		 const signup = document.getElementById("signup");
	         const back = document.getElementById("back");
		 const getIndexDiv = document.getElementById("index");
		 const getMainDiv = document.getElementById("main");
		 const registeredName = document.getElementById("nameReg");
		 const registeredEmail = document.getElementById("emailReg");
		 const registeredpassword = document.getElementById("passwordReg");
		 const getRegisterDiv = document.getElementById("registerDIV");
		 const register = document.getElementById("register");
		 const cancel = document.getElementById("cancel");
		 const upload = document.getElementById("upload");
	         const storageRef = firebase.storage().ref();
		 var currentUser;
		 var promise;
		 var dpUrl ;
		 const indexPage = "/FirebaseTODOapp/index.html";
	         const loginPage = "/FirebaseTODOapp/login.html";
		 const registerPage = "/FirebaseTODOapp/register.html"; 
	         const appPage = "/FirebaseTODOapp/main.html";
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		 
	if(signin){
		 signin.addEventListener('click', e=>{
		    
		     const userMail = email.value;
			 const passCode = password.value;
			 
			 //validating user credentials
			 if(userMail!="" && passCode!=""){
			document.getElementById("emailReq").innerHTML =  "";
			document.getElementById("passReq").innerHTML =  ""; 
		        promise = firebase.auth().signInWithEmailAndPassword(userMail, passCode).then(function(){
			   // ...Below line to be rmeooved if not working expectedly.
				//var user = firebase.auth().currentUser;
					 });
		      promise.catch(e => 
	          document.getElementById("signinError").innerHTML = "Please recheck your credentials OR login using google OR signup for the application.")
		 }
			  else if(userMail==""){
				  
				document.getElementById("emailReq").innerHTML =  "Please enter your email";  
			  }
		 else if(passCode==""){
			 document.getElementById("emailReq").innerHTML =  "";
			 document.getElementById("passReq").innerHTML =  "Please enter your password"; 
		 }
				
				   });
			}
		 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
	if(signinG){
		 googleAuth.addEventListener('click', e=>{
			
			 firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {	 
			// This gives you a Google Access Token. You can use it to access the Google API.
  			var tokenGoogle = result.credential.accessToken;
			  // The signed-in user info.
			  var userGoogle = result.user;
			  // ...Below line to be rmeooved if not working expectedly.
				// var user = firebase.auth().currentUser;
			}).catch(function(error) {
 			 // Handle Errors here.
 			 var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
 			 // The firebase.auth.AuthCredential type that was used.
  			var credential = error.credential;
  			// ...
			});
		 });
		
		}
	
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		             
	if(signup){
		 signup.addEventListener('click', e=>{
		 window.location.href = "/FirebaseTODOapp/register.html"; 
		 });
	 }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
        if(signinE){
	 emailAuth.addEventListener('click', e=>{
		 window.location.href = "/FirebaseTODOapp/login.html"; 
		 });
	}	
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	 if(back){
	 back.addEventListener('click', e=>{
		 window.location.href = "/FirebaseTODOapp/index.html"; 
		 });
	}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
	if(cancel){
		 
		 cancel.addEventListener('click', e=>{
		 window.location.href = "/FirebaseTODOapp/login.html";
		  });
	 }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
			 if(upload){
	       var form = document.querySelector("form");
	       form.addEventListener("submit", e=>{
			//promise = function(){
			document.getElementById("uploadError").innerHTML = "";
		//YOUR CODE HERE 
		e.preventDefault();
		 //  var $=jQuery;
		   var file_data = $("#uploadImg").prop("files")[0];
		   storageRef.child("Display Pictures"+"/"+registeredEmail.value).put(file_data);
		// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
		  
    default :
document.getElementById("uploadError").innerHTML = "We encountered an error while uploading. Please retry!!";
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  var downloadURL = uploadTask.snapshot.downloadURL;
	console.log("Download URL is : "+ downloadURL);
});		
		//			 };
		 //     promise.catch(e => 
	           //    document.getElementById("uploadError").innerHTML = "We encountered an error while uploading. Please retry!!")
//		   
	//});
	
	}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
    if(register){
		 register.addEventListener('click', e=>{
		       
			 const nameUser = registeredName.value;   
		    	 const user = registeredEmail.value;
			 const pass = registeredpassword.value;
	
	if(nameUser!="" && user!="" && pass!="" && pass.length>=7){
		 document.getElementById("regnameReq").innerHTML = "";
		 document.getElementById("regemailReq").innerHTML = "";
		 document.getElementById("regpassReq").innerHTML = "";
		
		 promise = firebase.auth().createUserWithEmailAndPassword(user, pass).then(function(){
		//get the url of the just uploaded image :
		 storageRef.child("Display Pictures"+"/"+registeredEmail.value+"/").getDownloadURL().then(function(url) {
		 var xhr = new XMLHttpRequest();
		 xhr.responseType = 'blob';
		 xhr.onload = function(event) {
 		 var blob = xhr.response;
 		};
		xhr.open('GET', url);
		xhr.send();
 		console.log("The url of the image is : "+ url);
		dpUrl = url;
		// Or inserted into an <img> element:
		// var img = document.getElementById('myimg');
		//img.src = url;
		}).catch(function(error) {
  		// Handle any errors
 		console.log("Error while getting image url is : "+error.message);
		});
		//	 
			 
		 var user = firebase.auth().currentUser;
		 user.updateProfile({
				displayName: registeredName.value,
				photoURL: dpUrl
				}).then(function() {
				console.log("Update successful.");
				}, function(error) {
				console.log("An error happened.");
				});
			 });
		      promise.catch(e => 
			  document.getElementById("registerError").innerHTML = e.message
			   );
		 }
		 else if(nameUser==""){
			 document.getElementById("regnameReq").innerHTML = "*We would love to have your beautiful name";
		 }
		 
		 else if(user==""){
			 document.getElementById("regnameReq").innerHTML = "";
			 document.getElementById("regemailReq").innerHTML = "*We would love to have your awesome email";
		 }
		 
		 else if(pass==""){
			 document.getElementById("regemailReq").innerHTML = "";
			 document.getElementById("regpassReq").innerHTML = "*To make sure your content is safe, let's set a password ";
		 }
		 
		 else if(pass.length<7){
			 document.getElementById("regemailReq").innerHTML = "";
			 document.getElementById("regpassReq").innerHTML = "*Champions have strong passwords. Make sure yours is more than 6 characters!!";
			 
		 }
		   
		 });
         }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++				
		if(signout){
             signout.addEventListener('click', e=>{
		  
			 promise = firebase.auth().signOut().then(function(){
				if(confirm("Do you wish to leave?")){
				 window.location.href = "/FirebaseTODOapp/index.html";
			 }	
					 });
		      promise.catch(e => 
	                console.log(e.message))
			});
		 }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++			  
	
	firebase.auth().onAuthStateChanged(function(user){
		     
		 
			   //var user  = firebase.auth().currentUser;
		       		
			if(user){
			window.location.href = "/FirebaseTODOapp/main.html";
			$("document").ready(function(){
				
			var currentUser  = firebase.auth().currentUser;
			var name  = currentUser.displayName;
			var uid   = currentUser.uid;
			var email = currentUser.email ;
			var photoUrl = currentUser.photoURL ;
			
			console.log("Current user is : "+uid);
			console.log("Current user's name is : "+name);
			console.log("Current user's email is : "+email);
			console.log("Current user's photoUrl is : "+photoUrl);
			
         		document.getElementById("welcome").innerHTML = "Hi "+name+ ", Welcome!";
		   	var img = document.getElementById("dp");
			img.src = photoUrl;
			
				var arrayDelete=[];
				var i=1;
				var firebaseretrieveRef2 = firebase.database().ref().child(name+uid+"/Tasks");
				
				firebaseretrieveRef2.on("child_added", snap =>{
				  var retrievedTask = snap.val();
				  console.log("retrieved task is : "+retrievedTask);
				  $("#taskList").prepend("<li id='list"+i+"'><input type='checkbox' class='tdCheckboxes' id='check"+i+"' >"+retrievedTask+"</li>");
				  i++;

				});
				
              //+++++++++++Adding tasks++++++++++++++++++++++++++++++++
		$("#addTask").on("click", function(){
			 var tdTask=document.getElementById("taskBox").value;
			  if(tdTask==""){
			  alert("Empty task doesn't make any sense, does it?? ");
			  }
			  else{
			  var firebaseRefTasks = firebase.database().ref().child(name+uid+"/Tasks");
			 firebaseRefTasks.push().set(tdTask);
              document.getElementById("taskBox").value="";
			  }
			});
//=====================================================
//+++++++++++Changing colors on strike and unstrike++++++++++++++
		$(document).on("click", ".tdCheckboxes", function(){
			 if(this.checked){
			   $(this).parent().wrap("<strike>");
			   $(this).parent().css("color", "gray");
			}
			 
			 if(!this.checked){
			   $(this).parent().unwrap("<strike>");
			   $(this).parent().css("color", "red");
			}
		});
//=====================================================
//+++++++++++Clearing/deleting all tasks++++++++++++++++++++++++
		$("#clear").on("click", function(){
			  var firebaseDeleteAllRef  = firebase.database().ref().child(name+uid+"/Tasks");
			  firebaseDeleteAllRef.remove();
			  $( ".scrolls" ).empty();
			  });
//=====================================================
//+++++++++++Clearing/deleting selected tasks++++++++++++++++++++++++
	  $("#clearSelected").on("click", function(){
        var firebaseDeleteRef = firebase.database().ref().child(name+uid+"/Tasks");
		var allCheckboxes=document.getElementsByClassName("tdCheckboxes");
			
			firebaseDeleteRef.on("value", function(snapshot){
			for(var key in snapshot.val()){
			 for(var i=0;i<allCheckboxes.length;i++){
				if(allCheckboxes[i].checked){
				  
				  var parentListId= document.getElementById(allCheckboxes[i].id).parentElement.id;
				  var toBeDeleted = document.getElementById(parentListId).innerText;
				  				  
				  if(snapshot.val()[key] === toBeDeleted){
    				  firebaseDeleteRef.child(key).remove();
						}
				  }
			}}
		 });
		 
		 $("strike").remove();
		 });
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 	 
			//******SERIOUSLY
					}); //This is ending of document.ready for main.html
			}
			else
			{
			console.log(user+" is not logged in");
			}
		
		});
	
});
