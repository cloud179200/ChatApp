const components = {}
components.welcomeScreen = `
  <div id="welcome"></div>
  <button id="logoutBtn">Logout</button>
`
components.registerScreen = `
<div class="register-container">
<div class="register-form">
  <div class="title">MindX chat</div>
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
  <div class="title">MindX chat</div>
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