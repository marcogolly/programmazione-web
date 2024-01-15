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
                    <td>{{ tran.date }}</td>
                    <td>{{ tran.desc }}</td>
                    <td>{{ tran.cat }}</td>
                    <td>{{ tran.cost }}</td>
                    <td>{{ tran.users }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/jsx">
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
            const response = await fetch('http://localhost:3000/api/budget', {
                headers:{
                    'content-type': 'application/json'
                },
                credentials: 'include'

            })
            console.log(response);
            if (response.ok) {
                this.transactions = await response.json();
                // Handle successful login
                console.log('Login success:', this.transactions);
            } else {
                // Handle failed login
                console.log('Login failed');
            }
        },
    },
};
</script>