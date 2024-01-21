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

export function getYears(){
    const currYear= new Date().getFullYear();
    let years = ['---'];
    for (let year = 2020; year <= currYear; year++) {
        years.push(year);
    }

    return years;
}
export function getMonths(){
    return [
        { value: '', label: '---' },
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];
}