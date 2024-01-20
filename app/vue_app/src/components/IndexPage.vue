<template>
    <div class="container">
        <div class="jumbotron">
            <h1 v-if="!user" class="display-4">Benvenuto nell'app!</h1>
            <h1 v-if="user" class="display-4">Bentornato, {{ user }}!</h1>

            <p class="lead">
                Questa web app ti permette di gestire le tue spese e registrare transazioni
            </p>

            <div class="d-flex justify-content-center">
                <router-link to="/LoginForm" class="btn btn-one me-2">
                    Clicca qui per effettuare il login
                </router-link>
                <router-link to="/RegisterForm" class="btn btn-outline-two">
                    Clicca qui per registrarti
                </router-link>
            </div>
            
            <p class="lead py-4">
                Dopo aver effettuato il login, puoi utilizzare la pagina Balance per visualizzare i tuoi crediti e debiti con gli altri utenti. Inoltre, puoi utilizzare la
                la pagina Budget per registrare transazioni e visualizzare le tue spese
            </p>
            <div class="d-flex justify-content-center">
                <router-link to="/BudgetPage" class="btn btn-one me-2" type="button">
                    Budget
                </router-link>
                <router-link to="/BalancePage" class="btn btn-outline-two" type="button">
                    Balance
                </router-link>
            </div>
            <p class="lead">
                Per navigare tra le varie pagine puoi utilizzare la navbar in alto
            </p>
        </div>
    </div>
</template>

<script>
import { getUser } from '../assets/utils.js';

export default {
    data() {
        return {
            user: '',
        };
    },
    mounted() {
        this.getLoggedUser();
    },
    methods: {
        async getLoggedUser() {
            try{
                this.user = await getUser();
            }catch(err){
                console.log(err);
            }
        },
    },
}
</script>

<style scoped lang ="scss">
@import '../assets/style.scss';
</style>
