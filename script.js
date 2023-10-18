const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const input = document.getElementById('text');
const amount = document.getElementById('amount');
const btn = document.querySelector('.btn');
const list = document.getElementById('list');
const deleteBtn = document.querySelector('.delete-btn');

const localStorageData = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorageData !== null ? localStorageData : [] ;
let totalBal = 0;
let incomeBal = 0;
let expenseBal = 0;

function updateIncExp() {
    totalBal = 0;
    incomeBal = 0;
    expenseBal = 0;
    transactions.forEach( transaction => {
        if(transaction.amount < 0) {
            expenseBal += (transaction.amount);
            totalBal += ( transaction.amount);
        }
        else {
            incomeBal += (transaction.amount);
            totalBal += transaction.amount;
        }
    } )
    expenseBal = - expenseBal;

    balance.innerHTML = `$${totalBal}`;
    moneyPlus.innerHTML = `+$${incomeBal}`;
    moneyMinus.innerHTML = `-$${expenseBal}`;

}

function getRandomId() {
    return Math.floor(Math.random() * 100000);
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction(e) {
    e.preventDefault();
    const inputText = input.value;
    const amountMoney = (Number)(amount.value);
    const newTransaction = {
        id : getRandomId(),
        text: inputText,
        amount: amountMoney
    };
    transactions.push(newTransaction);
    showTransactionDOM();
    updateLocalStorage();
    input.value = '';
    amount.value = '';
}

function removeTransaction(id) {
    transactions = transactions.filter( transaction => {
        console.log(transaction.id, id)
        return transaction.id != id;
    } )
    console.log("ok");
    showTransactionDOM();
    updateIncExp();
    updateLocalStorage();
}

function showTransactionDOM() {
    list.innerHTML = '';
    transactions.forEach( transaction => {
        const text = transaction.text;
        const amount = transaction.amount;
        const element = document.createElement('div');
        const sign = amount < 0 ? 'minus' : 'plus' ;
        element.innerHTML = `<li class="${sign}">
        ${text} <span>$${amount}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})" >x</button>
      </li>`;
        list.appendChild(element);
    } )
    updateIncExp();
}



showTransactionDOM();
updateIncExp();
updateLocalStorage();


// Event Listener
btn.addEventListener('click', addTransaction);
deleteBtn.addEventListener('click', removeList);



