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
};
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
};

controller.validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

controller.createConversation = ({title, friendEmail}) => {
  view.setErrorMessage("conversation-name-error", title === "" ? "Please insert conversation name": '');
  view.setErrorMessage("friend-email-error", friendEmail === '' ? "Please input friend email": '');
  view.setErrorMessage("friend-email-error", controller.validateEmail(friendEmail) == false ? "Wrong email" : "");

  if(title != '' && friendEmail != '' && controller.validateEmail(friendEmail) == true){
    model.createConversation({
      title: title,
      users: [friendEmail, model.currentUser.email],
      createdAt: new Date().toISOString(),
      messages:[]
    });
  };
};

controller.addUserToCurrentConversationForm = (userEmail) => {
  view.setErrorMessage("user-email-error", controller.validateEmail(userEmail) == false ? "Wrong email": "");
  console.log("..........");

  if(userEmail != "" && controller.validateEmail(userEmail) == true){
    model.addUserToCurrentConversation(userEmail);
  }
}

