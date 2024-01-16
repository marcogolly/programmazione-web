<template>
    <div>
        <h1>transactions</h1>
        <input id="year" v-model="year"/>
        <input id="month" v-model="month"/>
        <button @click="byYear">byyear</button>
        <button @click="byYearMonth">byyear and bymonth</button>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Users</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tran in transactions" :key="tran.id" @click="byId(tran._id)">
                    <td>{{ tran._id }}</td>
                    <td>{{ tran.year }}</td>
                    <td>{{ tran.month }}</td>
                    <td>{{ tran.desc }}</td>
                    <td>{{ tran.cat }}</td>
                    <td>{{ tran.costo }}</td>
                    <td>{{ tran.users }}</td>
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
        };
    },
    mounted() {
        try{
        //this.isLogged();
        this.getTransactions();
        }catch(err){console.log(err)}
    },
    methods: {
        async getTransactions() {
            try{
            const response = await axios.get('api/budget', {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            
            this.transactions = response.data;
            console.log(this.transactions);
            }
            catch(err){
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
            
            this.transactions = response.data;
        },
        async byId(id) {
            const tran = this.transactions.find(tran => tran._id === id);
            const response = await axios.get(`api/budget/${tran.year}/${tran.month}/${id}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
        this.transactions = response.data;
        console.log(this.transactions[0]._id);
        this.$router.push('/UpdateTransaction/' + this.transactions[0].year + '/' + this.transactions[0].month+ '/' +this.transactions[0]._id );
            this.transactions = response.data;
        },
        async isLogged(){
            //todo
            const response = await axios.get('/api/budget/whoami',{
                withCredentials: true, // Include credentials (cookies) in the request
            });
            console.log("dio ");
            console.log(response.data);
            if (!response.data){
                this.$router.push('/LoginForm');
            }
        },
        async addTran(){
            this.$router.push('/AddTransaction');
        }

    }
};
</script>