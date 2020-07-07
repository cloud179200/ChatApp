const components = {}
components.registerScreen = `
<div class="register-container">
<div class="register-form">
  <div class="title">VA chat</div>
  <form id="form-register">
    <div class="name-wrapper">
      <div class="input-wrapper">
        <input type="text" name="firstName" placeholder="First name...">
        <div class="error" id="error-first-name"></div>
      </div> 
      <div class="input-wrapper">
        <input type="text" name="lastName" placeholder="Last name...">
        <div class="error" id="error-last-name"></div>
      </div> 
    </div>
    <div class="input-wrapper">
      <input type="text" name="email" placeholder="Email..." >
      <div class="error" id="error-email-name"></div>
    </div> 
    <div class="input-wrapper">
      <input type="password" name="password" placeholder="Password..." >
      <div class="error" id="error-password-name"></div>
    </div> 
    <div class="input-wrapper">
      <input type="password" name="confirmPassword" placeholder="Confirm password..." >
      <div class="error" id="error-confirm-password-name"></div>
    </div> 
    <div class="submit-wrapper">
      <div>Already have an account ? <span class="cursor-pointer" id="redirect-to-login">Login</span></div>
      <button class="btn" type="submit">Register</button>
    </div>
  </form>
</div>
</div>
`

components.loginScreen = `
<div class="login-container">
<div class="login-form">
  <div class="title">VA chat</div>
    <form action="" id="form-login">
      <div class="input-wrapper">
        <input type="text" name="email" placeholder="Email...">
        <div class="error" id="error-email-name"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password...">
        <div class="error" id="error-password-name"></div>
      </div>
      <div class="submit-wrapper">
        <div>You dont have account? <span class="cursor-pointer" id="redirect-to-register">Register</span></div>
        <button class="btn" type="submit">Login</button>
        </div>
    </form>
</div>
</div>
`
components.chatScreen = `
<div class="chat-header"><div class="content-header"> Viet Anh Chat App</div><span id="signOutBtn"><i class="fas fa-sign-out-alt"></i></span></div>
<div class="chat-container">
      <div class="aside-right">
        <div class="list-conversation">
          <div class="conversation current">
            <div class="conversation-title">Title conver</div>
            <div class="conversation-num-users">2 user</div>
          </div>
          <div class="conversation">
            <div class="conversation-title">Title conver</div>
            <div class="conversation-num-users">2 user</div>
          </div>
        </div>
      </div>
      <div class="main">
          <div class="conversation-detail">
              <div class="conversation-title">First conversation</div>
              <div class="list-message">
              </div>
              <form action="" id="sendMessageForm">
                  <input class="input" type="text" name="message" placeholder="Type a message..." autocomplete="off">
                  <button class="btn"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
              </form>
          </div>
      </div>
  </div>
`