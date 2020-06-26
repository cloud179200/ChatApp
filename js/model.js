const model = {}
model.currentUser = undefined

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

