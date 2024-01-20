<template>
  <div class="cover-container d-flex p-3 mx-auto flex-column">
    <header class="mb-auto">
    <nav>
      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li class="nav-link px-6 text-white p-4" @click="navigateTo('/')">
          <a class="nav-link px-2 text-white">Home</a>
        </li>
        <li class="nav-link px-6 text-white p-4" @click="navigateTo('/LoginForm')">
          <a class="nav-link px-2 text-white">Accedi</a>
        </li>
        <li class="nav-link px-6 text-white p-4" @click="navigateTo('/RegisterForm')">
          <a class="nav-link px-2 text-white">Registrati</a>
        </li>
        <li class="nav-link px-6 text-white p-4" @click="navigateTo('/BudgetPage')">
          <a class="nav-link px-2 text-white">Budget</a>
        </li>
        <li class="nav-link px-6 text-white p-4" @click="navigateTo('/BalancePage')">
          <a class="nav-link px-2 text-white">Balance</a>
        </li>

      </ul>
    </nav>
  </header>
  <body>
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

<style lang='scss'>
@import 'assets/style.scss';
.mb-auto{
  background-color: #1e2f23;
}


</style>