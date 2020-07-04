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
    case "welcomeScreen":
      document.getElementById("app").innerHTML = components.welcomeScreen;
      document.getElementById("welcome").innerHTML =
        model.currentUser.displayName + " - " + model.currentUser.email;

      var logoutBtn = document.getElementById("logoutBtn");
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        firebase.auth().signOut();
        view.setActiveScreen("loginScreen");
        alert("Your are logged out");
      });
      var chatBtn = document.getElementById("chat");
      chatBtn.addEventListener("click", (e) => {
        e.preventDefault();
        view.setActiveScreen("chatScreen");
      });
      break;
    case "chatScreen":
      document.getElementById("app").innerHTML = components.chatScreen;
      const sendMessageForm = document.querySelector("#sendMessageForm");
      model.loadConversations();
      sendMessageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (sendMessageForm.message.value != "") {
          const message = {
            owner: "1851060380@e.tlu.edu.vn",
            content: sendMessageForm.message.value,
            createdat: new Date().toISOString()
          };
          view.addMessage(message);
          model.updateCurrentConversation(message)
          document.getElementById("sendMessageForm").reset();
          var listMessage = document.querySelector(".list-message");
          listMessage.scrollTop = listMessage.scrollHeight;
        }
      });
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
