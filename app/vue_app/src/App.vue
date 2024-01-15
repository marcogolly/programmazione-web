<template>
  <h1> hi</h1>
  <RouterView :session="session" @login = "login" @logout = "logout"></RouterView>
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
};

</script>
