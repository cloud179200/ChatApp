
const view = {}
view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case 'registerScreen' :
      document.getElementById('app').innerHTML = components.registerScreen
      const registerForm = document.getElementById('form-register')
      registerForm.addEventListener('submit', (e) =>{
        e.preventDefault()
        const registerInfo = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value,
        }
        controller.register(registerInfo)
      })
      //redirect loginScreen when click 
      const redirectLogin = document.getElementById('redirect-to-login')
      redirectLogin.addEventListener('click', (e) => {
        view.setActiveScreen('loginScreen')
      })

      break;
    case 'loginScreen':
      document.getElementById('app').innerHTML = components.loginScreen;
      const loginForm = document.getElementById('form-login')
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email =  loginForm.email.value
        const password = loginForm.password.value
        controller.login(email, password)
      })
      const redirectRegister = document.getElementById('redirect-to-register')
      redirectRegister.addEventListener('click', (e) => {
        view.setActiveScreen('registerScreen')
      })   
      break;
    case 'welcomeScreen':
      document.getElementById('app').innerHTML = components.welcomeScreen;
      document.getElementById('welcome').innerHTML = model.currentUser.displayName+" - "+model.currentUser.email;

      var logoutBtn = document.getElementById("logoutBtn")
      logoutBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        firebase.auth().signOut();
        view.setActiveScreen('loginScreen');
        alert("Your are logged out");
      });
      break;
  }
}

view.setErrorMessage = (elementId, message) => {
  document.getElementById(elementId).innerHTML = message;
}