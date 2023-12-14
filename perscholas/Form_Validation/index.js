document.addEventListener("DOMContentLoaded", function () {  
const register = document.getElementById("registration")
const username = register.elements["username"]
const email = register.elements["email"]
const password = register.elements["password"]
const passwordCheck = register.elements["passwordCheck"]
const terms = register.elements["terms"]
const login = document.getElementById("login")
const loginUsername = login.elements["username"]
const loginPassword = login.elements["password"]
const persist = login.elements["persist"]

//Event listener for Register form
register.addEventListener("submit", validateInput)

// Event listener for login form
login.addEventListener('submit', function (event) {
  event.preventDefault()

  const loginVal = validateLogin()
  if (loginVal) {
    
    console.log(persist.checked)
    const successMessage = 'Login successful'
    if (persist.checked) {
      alert(`${successMessage} - Keep me logged in checked`)
    } else {
      alert(successMessage)
    }
    login.reset() // Function to clear form fields
  }
})


function validateInput(event) {
  event.preventDefault()
  const nameVal = validateUsername()
  if (nameVal === false) {
    return false
  }

  const emailVal = validateEmail()
  if (emailVal === false) {
    return false
  }

  const passwordVal = validatePassword()
  if (passwordVal === false) {
    return false
  }

  const termsVal = validateTerms()
  if (termsVal === false) {
    return false
  }
  
  // Create a newUser to store their information converted to lowercase
  const newUser = {
    username: nameVal.toLowerCase(),
    email: emailVal.toLowerCase(),
    password: passwordVal,
  }

  // Store the new user object in an array in localStorage
  const users = JSON.parse(localStorage.getItem('users')) || []
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))

  alert(
    `Username: ${nameVal}
  Email: ${emailVal}
  Password: ${passwordVal}`)

  // Clear form fields
  register.reset()

  // Show success message
  alert('Registration successful!')

  //return true
}


  function validateUsername() {
    // //Check to see if username is already taken
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    // Convert to lowercase
    const enteredUsername = username.value.toLowerCase();
  
    const isUsernameTaken = storedUsers.some(user => user.username === enteredUsername)
    if (isUsernameTaken) {
      alert('That username is already taken')
      username.focus()
      return false
    }

    // Check if username is blank
    if (username.value === "") {
      alert("Please provide a username")
      username.focus()
      return false
    }

    // Check if username is at least four characters long
    if (username.value.length < 4) {
      alert("Username must be at least four characters long")
      username.focus()
      return false
    }

    // Check if the username has at least two unique character
    let uniqueChars = new Set(username.value)
    if (uniqueChars.size <2) {
      alert("Username must contain at least two unique characters")
      username.focus()
      return false
    }

    // Check if the username contains any special characters or whitespace
    let alphanum = /^[a-zA-Z0-9]+$/
    if (!alphanum.test(username.value)) {
      alert("Username cannot contain any special characters or whitespace")
      username.focus()
      return false
    }

    return username.value
  }

  function validateEmail(){
    // Check if email is blank
    if (email.value === "") {
      alert("Please provide an email")
      email.focus()
      return false
    }

    // Check if the email format is valid
    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailFormat.test(email.value)) {
      alert("Please provide a valid email address");
      email.focus()
      return false;
    }

    // Check if the email domain is not "example.com"
    if (email.value.toLowerCase().endsWith('@example.com')) {
      alert("Email from 'example.com' domain is not allowed")
      email.focus()
      return false
  }

    return email.value
  }

  function validatePassword() {
    // Check if the password is blank
    if (password.value === "") {
      alert("Please provide a password")
      password.focus()
      return false
    }

    // Check if the password length is at least 12 characters
    if (password.value.length < 12) {
      alert("Password must be at least 12 characters long")
    password.focus()
    return false   
    }

    //check for uppercase, lowercase, number, and special character
    let uppercase = /[A-Z]/
    let lowercase = /[a-z]/
    let number = /[0-9]/
    let specialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

    if (!uppercase.test(password.value) || !lowercase.test(password.value) || !number.test(password.value) || !specialChar.test(password.value)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      password.focus();
      return false;
    }

    // Check if the password contains the word "password" or the username
    if (password.value.toLowerCase().includes("password") || password.value.toLowerCase().includes(username.value.toLowerCase())) {
      alert("Password cannot contain the word 'password' or your username")
      password.focus()
      return false
    }
  
    // Check if both passwords match
    if (password.value !== passwordCheck.value) {
      alert("Passwords do not match")
      password.focus()
      return false
  }

  return password.value  
}

  function validateTerms() {
    if (!terms.checked) {
      alert("Please agree to the Terms of Use")
      terms.focus()
      return false
    }
  }

  // Validate username and password against localStorage for login
function validateLogin() {
  // Convert username to all lowercase
  const enteredUsername = loginUsername.value.toLowerCase(); 
  const enteredPassword = loginPassword.value;

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find(user => user.username === enteredUsername);

  if (!user) {
    alert('Username does not exist')
    return false;
  }

  if (user.password !== enteredPassword) {
    alert('Incorrect password')
    return false
  }
  // If all validation passes
  return true
}

})
