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
                <tr v-for="tran in transactions" :key="tran.id">
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
        getTransactions() {
            fetch(`/api/budget`)
                .then((response) => response.json())
                .then((data) => {
                    this.transactions = data;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    },
};
</script>