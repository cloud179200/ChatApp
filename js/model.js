const model = {}
model.currentUser = undefined
model.collection = 'conversations'
model.currentConversation = undefined


model.register = (firstName, lastName, email, password) =>{
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log(user);
        firebase.auth().currentUser.sendEmailVerification();
        alert("Register success! Please check your email");
        firebase.auth().currentUser.updateProfile({
            displayName: firstName+" "+lastName,
        });
        view.setActiveScreen('loginScreen');
    }).catch((err) => {
        alert(err);
    })
}

model.login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) =>{
        console.log(user);
        if(user.user.emailVerified) {
            alert("Success");
            model.currentUser = {
                displayName: user.user.displayName,
                email: user.user.email,
            }
            view.setActiveScreen("welcomeScreen");
        }
        else alert("Email not verified")
    }).catch((err)=>{
        alert(err.message);
    })
}

model.loadConversations = () =>{
    firebase.firestore().collection(model.collection).get().then(res => {
        const data = utils.getDataFromDocs(res.docs);
        if(data.length > 0){
            model.currentConversation = data[0];
            console.log(model.currentConversation)
            view.showCurrentConversation()
        }
    }).catch(err => {
        console.log(err)
    })
    model.updateCurrentConversation();
}

model.updateCurrentConversation = (message) => {
    if(model.currentConversation != undefined){
        let db = firebase.firestore().collection(model.collection).doc(model.currentConversation.id)
        db.update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
        })
    }
}
