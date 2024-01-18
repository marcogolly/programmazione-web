import axios from 'axios';

export async function getUser() {
    try{
        const response = await axios.get('/api/budget/whoami', {
            withCredentials: true, // Include credentials (cookies) in the request
        });
        if (!response.data) {
            return null;
        }
        else{
            return response.data.name;
        }
    }catch(err){
        console.log(err);
        return null;
    }
}


export async function formatTransaction(tran) {
    try{
        let newTransaction = {...tran};
        newTransaction.users = {};
        console.log("porca madonna");
        tran.users.forEach(user => {
            newTransaction.users[user.name] = user.quota;
        });
        
        newTransaction.costo=parseInt(newTransaction.costo);            
        newTransaction.data=new Date(newTransaction.data);
        
        newTransaction.users = tran.users.reduce((acc, item) => {
            acc[item.name] = parseInt(item.quota, 10);
            return acc;
        }, {});
        console.log(newTransaction.users);
        
        

        return newTransaction;
    }catch(err){
        throw new Error(err);
    }
}