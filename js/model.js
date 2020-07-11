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

model.updateCurrentConversation = (message) => {
  let dataToUpdate = {
    messages: firebase.firestore.FieldValue.arrayUnion(message),
  };
  firebase
    .firestore()
    .collection(model.collectionName)
    .doc(model.currentConversation.id)
    .update(dataToUpdate);
};
model.listenConversationChange = () => {
  firebase
    .firestore()
    .collection(model.collectionName)
    .where("users", "array-contains", model.currentUser.email)
    .onSnapshot((res) => {
      const docChanges = res.docChanges();
      for (oneChange of docChanges) {
        const oneChangeData = utils.getDataFromDoc(oneChange.doc);
        if (oneChangeData.id == model.currentConversation.id) {
          model.currentConversation = oneChangeData;
          view.showConversations();
          view.showCurrentConversation();
        }
        for (let i = 0; i < model.conversations.length; i++) {
          if (model.conversations[i].id == oneChangeData.id) {
            model.conversations[i] = oneChangeData;
          }
        }
      }
    });
};

model.loadConversations = () => {
  firebase
    .firestore()
    .collection(model.collectionName)
    .where("users", "array-contains", model.currentUser.email)
    .get()
    .then((res) => {
      const data = utils.getDataFromDocs(res.docs);
      if (data.length > 0) {
        if (model.currentConversation == undefined) {
          model.currentConversation = data[0];
        }
        model.conversations = data.sort((a, b) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        view.showConversations();
        view.showCurrentConversation();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
model.changeCurrentConversation = (conversationId) => {
  model.currentConversation = model.conversations.filter(
    (item) => item.id == conversationId
  )[0];
};

model.createConversation = (conversation) =>{
  firebase.firestore().collection(model.collectionName).add(conversation).then( res => {
    let conversationId = res.id;
    firebase.firestore().collection(model.collectionName).doc(conversationId).update({
      id: conversationId
    }).then(res => {
      view.setActiveScreen("chatScreen");
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
  console.log("done");
  firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpdate);
  view.setActiveScreen("chatScreen");
};
