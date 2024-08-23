document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");
  const filterCategory = document.getElementById("filter-category");

  let expenses = [];

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;

    const expense = {
      id: Date.now(),
      name,
      amount,
      category,
      date
    };

    expenses.push(expense);
    renderExpenses();
    updateTotalAmount();
    expenseForm.reset();
  });

  filterCategory.addEventListener("change", () => {
    renderExpenses();
  });

  function renderExpenses() {
    const filteredExpenses = expenses.filter((expense) => {
      if (filterCategory.value === "All") {
        return true;
      } else {
        return expense.category === filterCategory.value;
      }
    });

    expenseList.innerHTML = "";

    filteredExpenses.forEach((expense) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${expense.name}</td>
        <td>$${expense.amount.toFixed(2)}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
      `;
      expenseList.appendChild(row);
    });

    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        expenses = expenses.filter((expense) => expense.id !== id);
        renderExpenses();
        updateTotalAmount();
      });
    });
  }

  function updateTotalAmount() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
  }

  renderExpenses();
  updateTotalAmount();
});