<template>
    <div>
        <h1>balance</h1>
        <div class="form-group">
                <label for="query">Balance with another user</label>
                <input id="query" v-model="query" @keyup="autocomplete" class="form-control" style="width: 200px; display: inline-block;" />
                <div class="dropdown">
                    <ul class="dropdown-menu">
                        <li v-for="item in filteredItems" :key="item.username" @click="balanceById(item.username)">
                            <a class="dropdown-item">{{ item.username }}</a>
                        </li>
                    </ul>
                </div>
        </div>
        <br><br><br>
        <table class="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>attivo</th>
                    <th>passivo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tran in transactions" :key="tran.id">
                    <td>{{ tran.data }}</td>
                    <td>{{ tran.desc }}</td>
                    <td>{{ tran.cat }}</td>
                    <td>{{ tran.quota }}</td>
                    <td>{{ tran.other_quota }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

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
                    withCredentials: true, // Include credentials (cookies) in the request
                });

                this.transactions = response.data;

                this.transactions.forEach((tran) => {
                    tran.data = new Date(tran.data).toISOString().split('T')[0];
                });
            } catch (err) {
                console.log(err);
            }
        },

        async isLogged() {
            const response = await axios.get('/api/budget/whoami', {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            console.log(response.data);
            if (!response.data) {
                this.$router.push('/LoginForm');
            } else {
                this.user = response.data.username;
            }
        },
        async byUser() {
            const response = await axios.get(`api/balance/${this.user}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            this.transactions = response.data;

            this.transactions.forEach((tran) => {
                    tran.data = new Date(tran.data).toISOString().split('T')[0];
                });
            console.log(this.transactions);
        },
        async autocomplete() {
            const response = await axios.get(`api/users/search?q=${this.query}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });

            this.filteredItems = response.data;
            console.log(this.filteredItems);
        },
        async balanceById(id) {
            const response = await axios.get(`api/balance/${id}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });

            this.transactions = response.data;

            this.transactions.forEach((tran) => {
                    tran.data = new Date(tran.data).toISOString().split('T')[0];
                });
        },
    },
};
</script>

<style scoped>
.dropdown-menu {
    display: block;
}
</style>
