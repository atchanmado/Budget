/*class BudgetApp{
    constructor(addBudgetBtn,addExpenseBtn,table){
        addBudgetBtn.addEventListener('click', this.addBudget.bind(this));
        addExpenseBtn.addEventListener('click', this.addExpense.bind(this));
        table.addEventListener('click', this.deleteExpense.bind(this));
        table.addEventListener('click' , this.editExpenses.bind(this));
        this.budgetAmount = document.querySelector("#budget-amount");
        this.errors = document.querySelectorAll(".error");
        this.showBudget = document.querySelector("#feedback-item__budget__show");
        this.showExpenses = document.querySelector(
        "#feedback-item__expenses__show");
        this.showBalance = document.querySelector("#feedback-item__balance__show");
        this.expenseName = document.querySelector("#expense-name");
        this.expenseAmount = document.querySelector("#expense-amount");
        this.template = document.querySelector("#expense-row");
        this.tbody = document.querySelector("tbody");
        this.clone;
    }
    addBudget(){
        if(+this.budgetAmount.value <= 0  ||
            isNaN(+this.budgetAmount.value)){
                this.errors[0].classList.add('error-show');
                this.budgetAmount.classList.add('input-error');
                setTimeout(()=>{
                    this.errors[0].classList.remove('error-show');
                this.budgetAmount.classList.remove('input-error');
                },3000);
            }else{
                this.showBudget.innerText = +this.budgetAmount.value;
                this.showBalance.innerText = +this.budgetAmount.value - +this.showExpenses.innerText;
                this.budgetAmount.value = '';
            }
    }
    
    addExpense(){
        if(this.expenseName.value === '' ||
            /\d/.test(this.expenseName.value)){
                this.errors[1].classList.add('error-show');
                this.expenseName.classList.add('input-error');
                setTimeout(()=>{
                    this.errors[1].classList.remove('error-show');
                this.expenseName.classList.remove('input-error');
                },3000);
            }
            else if(+this.expenseAmount.value <= 0 ||
                isNaN(+this.expenseAmount.value)){
                    this.errors[2].classList.add('error-show');
                    this.expenseAmount.classList.add('input-error');
                    setTimeout(()=>{
                        this.errors[2].classList.remove('error-show');
                    this.expenseAmount.classList.remove('input-error');
                    },3000);
                }
            else{
                this.clone = this.template.content.cloneNode(true);
                let td = this.clone.querySelectorAll('td');
                td[0].innerText = this.expenseName.value;
                td[1].innerText = +this.expenseAmount.value;
                this.tbody.appendChild(this.clone);

                this.showExpenses.innerText = +this.showExpenses.innerText + +this.expenseAmount.value;
                this.showBalance.innerText = +this.showBalance.innerText - +this.expenseAmount.value;

                this.expenseName.value = '';
                this.expenseAmount.value = '';
            }
    }
    deleteExpense(e){
        if(e.target.classList.contains('deleteRow')){
            this.showBalance.innerText = +this.showBalance.innerText + +e.target.closest('tr').children[1].innerText;

            this.showExpenses.innerText = +this.showExpenses.innerText - +e.target.closest('tr').children[1].innerText;

            e.target.closest('tr').remove();
        }
    }

    editExpenses(e){
        if(e.target.classList.contains('editRow')){
            this.showBalance.innerText = +this.showBalance.innerText + +e.target.closest('tr').children[1].innerText;
            this.showExpenses.innerText = +this.showExpenses.innerText - +e.target.closest('tr').children[1].innerText;
            this.expenseName.value = e.target.closest('tr').children[0].innerText;
            this.expenseAmount.value = e.target.closest('tr').children[1].innerText;
            this.expenseName.focus();
            e.target.closest('tr').remove();
        }
    }
}


document.addEventListener('DOMContentLoaded', init);


function init(){
    const addBudgetBtn = document.querySelector('#add-budget');
    const addExpenseBtn = document.querySelector('#expense-add');
    const table = document.querySelector('table');
    new BudgetApp(addBudgetBtn,addExpenseBtn,table);
}*/
const montantEntre = document.getElementById("budget-input");
const addForm = document.getElementById("budgetForm");

const budgetAmount = document.getElementById("budget-amount");
const balanceAmount = document.getElementById("balance-amount");
const expensesAmount = document.getElementById("expense-amount");
const expenseInput = document.getElementById("expense-input");
const expensefeedback = document.getElementsByClassName("expensefeedback");
// fuction  aff Expenses et buget
function getBudgetAmount(amount) {
  budgetAmount.innerText = amount;
  balanceAmount.innerText = amount;
}
//btn add budget
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getBudgetAmount(montantEntre.value);
  montantEntre.value = "";
});
//

const expForm = document.getElementById("expense-form");
const expName = document.getElementById("expense-input");
const expNumber = document.getElementById("amount-input");

let id = 0;
let details = [];
// fuction permet aff id et tableau
function addExpenses(name, number) {
  if (!name.length || !number.length) {
  } else {
    const userExp = {
      id: id,
      name: name,
      number: parseInt(number),
    };
    details.push(userExp);
    displayExp(details);
    id++;
    expName.value = "";
    expNumber.value = "";
  }
}
//btn add Expense
expForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpenses(expName.value, expNumber.value);
});

// calcule Expenses totale
function calcExpenses() {
  let totalExp = 0;

  for (i = 0; i < details.length; i++) {
    totalExp = details[i].number + totalExp;
  }
  expensesAmount.innerText = totalExp;
  updateBalance();
}
//affiche balance et faire (-)
function updateBalance() {
  balanceAmount.innerText =
    parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
}
// Affiche le tableau et icon edit et efface
function displayExp(details) {
  listitem.innerHTML = null;
  for (i = 0; i < details.length; i++) {
    listitem.innerHTML += `
        <div class="row expenselist d-flex justify-content-between" id="${details[i].id}">
        <div id="Title" class="col list-item ">
          <p>${details[i].name}</p>
        </div>
        <div id="value" class="col list-item  align-items-center"> 
          <p> <span>$ </span> ${details[i].number}</p>
        </div>
        <div class="col" id="edite_delete">
          <p>
            <a id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> <i class="fa-solid fa-pen-to-square"></i></a> 
            <a id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><i class="fa-solid fa-trash" style="color:red"></i></a>
          </p>
        </div>
      </div>
    `;
  }
  calcExpenses();
  // displayExpenses.style.display = "block";
}
displayExp(details);

///edite

function editExpDetails(id) {
  details.findIndex((item) => {
    if (item.id === id) {
      expenseInput.value = item.name;
      expensesAmount.value = item.number;
      expNumber.value = item.number;

      delExpenseDetails(id);
    }
  });
}

function getExpValue(expenseInput, expensesAmount, id) {
  edited = details.findIndex((obj) => obj.id == id);
  details[edited].name = expenseInput;
  details[edited].number = expeparseIntnsesAmount;
  displayExp(details);
}

expForm.addEventListener("{details[i].id}", (e) => {
  e.preventDefault();
  getexpenselist(
    expenseInput.value,
    expensesAmount.value,
    expForm.children[1].id
  );
});

/// suprimer
function delExpenseDetails(id) {
  let index = details.findIndex((item) => item.id === id);
  details.splice(index, 1);
  displayExp(details);
}
