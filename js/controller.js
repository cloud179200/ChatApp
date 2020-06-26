const controller = {}
controller.register = (registerInfo) => {

  if (registerInfo.firstName === '') {
    view.setErrorMessage('error-first-name','Please input first name')
  }
  else view.setErrorMessage('error-first-name','')
  if(registerInfo.lastName === ''){
    view.setErrorMessage('error-last-name', 'Please input last name')
  }
  else view.setErrorMessage('error-last-name', '')
  if(registerInfo.email === ''){
    view.setErrorMessage('error-email-name', 'Please input email')
  }
  else  view.setErrorMessage('error-email-name', '')
  if(registerInfo.password === ''){
    view.setErrorMessage('error-password-name','Password incorrect')
  }
  else view.setErrorMessage('error-password-name','')
  if(registerInfo.confirmPassword === '' || (registerInfo.password !== '' && registerInfo.confirmPassword !== registerInfo.password)){
    view.setErrorMessage('error-confirm-password-name','Confirm password incorrect')
  }
  else view.setErrorMessage('error-confirm-password-name','')
  if (registerInfo.firstName !== '' && registerInfo.lastName !== '' && registerInfo.email !== '' && registerInfo.password != '' && registerInfo.password === registerInfo.confirmPassword){
    model.register(registerInfo.firstName, registerInfo.lastName, registerInfo.email, registerInfo.password)
  }
}
controller.login = (email, password) => {

  if(email === '') {
    view.setErrorMessage('error-email-name','Email missing')
  }
  else view.setErrorMessage('error-email-name','')
  if(password === ''){
    view.setErrorMessage('error-password-name','Password incorrect')
  }
  else view.setErrorMessage('error-password-name','')
  if(password !== '' && email !== '') model.login(email, password);
}

