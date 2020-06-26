window.onload = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyCbl5wpcR9MMhv0JCTYDBAfpGu_45ipT5A",
    authDomain: "chatapp-7c893.firebaseapp.com",
    databaseURL: "https://chatapp-7c893.firebaseio.com",
    projectId: "chatapp-7c893",
    storageBucket: "chatapp-7c893.appspot.com",
    messagingSenderId: "40243688939",
    appId: "1:40243688939:web:379e519a04f207a03495ae"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log(firebase.app().name);
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      if(user.emailVerified){
        model.currentUser = {
          displayName: user.displayName,
          email: user.email
        }
        view.setActiveScreen('welcomeScreen')
      }
      else {
        view.setActiveScreen('loginScreen');
      }
    }
    else{
      view.setActiveScreen('loginScreen');
    }
  });
}