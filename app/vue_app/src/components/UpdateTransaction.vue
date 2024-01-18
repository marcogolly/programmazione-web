<template>
    <h1>Update Transaction</h1>
    <form @submit.prevent="updateTransaction">
            <label for="data">Data:</label>
            <input id="data" v-model="transaction.data" type = "date" />
            <label for="desc">desc:</label>
            <input id="desc" v-model="transaction.desc" />
            <label for="cat">Category:</label>
            <input id="cat" v-model="transaction.cat" />
            <label for="costo">Cost:</label>
            <input id="costo" v-model="transaction.costo" />
            <label for="users">Users:</label>
            <div v-for="(user, index) in transaction.users" :key="index">
                <label :for="'user-name-' + index">User Name:</label>
                <input :id="'user-name-' + index" v-model="user.name" />
                <label :for="'user-quota-' + index">Quota:</label>
                <input :id="'user-quota-' + index" v-model="user.quota" />
            </div>
            <button type="button" @click="addUser">Add User</button>

            <button type="submit">Confirm</button>
            <p> {{ error }} </p>                           
    </form>
</template>

<script>
import axios from 'axios';
import {formatTransaction} from '../assets/utils.js';

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
                error: '',
            };
    },
    mounted(){
        try{
            this.byId();
        }catch(err){console.log(err)}
    },
    methods: {
        async byId() {
            try{
                const id = this.$route.params.id;
                const year = this.$route.params.year;
                const month = this.$route.params.month;
                const response = await axios.get(`api/budget/${year}/${month}/${id}`, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });
                this.transaction = response.data[0];

                console.log(this.transaction);
                this.transaction.data = new Date(this.transaction.data).toISOString().split('T')[0];
                this.transaction.users = Object.keys(this.transaction.users).map(key => {
                    return { name: key, quota: this.transaction.users[key] };
                });
                console.log(this.transaction);
            }catch(err){
                console.log(err)
            }
        },
        async updateTransaction(){
            try{
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
            }
            catch(err){
                console.log(err)
                this.error = err.response.data;
            }
        },
        addUser() {
            this.transaction.users.push({name: '', quota: ''});
        },
    },
};
</script>