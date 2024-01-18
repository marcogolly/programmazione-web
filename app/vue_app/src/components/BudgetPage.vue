<template>
    <div>
        <h1>transactions</h1>
        <input id="year" v-model="year"/>
        <input id="month" v-model="month"/>
        <button @click="byYear">byyear</button>
        <button @click="byYearMonth">byyear and bymonth</button>
        <input id="query" v-model="query" @keyup="autocomplete" />

        <div class="dropdown">
            <ul>
                <li v-for="item in filteredItems" :key="item._id" @click="findById(item._id)">
                    {{ item.desc }}
                </li>
            </ul>
        </div>
        <table>
            <thead>
                <tr>
                    <th v-if="showDetails">Id</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Quota</th>
                    <th>Amount</th>
                    <th v-if="showDetails" >Users</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tran in transactions" :key="tran._id">
                    <td v-if="showDetails">{{ tran._id }} </td>
                    <td>{{ tran.data }}</td>
                    <td>{{ tran.desc }}</td>
                    <td>{{ tran.cat }}</td>
                    <td>{{ tran.users[user] }}</td>
                    <td>{{ tran.costo }}</td>
                    <div v-if="showDetails">
                        <td v-for="(u, key) in tran.users" :key="key">{{ key }}: {{ u }}</td>
                    </div>
                    <td> <button @click="deleteById(tran._id)"> delete </button></td>
                    <td> <button @click="modifyById(tran._id)"> modify </button></td>
                    <td> <button @click="expandById(tran._id)" v-if="!showDetails"> expand </button></td>
                    <td> <button @click="getTransactions()" v-if="showDetails"> compress </button></td>
                </tr>
            </tbody>
        </table>
        <button @click="addTran"> add</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            transactions: null,
            year: '',
            month: '',
            query: '',
            filteredItems: [],
            user: '',
            showDetails: false,
        };
    },
    mounted() {
        try {
            this.isLogged();
            this.getTransactions();
        } catch (err) {
            console.log(err)
        }
    },
    methods: {
        async getTransactions() {
            try {
                this.showDetails = false;
                const response = await axios.get('api/budget', {
                    withCredentials: true, // Include credentials (cookies) in the request
                });

                this.transactions = response.data;

                this.transactions.forEach(tran => {
                    tran.data = new Date(tran.data).toISOString().split('T')[0];
                });


                console.log(this.transactions);
            } catch (err) {
                console.log(err);
            }
        },
        async byYear() {
            const response = await axios.get(`api/budget/${this.year}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });

            this.transactions = response.data;
        },
        async byYearMonth() {
            const response = await axios.get(`api/budget/${this.year}/${this.month}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            console.log(response.data);
            this.transactions = response.data;
        },
        async findById(id) {
            await this.getTransactions();
            const tran = this.transactions.find(tran => tran._id === id);
            
            this.transactions = [tran];
        },
        async modifyById(id) {
            const tran = this.transactions.find(tran => tran._id === id);
            console.log(tran.costo);

            this.$router.push('/BudgetPage/UpdateTransaction/' + id);
        },
        async expandById(id) {
            const tran = this.transactions.find(tran => tran._id === id);
            this.showDetails = true;
            this.transactions = [tran];
        },
        async deleteById(id) {
            const tran = this.transactions.find(tran => tran._id === id);
            tran.year = new Date(tran.data).getFullYear();
            tran.month = new Date(tran.data).getMonth() + 1;
            const response = await axios.delete(`api/budget/${tran.year}/${tran.month}/${id}`, {
                withCredentials: true
            });
            console.log(response.data);
            this.getTransactions();
        },
        async isLogged() {
            // todo
            const response = await axios.get('/api/budget/whoami', {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            console.log(response.data);
            if (!response.data) {
                this.$router.push('/LoginForm');
            }
            else{
                this.user=response.data.username;
            }
        },
        async addTran() {
            this.$router.push('/AddTransaction');
        },
        async autocomplete() {
            const response = await axios.get(`/api/budget/search?q=${this.query}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            console.log(response.data);
            this.filteredItems=response.data;
        }
    }
};
</script>