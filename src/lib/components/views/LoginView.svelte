<script>
  function handleLogin(e) {}
  function handleSignup(e) {}
</script>

<h1>Login/Signup</h1>

<form onsubmit={handleLogin}>
  <label>Username</label>
  <input type="text" name="username" placeholder="Username" />
  <lable>Email</lable>
  <input type="email" name="email" placeholder="Email" />
  <button class="secondary-button" type="button">Sign up</button>
  <button>Log in</button>
</form>

<style>
  form {
  }
  input {
    height: 20px;
  }
</style>
