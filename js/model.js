const model = {};
model.currentUser = undefined;
model.collectionName = "conversations";
model.currentConversation = undefined;
model.conversations = undefined;
model.register = (firstName, lastName, email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase.auth().currentUser.sendEmailVerification();
      alert("Register success! Please check your email");
      firebase.auth().currentUser.updateProfile({
        displayName: firstName + " " + lastName,
      });
      view.setActiveScreen("loginScreen");
    })
    .catch((err) => {
      alert(err);
    });
};

model.login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      if (user.user.emailVerified) {
        alert("Success");
        model.currentUser = {
          displayName: user.user.displayName,
          email: user.user.email,
        };
        view.setActiveScreen("chatScreen");
      } else alert("Email not verified");
    })
    .catch((err) => {
      alert(err.message);
    });
};
model.loadConversations = () => {
  firebase.firestore().collection(model.collectionName).where("users", "array-contains", model.currentUser.email).get().then((res) => {
      const data = utils.getDataFromDocs(res.docs);
      model.conversations = data;
      if (data.length > 0) {
        model.currentConversation = data[0];
        view.showCurrentConversation();
      };
      view.showConversations();
    })
    .catch((err) => {
      console.log(err);
    });
};
model.updateCurrentConversation = (message) => {
  let dataToUpdate = {
    messages: firebase.firestore.FieldValue.arrayUnion(message),
  };
  firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpdate);
};
model.listenConversationChange = () => {
  let isFirstRun = false;
  firebase.firestore().collection(model.collectionName).where("users", "array-contains", model.currentUser.email).onSnapshot((res) => {
      if(!isFirstRun) {
        isFirstRun = true;
        return;
      }
      const docChanges = res.docChanges();
      for (oneChange of docChanges) {
        const type = oneChange.type;
        console.log(type);
        const oneChangeData = utils.getDataFromDoc(oneChange.doc);
        if(type === "modified"){
          if(oneChangeData.id == model.currentConversation.id){
            model.currentConversation = oneChangeData;
          }
          for(let i = 0; i < model.conversations.length; i++) {
            const element = model.conversations[i]
            if(element.id === oneChangeData.id){
              model.conversations[i] = oneChangeData
              if(oneChangeData.messages[oneChangeData.messages.length - 1].owner 
                !== model.currentUser.email) {
                view.showNotify(oneChangeData.id)
              }
            }
          }
        }
        else if (type === "added"){
          if(model.conversations.filter((item) => item.id == oneChangeData.id).length > 0){
            for(let i = 0; i < model.conversations.length; i++) {
              if(model.conversations[i].id === oneChangeData.id){
                model.conversations[i] = oneChangeData;
                if(oneChangeData.messages[oneChangeData.messages.length - 1].owner !== model.currentUser.email) {
                  view.showNotify(oneChangeData.id)
                }
              }
            }
          }
          else{
            model.conversations.push(oneChangeData);
          };
        };
        view.showConversations();
        view.showCurrentConversation();
      };
    });
};

model.changeCurrentConversation = (conversationId) => {
  model.currentConversation = model.conversations.filter((item) => item.id == conversationId)[0];
};

model.createConversation = (conversation) =>{
  firebase.firestore().collection(model.collectionName).add(conversation).then( res => {
    let conversationId = res.id;
    firebase.firestore().collection(model.collectionName).doc(conversationId).update({
      id: conversationId
    }).then(res => {
      console.log("Add conversation success!");
    }).catch(err => {
      console.log(err);
    });
  }).catch(err => {
    console.log(err);
  });
};

model.addUserToCurrentConversation = (userEmail) => {
  let dataToUpdate = {
    users: firebase.firestore.FieldValue.arrayUnion(userEmail)
  };
  firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpdate);
};
