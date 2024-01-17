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
            <input id="users" v-model="transaction.users" />
            <button type="submit">Confirm</button>                                
    </form>
</template>

<script>
import axios from 'axios';
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
        };
    },
    mounted(){
        try{
            this.byId();
        }catch(err){console.log(err)}
    },
    methods: {
        async byId() {
            const id = this.$route.params.id;
            const year = new Date(this.data).getFullYear();
            const month = new Date(this.data).getMonth() + 1;
            const response = await axios.get(`api/budget/${year}/${month}/${id}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            this.transaction = response.data[0];

            console.log(this.transaction);
            this.transaction.data = new Date(this.transaction.data).toISOString().substr(0, 10);
            this.transaction.users = JSON.stringify(this.transaction.users);
            console.log(this.transaction);
        },
        async updateTransaction(){
            const id = this.$route.params.id;
            const year = this.$route.params.year;
            const month = this.$route.params.month;
            const response = await axios.put(`api/budget/${year}/${month}/${id}`, this.transaction, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            this.transaction = response.data;
            
            this.$router.push('/BudgetPage');
        }
    },
};
</script>