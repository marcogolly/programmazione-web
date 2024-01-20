<template>
    <div class="container">
        <div class="jumbotron">
            <form @submit.prevent="addTransaction">
                <h1 class="mt-4">Aggiungi spesa</h1>
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
    </div>
</template>



<script>
import axios from 'axios';
import {formatTransaction} from '../assets/utils.js';
export default {
    name: 'AddTransaction',
    data() {
        return {
            transaction: {
                desc: '',
                cat: '',
                costo: '',
                //TODO default user with max cost
                users: [{name: '', quota: ''}],
            },
            errore: '',
            filteredItems: [],
        };
    },
    mounted() {
        this.addUser();
        //TODO CHECK LOG IN
    },
    methods: {
        async addTransaction() {
            try {
                let newTransaction = await formatTransaction(this.transaction);
                console.log(newTransaction);

                const year = newTransaction.data.getFullYear();
                const month = newTransaction.data.getMonth() + 1;

                const response = await axios.post(`api/budget/${year}/${month}`, newTransaction, {
                    withCredentials: true,
                });
                console.log(response.data);
                this.$router.push('/BudgetPage');
            } catch (error) {
                console.error(error);
                this.errore = error.response.data;
            }
        },

        addUser() {
            this.transaction.users.push({name: '', quota: ''});
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
            try{
                this.transaction.users[i].name = text;
                this.filteredItems[i]=null;
            }catch(err){
                console.log(err);
            }
        }

    },
}; 
</script>

<style scoped lang ="scss">
@import '../assets/style.scss';
.container{
    width: 70%;
}
</style>