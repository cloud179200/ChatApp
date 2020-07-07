const view = {};
view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case "registerScreen":
      document.getElementById("app").innerHTML = components.registerScreen;
      const registerForm = document.getElementById("form-register");
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const registerInfo = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value,
        };
        controller.register(registerInfo);
      });
      //redirect loginScreen when click
      const redirectLogin = document.getElementById("redirect-to-login");
      redirectLogin.addEventListener("click", (e) => {
        view.setActiveScreen("loginScreen");
      });

      break;
    case "loginScreen":
      document.getElementById("app").innerHTML = components.loginScreen;
      const loginForm = document.getElementById("form-login");
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        controller.login(email, password);
      });
      const redirectRegister = document.getElementById("redirect-to-register");
      redirectRegister.addEventListener("click", (e) => {
        view.setActiveScreen("registerScreen");
      });
      break;
    case "chatScreen":
      document.getElementById("app").innerHTML = components.chatScreen;
      const sendMessageForm = document.querySelector("#sendMessageForm");
      sendMessageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (sendMessageForm.message.value != "") {
          const message = {
            owner: model.currentUser.email,
            content: sendMessageForm.message.value,
            createdat: new Date().toISOString()
          };
          model.updateCurrentConversation(message);
          model.listenConversationChange();
          document.getElementById("sendMessageForm").reset();
          listMessage = document.querySelector(".list-message");
          listMessage.scrollTop = listMessage.scrollHeight;
        }
      });

      const signOutBtn = document.querySelector("#signOutBtn");
      signOutBtn.addEventListener("click", (e) => {
        firebase.auth().signOut();
      });
      model.loadConversations();
      break;
  }
};

view.setErrorMessage = (elementId, message) => {
  document.getElementById(elementId).innerHTML = message;
};

view.addMessage = (message) => {
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message");
  if (message.owner === model.currentUser.email) {
    messageWrapper.classList.add("mine");
    messageWrapper.innerHTML = `<div class="content">${message.content}</div>`;
  } else {
    messageWrapper.classList.add("their");
    messageWrapper.innerHTML = `<div class="owner">${message.owner}</div>
    <div class="content">${message.content}</div>`;
  }
  document.querySelector(".list-message").appendChild(messageWrapper);
};

view.showCurrentConversation = () => {
  for (let oneMessage of model.currentConversation.messages) {
    view.addMessage(oneMessage);
  }
};

view.addConversation = (conversation) => {
  const conversationWrapper = document.createElement('div');
  conversationWrapper.classList.add("conversation");
  if(conversation.id === model.currentConversation.id){
    conversationWrapper.classList.add("current");
  }
  conversationWrapper.innerHTML =`
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-users">${model.currentConversation.users.length}</div>
  `
  document.querySelector('list-conversations').appendChild(conversationWrapper);
}
