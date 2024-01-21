<template>
    <div class="container">
        <div class="jumbotron">
            <form @submit.prevent="addTransaction">
                <h1 class="mt-4">Add Expense</h1>
                <div class="form-floating mb-3">
                    <input id="date" v-model="transaction.date" type="date" class="form-control" />
                    <label for="date">Date</label>
                </div>
                <div class="form-floating mb-3">
                    <input id="desc" v-model="transaction.desc" class="form-control" />
                    <label for="desc">Description</label>
                </div>
                <div class="form-floating mb-3">
                    <input id="cat" v-model="transaction.cat" class="form-control" />
                    <label for="cat">Category</label>
                </div>
                <div class="form-floating mb-3">
                    <input id="cost" v-model="transaction.cost" @blur="updateCost()" class="form-control" />
                    <label for="cost">Cost</label>
                </div>
                <hr class="my-4"> <!-- Add separator here with Bootstrap class -->
                <div class="form-group">
                    <label for="users">Users</label>
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
                    <button type="button" @click="addUser" class="btn btn-one px-2 ">Add User</button>
                    <button type="button" @click="removeUser" class="btn btn-one px-2">Remove User</button>
                </div>
                <br>
                <button type="submit" class="btn btn-two">Confirm</button>
                <p class="text-danger"> {{ error }} </p>  
            </form>
        </div>
    </div>
</template>



<script>
import axios from 'axios';
import {formatTransaction, getUser} from '../assets/utils.js';
export default {
    name: 'AddTransaction',
    data() {
        return {
            transaction: {
                desc: '',
                cat: '',
                cost: '',
                users: [],
            },
            error: '',
            filteredItems: [],
        };
    },
    mounted() {
        this.isLogged();
    },
    methods: {
        async addTransaction() {
            try {
                let newTransaction = await formatTransaction(this.transaction);

                const year = newTransaction.date.getFullYear();
                const month = newTransaction.date.getMonth() + 1;
                
                console.log(newTransaction);
                await axios.post(`api/budget/${year}/${month}`, newTransaction, {
                    withCredentials: true,
                });
                this.$router.push('/BudgetPage');
            } catch (error) {
                console.error(error);
                this.error = error.response.data;
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
                    withCredentials: true,  
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
        },
        async isLogged() {
            try{
                const user= await getUser();
                if (!user) {
                    this.$router.push('/LoginForm');
                } else {
                    this.transaction.users.push({name: user.username, quota: ''});
                }
            }catch(err){
                    console.log(err);
                }
        },
        updateCost() {
            if(this.transaction.users.length===1 && !this.transaction.users[0].quota){
                this.transaction.users[0].quota = this.transaction.cost;
            }
        }
    },
}; 
</script>

<style>
@import '../assets/style.css';
.container{
    width: 70%;
}
</style>