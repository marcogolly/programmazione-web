<template>
    <div class="jumbotron">
        <h1 class="mt-4">Expenses</h1>
        <div class="p-3">
            <button class="btn btn-two" @click="showFilterDate()"> Filter by date </button>
            <button class="btn btn-two" @click="showFilterTran()"> Search a transaction </button>
        </div>
        <div class="row g-3 md-10" v-if="filterDate">
            <div class="col-md-2">
                <label for="year">Select Year:</label>
                <select v-model="year" id="year" name="year" class="form-select" @change="byYearMonth()" style="width: 80%;">
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
            </div>
            <div class="col-md-2">
                <label for="month">Select Month:</label>
                <select v-model="month" id="month" name="month" class="form-select" @change="byYearMonth()" style="width: 80%;">
                    <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
                </select>
            </div>
        </div>

        <div class="row g-3" v-if="filterTran">
            <div class="col-md-4">
                <div class="form-floating mb-3 dropdown position-relative">
                    <input type="text" class="form-control" id="query" v-model="query" @keyup="autocomplete">
                    <label for="query">Search for an expense</label>
                    <ul v-if="filteredItems.length > 0" class="dropdown-menu position-absolute d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                        <li v-for="item in filteredItems" :key="item._id" @click="findById(item._id)">
                            <a class="dropdown-item rounded-2">{{ item.desc }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
            

        
        <table class="table" >
            <thead>
                <tr class="tableth">
                    <th v-if="showDetails" class="tablethcol">User</th>
                    <th v-if="showDetails" class="tablethcol">Id</th>
                    <th class="tablethcol">Date</th>
                    <th class="tablethcol">Description</th>
                    <th class="tablethcol">Category</th>
                    <th class="tablethcol">Personal quota</th>
                    <th class="tablethcol">Total</th>
                    <th v-if="showDetails" class="tablethcol">Users</th>
                    <th class="tablethcol"></th>
                    <th class="tablethcol"></th>
                    <th class="tablethcol"></th>
                    <th class="tablethcol"></th>
                    <th class="tablethcol"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tran in transactions" :key="tran._id">
                    <td v-if="showDetails">{{ tran.user }} </td>
                    <td v-if="showDetails">{{ tran._id }} </td>
                    <td>{{ tran.date }}</td>
                    <td>{{ tran.desc }}</td>
                    <td>{{ tran.cat }}</td>
                    <td>{{ tran.users[user] }}</td>
                    <td>{{ tran.cost }}</td>
                    <td>
                        <div v-if="showDetails">
                            <td v-for="(u, key) in tran.users" :key="key">{{ key }}: {{ u }}</td>
                        </div>
                    </td>
                    <td> <button class="btn btn-two" @click="deleteById(tran._id)">Delete</button></td>
                    <td> <button class="btn btn-one" @click="modifyById(tran._id)">Modify</button></td>
                    <td> <button class="btn btn-one" @click="expandById(tran._id)" v-if="!showDetails">Expand</button></td>
                    <td> <button class="btn btn-one" @click="getTransactions()" v-if="showDetails">Collapse</button></td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-two" @click="addTran">Add</button>
    </div>
</template>

<script>
import axios from 'axios';
import { getUser, getYears, getMonths } from '../assets/utils.js';

export default {
    data() {
        return {
            transactions: null,
            year: '',
            month: '',
            query: '',
            filteredItems: [],
            user: '',
            filterDate: false,
            filterTran: false,

        };
    },
    mounted() {
        try {
            this.isLogged();
            this.getTransactions();
            this.years = getYears();
            this.months = getMonths();
            this.filterDate=false;
            this.filterTran=false;
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        async getTransactions() {
            try {
                this.showDetails = false;
                const response = await axios.get('api/budget', {
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
        async byYear() {
            try{
                if (this.year ==='---'){
                    this.getTransactions();
                    return;
                }
                const response = await axios.get(`api/budget/${this.year}`, {
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
        async byYearMonth() {
            try{
                
                if (this.month ==='' || this.year ==='' || this.year==='---'){
                    this.byYear();
                    return;
                }
                const response = await axios.get(`api/budget/${this.year}/${this.month}`, {
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
        async findById(id) {
            try{
                await this.getTransactions();
                
                const tran = this.transactions.find((tran) => tran._id === id);

                this.transactions = [tran];
                this.transactions.forEach((tran) => {
                    tran.date = new Date(tran.date).toISOString().split('T')[0];
                });
                this.filteredItems=[];
            }catch(err){
                console.log(err);
            }

        },
        async modifyById(id) {
            try{
                this.$router.push('/BudgetPage/UpdateTransaction/' + id);
            }catch(err){
                    console.log(err);
                }
        },
        async expandById(id) {
            try{
                const tran = this.transactions.find((tran) => tran._id === id);
                this.showDetails = true;
                this.transactions = [tran];
            }catch(err){
                    console.log(err);
                }
        },
        async deleteById(id) {
            try{
                const tran = this.transactions.find((tran) => tran._id === id);
                tran.year = new Date(tran.date).getFullYear();
                tran.month = new Date(tran.date).getMonth() + 1;
                await axios.delete(`api/budget/${tran.year}/${tran.month}/${id}`, {
                    withCredentials: true,
                });
                this.getTransactions();
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
                    this.user = user.username;
                }
            }catch(err){
                    console.log(err);
                }
        },
        async addTran() {
            try{

                this.$router.push('/AddTransaction');
            }catch(err){
                    console.log(err);
                }
        },
        async autocomplete() {
            try{
                if (this.query===''){
                    this.filteredItems=[];
                    return;
                    
                }
                const response = await axios.get(`/api/budget/search?q=${this.query}`, {
                    withCredentials: true,  
                });
                this.filteredItems = response.data;
            }catch(err){
                    console.log(err);
                }
        },
        async showFilterDate() {
            this.filterDate = !this.filterDate;
            this.filterTran = false;
        },
        async showFilterTran() {
            this.filterTran = !this.filterTran;
            this.filterDate = false;
        },
    },
};
</script>

<style scoped >
@import '../assets/style.css';

.row {
    margin-bottom: 10px;
}

.dropdown {
    margin-bottom: 10px;
}

.table {
    margin-bottom: 10px;
}

.btn {
    margin-right: 5px;
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
