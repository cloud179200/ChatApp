const components = {};
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
`;

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
`;
components.chatScreen = `
<div class="header" id="chat-header"><div class="content-header">Chat App</div><span id="signOutBtn"><i class="fas fa-sign-out-alt"></i></span></div>
<div class="chat-container">
      <div class="aside-left">
        <div class="list-conversation">
        </div>
        <form action="" id="form-create-conversation">
        <div class="input-wrapper">
          <input type="text" name="conversationName" placeholder="Conversation name..." autocomplete="off">
          <div class="error" id="conversation-name-error"></div>
        </div>
        <div class="input-wrapper">
          <input type="text" name="friendEmail" placeholder="Friend email..." autocomplete="off">
          <div class="error" id="friend-email-error"></div>
        </div>
        <div class="submit-wrapper">
          <button type="submit" class="btn">Tạo</button>
        </div>
      </form>
      </div>
      <div class="main">
          <div class="conversation-detail">
              <div class="current-conversation-title">First conversation</div>
              <div class="list-message">
              </div>
              <form action="" id="sendMessageForm">
                  <input class="input" type="text" name="message" placeholder="Type a message..." autocomplete="off">
                  <button class="btn"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
              </form>
          </div>
      </div>
      <div class="aside-right">
        <div class="list-user">
        </div>
        <form action="" id="form-add-user">
          <div class="input-wrapper">
            <input type="text" name="userEmail" placeholder="Enter user email..." autocomplete="off">
            <div class="error" id="add-user-email-error"></div>
          </div>
          <div class="submit-wrapper">
            <button type="submit" class="btn">Thêm</button>
          </div>
        </form>
      </div>
  </div>
`;