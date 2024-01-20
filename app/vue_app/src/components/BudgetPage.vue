<template>
    <div class="jumbotron">
        <h1 class="mt-4">Spese</h1>
        <div class="row">
            <div class="col-md">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="year" v-model="year">
                    <label for="year">Anno</label>
                </div>
            </div>
            <div class="col-md">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="month" v-model="month">
                    <label for="month">Mese</label>
                </div>
            </div>
            <div class="col-md">
                <div class="form-floating mb-3 dropdown position-relative">
                    <input type="text" class="form-control" id="query" v-model="query" @keyup="autocomplete">
                    <label for="query">Cerca una spesa</label>
                    <ul v-if="filteredItems.length > 0" class="dropdown-menu position-absolute d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                        <li v-for="item in filteredItems" :key="item._id" @click="findById(item._id)">
                            <a class="dropdown-item rounded-2">{{ item.desc }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>

        <div class="row">
            <p> Filtra per data </p>
            <div class="col-md-6">
                <button class="btn btn-one " @click="byYear">Per anno</button>
            </div>
            <div class="col-md-6">
                <button class="btn btn-one" @click="byYearMonth">Per anno e mese</button>
            </div>
        </div>

        
        <table class="table" >
            <thead>
                <tr class="tableth">
                    <th v-if="showDetails" class="tablethcol">Id</th>
                    <th class="tablethcol">Data</th>
                    <th class="tablethcol">Descrizione</th>
                    <th class="tablethcol">Categoria</th>
                    <th class="tablethcol">Quota personale</th>
                    <th class="tablethcol">Totale</th>
                    <th v-if="showDetails" class="tablethcol">Utenti</th>
                    <th class="tablethcol"></th>
                    <th class="tablethcol"></th>
                    <th class="tablethcol"></th>
                    <th class="tablethcol"></th>
                    <th class="tablethcol"></th>
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
                    <td>
                        <div v-if="showDetails">
                            <td v-for="(u, key) in tran.users" :key="key">{{ key }}: {{ u }}</td>
                        </div>
                    </td>
                    <td> <button class="btn btn-two" @click="deleteById(tran._id)">Elimina</button></td>
                    <td> <button class="btn btn-one" @click="modifyById(tran._id)">Modifica</button></td>
                    <td> <button class="btn btn-one" @click="expandById(tran._id)" v-if="!showDetails">Espandi</button></td>
                    <td> <button class="btn btn-one" @click="getTransactions()" v-if="showDetails">Comprimi</button></td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-two" @click="addTran">Aggiungi</button>
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
            console.log(err);
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

                this.transactions.forEach((tran) => {
                    tran.data = new Date(tran.data).toISOString().split('T')[0];
                });

                console.log(this.transactions);
            } catch (err) {
                console.log(err);
            }
        },
        async byYear() {
            try{
                const response = await axios.get(`api/budget/${this.year}`, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });

                this.transactions = response.data;
                this.transactions.forEach((tran) => {
                    tran.data = new Date(tran.data).toISOString().split('T')[0];
                });
            }catch(err){
                console.log(err);
            }
        },
        async byYearMonth() {
            try{
                const response = await axios.get(`api/budget/${this.year}/${this.month}`, {
                    withCredentials: true, // Include credentials (cookies) in the request
                });
                console.log(response.data);
                this.transactions = response.data;
                this.transactions.forEach((tran) => {
                    tran.data = new Date(tran.data).toISOString().split('T')[0];
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
                    tran.data = new Date(tran.data).toISOString().split('T')[0];
                });
                this.filteredItems=[];
            }catch(err){
                console.log(err);
            }

        },
        async modifyById(id) {
            try{
                const tran = this.transactions.find((tran) => tran._id === id);
                console.log(tran.costo);

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
                tran.year = new Date(tran.data).getFullYear();
                tran.month = new Date(tran.data).getMonth() + 1;
                const response = await axios.delete(`api/budget/${tran.year}/${tran.month}/${id}`, {
                    withCredentials: true,
                });
                console.log(response.data);
                this.getTransactions();
            }catch(err){
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
                    withCredentials: true, // Include credentials (cookies) in the request
                });
                console.log(response.data);
                this.filteredItems = response.data;
            }catch(err){
                    console.log(err);
                }
        },
    },
};
</script>

<style scoped lang ="scss">
@import '../assets/style.scss';

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
</style>
