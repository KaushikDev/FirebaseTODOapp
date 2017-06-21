

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
	         const signinG = document.getElementById("google");
		 const signout = document.getElementById("signout");
		 const signup = document.getElementById("signup");
		 const getIndexDiv = document.getElementById("index");
		 const getMainDiv = document.getElementById("main");
		 const registeredName = document.getElementById("nameReg");
		 const registeredEmail = document.getElementById("emailReg");
		 const registeredpassword = document.getElementById("passwordReg");
		 const getRegisterDiv = document.getElementById("registerDIV");
		 const register = document.getElementById("register");
		 const cancel = document.getElementById("cancel");
		 var provider = new firebase.auth.GoogleAuthProvider();
		
	
	if(signin){
		 signin.addEventListener('click', e=>{
		    
		     const user = email.value;
			 const pass = password.value;
			 
			 //validating user credentials
			 if(user!="" && pass!=""){
			document.getElementById("emailReq").innerHTML =  "";
			document.getElementById("passReq").innerHTML =  ""; 
			const auth = firebase.auth();
			 const promise = auth.signInWithEmailAndPassword(user, pass).then(function(){
			  window.location.reload(true);
			 });
		      promise.catch(e => 
	          document.getElementById("signinError").innerHTML = "Please recheck your credentials OR login using google OR signup for the application.")
		 }
			  else if(user==""){
				  
				document.getElementById("emailReq").innerHTML =  "Please enter your email";  
			  }
		 else if(pass==""){
			 document.getElementById("emailReq").innerHTML =  "";
			 document.getElementById("passReq").innerHTML =  "Please enter your password"; 
		 }
				
				   });
			}
		 
	         //trying the login with google inside this block
	        if(signinG){
		 google.addEventListener('click', e=>{
			 firebase.auth().signInWithPopup(provider).then(function(result) {
 			 // This gives you a Google Access Token. You can use it to access the Google API.
  			var token = result.credential.accessToken;
			  // The signed-in user info.
			  var user = result.user;
			  // ...
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
	         //finished with google's signin code
	             
	
	
		 if(signup){
		 
		 signup.addEventListener('click', e=>{
		 getMainDiv.classList.add('hidden');
		 getIndexDiv.classList.add('hidden');
		 getRegisterDiv.classList.remove('hidden');
		 registeredEmail.value='';
		 registeredpassword.value='';
		 registeredName.value='';
		 });
		 
		 }
		 
		  if(cancel){
		 
		 cancel.addEventListener('click', e=>{
		 getMainDiv.classList.add('hidden');
		 getIndexDiv.classList.remove('hidden');
		 getRegisterDiv.classList.add('hidden');
		 registeredEmail.value='';
		 registeredpassword.value='';
		 registeredName.value='';
		 });
		 
		 }
		 
		 
		 
        if(register){
		 register.addEventListener('click', e=>{
		       
			 const nameUser = registeredName.value;   
		     const user = registeredEmail.value;
			 const pass = registeredpassword.value;
			 
			 
			 if(nameUser!="" && user!="" && pass!="" && pass.length>=7){
				 document.getElementById("regnameReq").innerHTML = "";
				 document.getElementById("regemailReq").innerHTML = "";
				 document.getElementById("regpassReq").innerHTML = "";
				 
				 
			 const auth = firebase.auth();
			 const promise = auth.createUserWithEmailAndPassword(user, pass).then(function(){
			 window.location.reload(true);
			 //updatig user name
			 var user = firebase.auth().currentUser;
			 
			 user.updateProfile({
				displayName: registeredName.value,
				photoURL: "https://putyourlinkhere.com.jpeg"
				}).then(function() {
				console.log("Update successful.");
				}, function(error) {
				console.log("An error happened.");
				});
			 
			 
			 
			 });
		      promise.catch(e => 
			  
			  //alert(e.message)
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
			

			if(signout){
             signout.addEventListener('click', e=>{
			 //$("li").remove();
		     firebase.auth().signOut();
			
		 });
		  }
		  
	  
		  
		 
			firebase.auth().onAuthStateChanged(firebaseUser =>{
			if(firebaseUser){
			console.log(firebaseUser);
			getMainDiv.classList.remove('hidden');
			getIndexDiv.classList.add('hidden');
			getRegisterDiv.classList.add('hidden');
			
			
			//avoidin manual refresh
			//window.location.href="index.html";
			//
		    //******Retrieveing, adding, deleting tasks
			
			
			$(document).ready(function(){	
			//location.reload();
			//$( ".scrolls" ).empty();
			
			//get the current user's info here//
			const auth = firebase.auth();
			var user = firebase.auth().currentUser;
			var name, uid, email;

            //getting authenticated user's id(you can use current user's id as well)
            if (firebaseUser != null) {
            uid = firebaseUser.uid; 
			name = firebaseUser.displayName;
			email = firebaseUser.email;
             }
			//==========================
			
			//Display User's Name on Screen
			document.getElementById("welcome").innerHTML = "Hi "+name+ ", Welcome!";
			   
			
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
	 });
			//******SERIOUSLY
			}
			else
			{
			console.log(firebaseUser+" is not logged in");
			getMainDiv.classList.add('hidden');
			getIndexDiv.classList.remove('hidden');
			getRegisterDiv.classList.add('hidden');
			
			
			document.getElementById("password").value = '';
		    }
		
		});
			

});

