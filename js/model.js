const model = {};
model.currentUser = undefined;
model.collection = "conversations";
model.currentConversation = undefined;

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
        view.setActiveScreen("welcomeScreen");
      } else alert("Email not verified");
    })
    .catch((err) => {
      alert(err.message);
    });
};

model.loadConversations = () => {
    firebase.firestore().collection(model.collection).where("users", "array-contains", model.currentUser.email).get()
    .then((res) => {
      const data = utils.getDataFromDocs(res.docs);
      if (data.length > 0) {
        model.currentConversation = data[0];
        view.showCurrentConversation();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

model.updateCurrentConversation = (message) => {
    let dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message),
    };
    let db = firebase.firestore().collection(model.collection).doc(model.currentConversation.id);
    db.update(dataToUpdate);
};
model.listenConversationChange = () => {
    let isFirstRun = false
    firebase.firestore().collection(model.collection).where("users", "array-contains", model.currentUser.email).onSnapshot((res) => {
        if(isFirstRun){
            isFirstRun = true;
            return 
        }
        else{
            const docChanges = res.docChanges();
            for (oneChange of docChanges) {
                const type = oneChange.type;
                const oneChangeData = utils.getDataFromDoc(oneChange.doc);
                if(oneChangeData.id === model.currentConversation.id){
                    model.currentConversation = oneChangeData
                    console.log(model.currentConversation)
                    view.addMessage(oneChangeData.messages[oneChangeData.messages.length - 1])
                }
            } 
        }
    })
};
