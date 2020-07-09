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
        if (sendMessageForm.message.value.trim() != "") {
          let messageValue = sendMessageForm.message.value;
          const message = {
            owner: model.currentUser.email,
            content: messageValue,
            createdat: new Date().toISOString()
          };
          model.updateCurrentConversation(message);
          model.listenConversationChange();
        }
        document.getElementById("sendMessageForm").reset();
      });

      const newConversationBtn =  document.querySelector("#newConversationBtn");
      newConversationBtn.addEventListener('click', (e) => {
        view.setActiveScreen("createConversationScreen");
      });


      const signOutBtn = document.querySelector("#signOutBtn");
      signOutBtn.addEventListener("click", (e) => {
        firebase.auth().signOut();
      });

      model.loadConversations();
      break;

      case "createConversationScreen":
        document.getElementById("app").innerHTML = components.createConversationScreen;
        
        const backToChat = document.querySelector("#back-to-chat");
        backToChat.addEventListener("click", ()=>{
          document.getElementById("app").innerHTML = components.chatScreen;
      const sendMessageForm = document.querySelector("#sendMessageForm");
      
      sendMessageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (sendMessageForm.message.value.trim() != '') {
          const message = {
            owner: model.currentUser.email,
            content: sendMessageForm.message.value,
            createdat: new Date().toISOString()
          };
          model.updateCurrentConversation(message);
          model.listenConversationChange();
          }
          document.getElementById("sendMessageForm").reset(); 
        });

          const newConversationBtn =  document.querySelector("#newConversationBtn");
          newConversationBtn.addEventListener('click', (e) => {
            view.setActiveScreen("createConversationScreen");
          });


          const signOutBtn = document.querySelector("#signOutBtn");
          signOutBtn.addEventListener("click", (e) => {
            firebase.auth().signOut();
          });
          view.showConversation();
          view.showCurrentConversation();
        });
      break;
  }
};

view.setErrorMessage = (elementId, message) => {
  document.getElementById(elementId).innerHTML = message;
};

view.showCurrentConversation = () => {
  document.querySelector(".list-message").innerHTML = ``;
  for (let oneMessage of model.currentConversation.messages) {
      view.addMessage(oneMessage);
  }
};
view.showConversation = () =>{
  for(conversation of model.conversations){
    view.addConversation(conversation)
  }
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
  
  const listMessage = document.querySelector(".list-message");
  listMessage.appendChild(messageWrapper);
  listMessage.scrollTop = listMessage.scrollHeight;
};
view.addConversation = (conversation) => {
  const conversationWrapper = document.createElement('div');
  conversationWrapper.classList.add("conversation");
  
  if(conversation.id === model.currentConversation.id){
    conversationWrapper.classList.add("current");
  }
  
  conversationWrapper.innerHTML =`
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-users">${model.currentConversation.users.length} Member</div>
  `
  conversationWrapper.setAttribute("id", conversation.id);
  document.querySelector('.list-conversation').appendChild(conversationWrapper);



  let conversationId = conversation.id;
  document.getElementById(conversationId).addEventListener('click', () => {
    document.querySelector(".current").classList.remove("current");
    document.getElementById(conversationId).classList.add('current');
    model.changeCurrentConversation(conversationId);
    view.showCurrentConversation();
  });
}
