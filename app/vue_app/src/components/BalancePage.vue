<template>
    <div class="jumbotron">
        <h1 class="mt-4">Balance</h1>
        <div >
            <div class="col-md">
                <div class="form-floating mb-3">
                    <input type="text" id="query" v-model="query" @keyup="autocomplete" class="form-control" />
                    <label for="query">Search user</label>
                </div>
                <ul v-if="filteredItems.length > 0" class="dropdown-menu position-absolute d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                    <li v-for="item in filteredItems" :key="item.username" @click="balanceById(item.username)">
                        <a class="dropdown-item rounded-2">{{ item.username }}</a>
                    </li>
                </ul>
            </div>


        </div>
        <br><br><br>
        <table class="table">
            <thead>
                <tr class="tableth">
                    <th class="tablethcol">Date</th>
                    <th class="tablethcol">Description</th>
                    <th class="tablethcol">Category</th>
                    <th class="tablethcol">Credit</th>
                    <th class="tablethcol">Debit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tran in transactions" :key="tran.id">
                    <td>{{ tran.date }}</td>
                    <td>{{ tran.desc }}</td>
                    <td>{{ tran.cat }}</td>
                    <td>{{ tran.dare }}</td>
                    <td>{{ tran.avere }}</td>
                </tr>
                    
                <tr>
                    
                    <td v-if="calculateTotal() >0" colspan="4" style="text-align: right;"><strong>Total:</strong></td>
                    <td v-if="calculateTotal() <=0" colspan="3" style="text-align: right;"><strong>Total:</strong></td>
                    <td> <strong>{{ Math.abs(calculateTotal()) }}</strong></td>
                    <td v-if="calculateTotal() <=0"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { getUser } from '../assets/utils.js';

export default {
    data() {
        return {
            transactions: null,
            filteredItems: [],
            query: '',
        };
    },
    mounted() {
        try {
            this.isLogged();
            this.getTransactions();
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        async getTransactions() {
            try {
                const response = await axios.get('api/balance', {
                    withCredentials: true,  
                });

                this.transactions = response.data;

                this.transactions.forEach((tran) => {
                    tran.date = new Date(tran.date).toISOString().split('T')[0];
                });
            } catch (err) {
                console.log(err);
            }
        },

        async isLogged() {
            try{
                const user= await getUser();
                if (!user) {
                    this.$router.push('/LoginForm');
                } else {
                    this.user = user.username;
                }
            }catch(err){
                console.log(err);
            }
        },
        async byUser() {
            try{
                const response = await axios.get(`api/balance/${this.user}`, {
                    withCredentials: true,  
                });
                this.transactions = response.data;

                this.transactions.forEach((tran) => {
                        tran.date = new Date(tran.date).toISOString().split('T')[0];
                    });
            }catch(err){
            console.log(err);
        }
        },
        async autocomplete() {
            try{
                const response = await axios.get(`api/users/search?q=${this.query}`, {
                    withCredentials: true,  
                });

                this.filteredItems = response.data;
            }catch(err){
                console.log(err);
            }
        },
        async balanceById(id) {
            try{
                const response = await axios.get(`api/balance/${id}`, {
                    withCredentials: true,  
                });

                this.transactions = response.data;

                this.transactions.forEach((tran) => {
                        tran.date = new Date(tran.date).toISOString().split('T')[0];
                    });
                this.filteredItems=[];
            }catch(err){
                console.log(err);
            }
        },
        calculateTotal() {
                try{
                let total = 0;
                this.transactions.forEach((tran) => {
                    if(tran.avere){
                    total += -tran.dare + tran.avere;
                    }
                    else{
                        total -=tran.dare;
                    }
                });
                return total;
            }catch(err){     
                //ignore          
            }
        }
    },
};
</script>

<style scoped >
@import '../assets/style.css';

.dropdown-menu {
    display: block;
}
.table{
    background-color: #b39b4d45;
    border-color: #1e2f23;
}
.btn-two{
    background-color: #607744;
    border-color: #607744;
    color: #FFFFFF;
}
.btn-two:hover{
    background-color: #768948;
    border-color: #768948;
}
table td{
    background-color: transparent;
}
table th{
    background-color: transparent;
}
tr:nth-child(even) {
    background-color: #b39b4d37;
}

.nav-link:hover{
    cursor: pointer;
    background-color: #607744;
}
h1{
    font-weight: 500;
}

.dropdown-menu{
    background-color: #1e2f23;
}
.dropdown-item{
    color: #FFFFFF;
}
.dropdown-item:active{
    color: #FFFFFF;
    background-color: #607744;
}
.tableth{
    background-color: #1e2f23;
}

.tablethcol {
    color: #FFFFFF;
}
</style>
