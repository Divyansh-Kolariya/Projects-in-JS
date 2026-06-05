const balanceEl = document.getElementById("balance");
const incomeamountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transListEl = document.getElementById("transaction-list");
const transFromEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transaction"))