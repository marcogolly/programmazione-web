<template>
    <div class="jumbotron">
        <h1 class="mt-4">Bilancio</h1>
        <div >
            <div class="col-md">
                <div class="form-floating mb-3">
                    <input type="text" id="query" v-model="query" @keyup="autocomplete" class="form-control" />
                    <label for="query">Cerca utente </label>
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
                    <th class="tablethcol">Data</th>
                    <th class="tablethcol">Descrizione</th>
                    <th class="tablethcol">Categoria</th>
                    <th class="tablethcol">Attivo</th>
                    <th class="tablethcol">Passivo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tran in transactions" :key="tran.id">
                    <td>{{ tran.data }}</td>
                    <td>{{ tran.desc }}</td>
                    <td>{{ tran.cat }}</td>
                    <td>{{ tran.dare }}</td>
                    <td>{{ tran.avere }}</td>
                </tr>
                    
                <tr>
                    
                    <td      colspan="4" style="text-align: right;"><strong>Totale:</strong></td>
                    <td>{{ calculateTotal() }}</td>
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
            try{
                const response = await axios.get('/api/budget/whoami', {
                    withCredentials: true, // Include credentials (cookies) in the request
                });
                console.log(response.data);
                if (!response.data) {
                    this.$router.push('/LoginForm');
                } else {
                    this.user = response.data.username;
                }
            }catch(err){
                console.log(err);
            }
        },
        async byUser() {
            try{
                const response = await axios.get(`api/balance/${this.user}`, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });
                this.transactions = response.data;

                this.transactions.forEach((tran) => {
                        tran.data = new Date(tran.data).toISOString().split('T')[0];
                    });
                console.log(this.transactions);
            }catch(err){
            console.log(err);
        }
        },
        async autocomplete() {
            try{
                const response = await axios.get(`api/users/search?q=${this.query}`, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });

                this.filteredItems = response.data;
                console.log(this.filteredItems);
            }catch(err){
                console.log(err);
            }
        },
        async balanceById(id) {
            try{
                const response = await axios.get(`api/balance/${id}`, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });

                this.transactions = response.data;

                this.transactions.forEach((tran) => {
                        tran.data = new Date(tran.data).toISOString().split('T')[0];
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
                console.log(err);
            }
        }
    },
};
</script>

<style scoped lang ="scss">
@import '../assets/style.scss';

.dropdown-menu {
    display: block;
}
</style>
