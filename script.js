const transactions = [];
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const totalIncomeElement = document.getElementById("totalIncome");
const totalExpensesElement = document.getElementById("totalExpenses");
const balanceElement = document.getElementById("balance");
const messageElement = document.getElementById("message");
const transactionList = document.getElementById("transactionList");
const filterInput = document.getElementById("filter");

let ids = 1;
const typeList = ["income", "expense"];

addBtn.addEventListener("click", () => {
    const desc = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;

    if (desc === "") {
        messageElement.textContent = "Enter Valid Description!";
        return;
    }
    if (isNaN(amount) || amount <= 0 || !Number.isFinite(amount)) {
        messageElement.textContent = "Enter Valid Amount!";
        return;
    }
    if (!typeList.includes(type)) {
        messageElement.textContent = "Select Valid Transaction Type!";
        return;
    }
    if (category === "") {
        messageElement.textContent = "Select Valid Category!";
        return;
    }
    messageElement.textContent = "";
    let obj = {
        "id": ids,
        "description": desc,
        "amount": amount,
        "type": type,
        "category": category
    }
    transactions.push(obj);
    ids++;

    renderTransactions();
    updateSummary();

    descriptionInput.value = "";
    amountInput.value = "";
    typeInput.value = "";
    categoryInput.value = "";
})

function renderTransactions() {
    transactionList.textContent = "";
    const selectedCategory = filterInput.value;
    for (let transaction of transactions) {
        if (selectedCategory !== "All" &&
            transaction.category !== selectedCategory
        ) {
            continue;
        }
        const list = document.createElement("li");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        list.textContent = `Description: ${transaction.description} | Amount: ${transaction.amount} | Category: ${transaction.category} | Type: ${transaction.type}`;
        list.append(deleteBtn);
        deleteBtn.addEventListener("click", () => {
            const index = transactions.findIndex((item) => item.id === transaction.id);
            if (index !== -1) {
                transactions.splice(index, 1);
            }
            renderTransactions();
            updateSummary();
        })
        transactionList.append(list);
    }
}

function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;
    for (let transaction of transactions) {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
            totalExpense += transaction.amount;
        }
    }
    const balance = totalIncome - totalExpense;
    totalExpensesElement.textContent = `₹ ${totalExpense.toFixed(2)}`;
    totalIncomeElement.textContent = `₹ ${totalIncome.toFixed(2)}`;
    balanceElement.textContent = `₹ ${balance.toFixed(2)}`;
}

filterInput.addEventListener("change", () => {
    renderTransactions();
});

