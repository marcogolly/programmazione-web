<template>
  <div>
        <nav>
            <ul>
                <li @click="navigateTo('/')">Home</li>
                <li @click="navigateTo('LoginForm')">Login</li>
                <li @click="navigateTo('RegisterForm')">Register</li>
                <li @click="navigateTo('BudgetPage')">Budget</li>

            </ul>
        </nav>
    </div>
  <RouterView :session="session"></RouterView>
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
