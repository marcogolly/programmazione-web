<template>
    <div>
        <h1>transactions</h1>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Users</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="tran in this.transactions" :key="tran.id">
                    <td>{{ new Date(tran.data).toLocaleDateString('it-IT') }}</td>
                    <td>{{ tran.desc }}</td>
                    <td>{{ tran.cat }}</td>
                    <td>{{ tran.costo }}</td>
                    <td>{{ tran.users }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/jsx">
import axios from 'axios';
export default {
    data() {
        return {
            transactions: null,
        };
    },
    mounted() {
        this.getTransactions();
    },
    methods: {
        async getTransactions() {
            
            const response = await axios.get('api/budget', {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            console.log("sassi");
            console.log(response.data);
            console.log("sassi");
            
            this.transactions = response.data;

        },
    },
};
</script>