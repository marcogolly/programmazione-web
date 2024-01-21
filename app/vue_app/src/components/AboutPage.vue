<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="mt-4">Informations about this project</h1>

            <p class="lead">
                This project was created as final project of my Web Programming course <br>

                All the expenses are stored in a mongoDB database, and the data is fetched using a REST API <br>

                The frontend is made using Vue.js, and the backend is made using Node.js and Express.js <br>

                
            </p>
            <h3 class="mt-4">
                My assumptions
            </h3>
            <p class="lead">
                All the expenses contains an extra field "user", which is the user that created the expense <br>

                The budget page contains a list of all the expenses in which the logged user has a quota <br>

                In order to show the balance, we assume that if a user registers a transaction (with cost != 0) they sustain the cost, then each user that has a quota must refound their money to them as described in the project document  <br>

                This means that the balance is calculated as the sum of the differences between "cost" and their "quota" <br>
            </p>
        </div>
    </div>
</template>


<style >
@import '../assets/style.css';

</style>
