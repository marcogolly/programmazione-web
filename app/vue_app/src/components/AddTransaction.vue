<template>
    <div>
        <form @submit.prevent="addTransaction" class="jumbotron bg-light">
            <h1 class="mb-4">Add Transaction</h1>
            <div class="form-group">
                <label for="data">Data:</label>
                <input id="data" v-model="transaction.data" type="date" class="form-control" />
            </div>
            <div class="form-group">
                <label for="desc">Description:</label>
                <input id="desc" v-model="transaction.desc" class="form-control" />
            </div>
            <div class="form-group">
                <label for="cat">Category:</label>
                <input id="cat" v-model="transaction.cat" class="form-control" />
            </div>
            <div class="form-group">
                <label for="costo">Cost:</label>
                <input id="costo" v-model="transaction.costo" class="form-control" />
            </div>

            <div v-for="(user, index) in transaction.users" :key="index">
                <div class="form-group">
                    <label :for="'user-name-' + index">User Name:</label>
                    <input :id="'user-name-' + index" v-model="user.name" class="form-control" />
                </div>
                <div class="form-group">
                    <label :for="'user-quota-' + index">Quota:</label>
                    <input :id="'user-quota-' + index" v-model="user.quota" class="form-control" />
                </div>
            </div>
            <div class="mb-3">
                <button type="button" @click="addUser" class="btn btn-primary px-2">Add User</button>

                <button type="button" @click="removeUser" class="btn btn-primary px-2">Remove User</button>
            </div>
            <br>
            <button type="submit" class="btn btn-success">Confirm</button>
        </form>
    </div>
    <p class="text-danger"> {{ errore }} </p>  
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
                users: [],
            },
            errore: '',
        };
    },
    mounted() {
        this.addUser();
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
    },
};
</script>