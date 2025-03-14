<header>
  <nav>
    <a href="#home" class="header-link"><h3>Eat This!</h3></a>
    <menu>
      <li>
        <a href="#home">Home</a>
        <div class="bar"></div>
      </li>
      <li>
        <a href="#search">Search</a>
        <div class="bar"></div>
      </li>
      <li>
        <a href="#login">Login</a>
        <div class="bar"></div>
      </li>
      <li>
        <a href="#userhub">User Hub</a>
        <div class="bar"></div>
      </li>
    </menu>
  </nav>
</header>

<style>
  header {
    background-color: var(--primary-color);
  }
  nav {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    align-items: center;
    gap: 15px;
  }
  h3 {
    margin: 0;
  }
  menu {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
    font-size: small;
    a {
      text-decoration: none;
      color: white;
    }
  }

  li {
    position: relative;
    .bar {
      position: absolute;
      transform: scaleX(0%);
      width: 100%;
      height: 2px;
      background-color: white;
      transition: all ease 0.2s;
      bottom: -4;
    }
    &:hover {
      .bar {
        transform: scaleX(100%);
      }
    }
  }
  .header-link {
    text-decoration: none;
    color: white;
  }
</style>
