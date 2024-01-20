<template>
    <div>
        <form @submit.prevent="updateTransaction" class="jumbotron">
            <h1 class="mt-4">Aggiorna spesa</h1>
            <div class="form-floating mb-3">
                <input id="data" v-model="transaction.data" type="date" class="form-control" />
                <label for="data">Data</label>
            </div>
            <div class="form-floating mb-3">
                <input id="desc" v-model="transaction.desc" class="form-control" />
                <label for="desc">Descrizione</label>
            </div>
            <div class="form-floating mb-3">
                <input id="cat" v-model="transaction.cat" class="form-control" />
                <label for="cat">Categoria</label>
            </div>
            <div class="form-floating mb-3">
                <input id="costo" v-model="transaction.costo" class="form-control" />
                <label for="costo">Costo</label>
            </div>
            <hr class="my-4"> <!-- Add separator here with Bootstrap class -->
            <div class="form-group">
                <label for="users">Utenti</label>
                <div v-for="(user, index) in transaction.users" :key="index" class="row">
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            
                            <input :id="'user-name-' + index" v-model="user.name" @keyup="autocomplete(index)" class="form-control" />
                            <label :for="'user-name-' + index">Username</label>
                            <ul v-if="filteredItems[index]" class="dropdown-menu position-absolute d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                <li v-for="item in filteredItems[index]" :key="item.username" @click="completeUser(item.username,index)">
                                    <a class="dropdown-item rounded-2">{{ item.username }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating mb-3">

                            <input :id="'user-quota-' + index" v-model="user.quota" class="form-control" />
                            <label :for="'user-quota-' + index">Quota</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-3 p-3 ">
                <button type="button" @click="addUser" class="btn btn-one px-2 ">Aggiungi utente</button>
                <button type="button" @click="removeUser" class="btn btn-one px-2">Rimuovi utente</button>
            </div>
            <br>
            <button type="submit" class="btn btn-two">Conferma</button>
            <p class="text-danger"> {{ errore }} </p>  
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import { formatTransaction } from '../assets/utils.js';

export default {
    name: 'UpdateTransaction',
    data() {
        return {
            transaction: {
                data: '',
                desc: '',
                cat: '',
                costo: '',
                users: [],
            },
            errore: '',
            filteredItems: [],

        };
    },
    mounted() {
        try {
            this.byId();
            //TODO CHECK LOG IN
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        async byId() {
            try {
                const id = this.$route.params.id;
                const year = this.$route.params.year;
                const month = this.$route.params.month;
                const response = await axios.get(`api/budget/${year}/${month}/${id}`, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });
                this.transaction = response.data[0];

                console.log(this.transaction);
                this.transaction.data = new Date(this.transaction.data).toISOString().split('T')[0];
                this.transaction.users = Object.keys(this.transaction.users).map((key) => {
                    return { name: key, quota: this.transaction.users[key] };
                });
                console.log(this.transaction);
            } catch (err) {
                console.log(err);
            }
        },
        async updateTransaction() {
            try {
                let updatedTransaction = null;
                updatedTransaction = await formatTransaction(this.transaction);
                console.log(updatedTransaction);

                const id = this.$route.params.id;
                const year = updatedTransaction.data.getFullYear();
                const month = updatedTransaction.data.getMonth() + 1;

                const response = await axios.put(`api/budget/${year}/${month}/${id}`, updatedTransaction, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });
                console.log(response.data);

                this.$router.push('/BudgetPage');
            } catch (err) {
                console.log(err);
                this.errore = err.response.data;
            }
        },
        addUser() {
            this.transaction.users.push({ name: '', quota: '' });
        },
        removeUser() {
            this.transaction.users.pop();
        },
        async autocomplete(i) {
            try{
                const response = await axios.get(`api/users/search?q=${this.transaction.users[i].name}`, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });
                this.filteredItems[i] = response.data;
            }catch(err){
                console.log(err);
            }
        },
        async completeUser(text, i){
            this.transaction.users[i].name = text;
            this.filteredItems[i]=null;
        }
    },
};
</script>

<style scoped lang ="scss">
@import '../assets/style.scss';

.container {
    max-width: 600px;
    margin: 0 auto;
}
</style>
