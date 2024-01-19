<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="mb-auto">
    <nav class="p-3 text-bg-dark">
      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li class="nav-link px-2 text-white" @click="navigateTo('/')">
          <a class="nav-link px-2 text-white">Home</a>
        </li>
        <li class="nav-link px-2 text-white" @click="navigateTo('/LoginForm')">
          <a class="nav-link px-2 text-white">Login</a>
        </li>
        <li class="nav-link px-2 text-white" @click="navigateTo('/RegisterForm')">
          <a class="nav-link px-2 text-white">Register</a>
        </li>
        <li class="nav-link px-2 text-white" @click="navigateTo('/BudgetPage')">
          <a class="nav-link px-2 text-white">Budget</a>
        </li>
        <li class="nav-link px-2 text-white" @click="navigateTo('/BalancePage')">
          <a class="nav-link px-2 text-white">Balance</a>
        </li>

      </ul>
    </nav>
  </header>
  <body class="form-signin w-100 m-auto">
    <RouterView :session="session"></RouterView>

  </body>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const session = ref(null);

    const login = (userSession) => {
      session.value = userSession;
    };

    const logout = () => {
      session.value = null;
    };


    return {
      session,
      login,
      logout,
    };
  },
  methods: {
        navigateTo(component) {
            this.$router.push(component);
        },
    },
};
</script>
