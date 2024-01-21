import axios from 'axios';

export async function getUser() {
    try{
        const response = await axios.get('/api/budget/whoami', {
            withCredentials: true,  
        });
        if (!response.data) {
            return null;
        }
        else{
            return response.data;
        }
    }catch(err){
        console.log(err);
        return null;
    }
}


export async function formatTransaction(tran) {
    try{
        let newTransaction = {...tran};
        newTransaction.users = [];

        newTransaction.cost=parseInt(newTransaction.cost);            
        newTransaction.date=new Date(newTransaction.date);
        
        newTransaction.users = tran.users.reduce((acc, item) => {
            acc[item.name] = parseInt(item.quota, 10);
            return acc;
        }, {});
        

        return newTransaction;
    }catch(err){
        throw new Error(err);
    }
}