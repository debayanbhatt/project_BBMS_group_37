import React from 'react'


import $ from "jquery"
import { Link, Navigate } from "react-router-dom"



export default function LoginSignUp() {

    

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }


    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    function FormToJSON(ourForm) {


        const data = new FormData(ourForm);

        const formJSON = Object.fromEntries(data.entries());

        // for multi-selects, we need special handling

        return formJSON;

    }


    $(document).ready(function () {
        const signUp = document.querySelector("#SignUp");
        const signIn = document.querySelector("#SignIn");
        const container = document.querySelector("#container");


        function addAnimationClass() {
            container.classList.add('right-panel-active');
        }


        function removeAnimationClass() {
            container.classList.remove('right-panel-active');
        }


        signUp.addEventListener("click", addAnimationClass)


        signIn.addEventListener("click", removeAnimationClass)

        function addModalForm(e) {
            e.preventDefault()

            var ourFormJSON = FormToJSON(this);
            fetch('http://localhost:8075/api/users/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(FormToJSON(this))
            }).then(res => res.text())
                .then((res) => {

                   
          
                    if (res== "User already Present/not an employee" || res=="You are not an employee") {
                     
                      document.getElementById("Added").style.color = '#f00'
                        document.getElementById("Added").innerHTML = "User already Present/not an employee";
                    } else {
                     // console.log(res); 
                        document.getElementById("Added").style.color = '#1f1b9f'
                        document.getElementById("Added").innerHTML = "Thanks for registering.Login details has been shared with you.. ";
                        // document.querySelector('#loginform input[name="userName"]').value = ourFormJSON.userName;
                        // document.querySelector('#loginform input[name="password"]').value = ourFormJSON.password;

                        setTimeout(function () {
                            document.querySelector("#loginform button").click()
                        }, 700);
                    }
                });
        }


        document.getElementById("signupForm").addEventListener("submit", addModalForm);


        function LoginModalForm(e) {
            e.preventDefault()


            fetch('http://localhost:8075/api/users/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(FormToJSON(this))
            }).then(res => res.json())
                .then((res) => {



                  //document.getElementById("Loggedin").style.color = res;
                  document.getElementById("Loggedin").innerHTML = res.message;
                    if (res.message!=null) {
                        console.log(res.role)
                        setCookie("id", res.id, 10);
                        setCookie("username", res.username, 10);
                        setCookie("role", res.role, 10);
                        document.getElementById("Loggedin").style.color = '#1f1b9f'
                        document.getElementById("Loggedin").innerHTML = res.message;
                        setTimeout(function () {
                            window.location.href = "/dashboard"
                        }, 700);
                    } else {
                        document.getElementById("Loggedin").style.color = '#f00'
                        document.getElementById("Loggedin").innerHTML ="Check credentials";
                        setTimeout(function () {
                          window.location.href = "/"
                      }, 700);
                    }
                });
        }

        document.getElementById("loginform").addEventListener("submit", LoginModalForm);
    })

    const loginCss = `
    /*
    This files has all styles
*/
* {
  box-sizing: border-box;
}

/*====== Style for Body =====*/
body {
  font-family: Arial, sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -20px 0px 50px;
}
@media screen and (max-width: 750px) {
  body {
    margin: 5% 0px;
    background: white;
  }
}
@media screen and (max-height: 500px) {
  body {
    margin: 20% 0px;
  }
}

/*====== Style for h1 (title) =====*/
h1 {
  font-weight: bold;
  margin: 0;
}

/*====== Style for all p =====*/
p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

/*====== Style for all span =====*/
span {
  font-size: 12px;
}

/*====== General Style for links====*/
a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

/*====style for container ======*/
.container-form-login {
  background: white;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}
@media screen and (max-width: 750px) {
  .container-form-login {
    height: 90%;
    box-shadow: none;
    border-radius: 0px;
  }
}
#Added, #Loggedin{
  margin:10px 0;
}
@media screen and (max-height: 500px) {
  .container-form-login {
    height: 100%;
  }
}

/*==style for div form-area and all elements inside it===*/
.form-area {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}
@media screen and (max-width: 750px) {
  .form-area {
    width: 100%;
    height: 59%;
  }
}
@media screen and (max-height: 500px) {
  .form-area {
    height: 55%;
  }
}
.form-area form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.form-area .social-container {
  margin: 20px 0;
}
.form-area .social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
.form-area input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}
.form-area button {
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  border: 1px solid #1f1b9f;
  background: #1f1b9f; 
 
}
.form-area button:active {
  transform: scale(0.95);
}
.form-area button:focus {
  outline: none;
}

.ghost {
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  background: transparent;
  border-color: #fff;
}
.ghost:active {
  transform: scale(0.95);
}
.ghost:focus {
  outline: none;
}

.singin-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
@media screen and (max-width: 750px) {
  .singin-container {
    width: 100%;
  }
}

.singup-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
@media screen and (max-width: 750px) {
  .singup-container {
    width: 100%;
  }
}

.resetpassword-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.resetpassword-container h1 {
  margin-bottom: 5px;
}
@media screen and (max-width: 750px) {
  .resetpassword-container {
    width: 100%;
  }
}

/*======== Style for div overlay-container and the elements inside it=======*/
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
@media screen and (max-width: 750px) {
  .overlay-container {
    width: 100%;
    height: 39%;
    left: 0%;
    top: 60%;
  }
}
.overlay-container .overlay {
  background: #006700;
  background: linear-gradient(to right, #1f1b9f, #1f1b9f) no-repeat 0 0/cover;
  color: white;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-container .overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-container .overlay-right {
  right: 0;
  transform: translateX(0);
}
.overlay-container .overlay-left {
  transform: translateX(-20%);
}

/*======================= Styles for Animation =====================*/
.container-form-login.right-panel-active .singin-container {
  /*==== Move signin to the right ========*/
  transform: translateX(100%);
}
.container-form-login.right-panel-active .overlay-container {
  /*==== Move overlay to the left ========*/
  transform: translateX(-100%);
}
@media screen and (max-width: 750px) {
  .container-form-login.right-panel-active .overlay-container {
    transform: none;
  }
}
.container-form-login.right-panel-active .singup-container {
  /*==== Hidde signin and show signup ========*/
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}
@media screen and (max-width: 750px) {
  .container-form-login.right-panel-active .singup-container {
    transform: translateX(0);
  }
}
.container-form-login.right-panel-active .overlay {
  transform: translateX(50%);
}
.container-form-login.right-panel-active .overlay-left {
  transform: translateX(0);
}
.container-form-login.right-panel-active .overlay-right {
  transform: translateX(20%);
}
    `;

    return (
        <div>
            {(() => {
            if (getCookie("role") !== "" && getCookie("id") !== "" && getCookie("username") !== ""){
                return (
                    <div>
                     <Navigate to="/dashboard"/>
                    </div>
                )
            }
            
            return null;
            })()}
            <style>
                {loginCss}
            </style>
            <div className="container-form-login" id="container">

                <div className="form-area singup-container">
                    <form id="signupForm" method="post">
                        <h1>Create Account</h1>

                        {/* <span>Or use your email for registration</span> */}
                        <input type="email" placeholder="email" name="email"/>
                        <input type="text" placeholder="username" name="userName"/>
                        <input type="text" placeholder="phone" name="phone" pattern="[0-9]{10}"/>
                        <input type="password" placeholder="password" name="password"/>
                        <input type="hidden" name="role" value="Doctor"/>
                        <button>Sign Up</button>
                        <p id="Added"></p>
                        <Link to="/" className='btn text-info' type='button'>Back to Home</Link>
                    </form>


                </div>

                <div className="form-area singin-container">
                    <form action="" method="post" id="loginform" >
                        <h1>Sign in</h1>

                        {/* <span>Or use your account</span> */}
                        <input type="text" placeholder="username" name="userName" required/>
                        <input type="password" placeholder="password" name="password" required/>
                        <button >Sign in</button>
                        <p id="Loggedin"></p>

                        <Link to="/" className='btn text-info' type='button'>Back to Home</Link>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome</h1>
                            <p>
                                If you already have an account login with your personal info
                            </p>
                            <button className="ghost" id="SignIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Register</h1>
                            <p>Enter your personal details and create an account</p>
                            <button className="ghost" id="SignUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
