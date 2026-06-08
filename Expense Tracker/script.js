const balanceEl = document.getElementById("balance");
const incomeamountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transListEl = document.getElementById("transaction-list");
const transFromEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transaction")) || [];

transFromEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id:Date.now(),
        description,
        amount
    })

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList()
    updateSummary()

    transFromEl.reset()

}

function updateTransactionList(){
    transListEl.innerHTML = ""

    const sortedTransactions = [...transactions].reverse()

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction)
        transListEl.appendChild(transactionEl)
    })
}

function createTransactionElement(transaction) {
    const li = document.createElement("li")
    li.classList.add("transaction")
}