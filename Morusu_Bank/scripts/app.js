let span_balance = document.getElementById('balance-span');
let btn_balance = document.getElementById('btn-balance');
let btn_hidebalance = document.getElementById('btn-hidebalance');

// let btn_deposit = document.getElementById('btn-deposit');
let impt_deposit = document.getElementById('impt-deposit');
let span_deposit = document.getElementById('deposit-span');

// let btn_plunder = document.getElementById('btn-plunder');
let impt_plunder = document.getElementById('impt-plunder');
let span_plunder = document.getElementById('plunder-span');

let btn_back = document.getElementById('btn-back');
let error_span = document.getElementById('span-error')

let input_user = document.getElementById('inpt-name');
let span_user = document.getElementById('user-bank');

let balance = localStorage.getItem('balance-span') ? parseFloat(localStorage.getItem('balance-span')) : 0;

function setError() {
  input_user.style.border = '2px solid #e63636';
  error_span.style.display = 'block';
}

function removeError() {
  input_user.style.border = '';
  error_span.style.display = 'none';
}

function checkChar(e){
  let char = String.fromCharCode(e.keyCode);
  let pattern = '[a-zA-Z0-9]';

  if(char.match(pattern)){
    return true;
  }
}

if(input_user){
  input_user.addEventListener("keypress", function(e){
    if(!checkChar(e)){
      e.preventDefault();
    }

    const keyCode = (e.keyCode ? e.keyCode : e.wich);
  
    if(keyCode > 47 && keyCode < 58){
      e.preventDefault();
    }
  });
}

function name_information() {
  let username = input_user.value.trim(); 

  if (username !== "") {
    window.location.href = 'pages/menu.html'
    localStorage.setItem("username", username);
    span_user.textContent = username;
  } else {
    setError();
  }
}

let savedUsername = localStorage.getItem("username");

if (savedUsername) {
  span_user.textContent = savedUsername;
}

function updateBalance() {
  localStorage.setItem('balance-span', balance.toFixed(2));
}

function balancef() {
  span_balance.textContent = `R$ ${balance.toFixed(2)}`
  btn_hidebalance.style.display = 'none';
  btn_balance.style.display = 'none';
  btn_hidebalance.style.display = 'block';
}

function hide_balance() {
  btn_hidebalance.style.display = 'none';
  btn_balance.style.display = 'block';
  span_balance.textContent = '/////////';
}

function plunderf() {
  let plunder = parseFloat(impt_plunder.value);

  if (plunder <= 0) {
    span_plunder.textContent = 'O valor do saque deve ser acima de 0';
    span_plunder.style.color = '#BB0B0B';
  } else if (plunder > balance) {
    span_plunder.textContent = 'Você não possui esse valor na conta';
    span_plunder.style.color = '#BB0B0B';
  } else {
    balance -= plunder;
    updateBalance();
    span_plunder.textContent = `Você sacou R$ ${plunder.toFixed(2)} da sua conta\n\n`;
    span_plunder.style.color = '#65B307';
  }
}

function depositf() {
  let deposit = parseFloat(impt_deposit.value);

  if (deposit <= 0) {
    span_deposit.textContent = 'O valor do depósito deve ser acima de 0';
    span_deposit.style.color = '#BB0B0B';
  } else {
    balance += deposit;
    span_deposit.textContent = `Você depositou R$ ${deposit.toFixed(2)} na sua conta\n\n`;
    span_deposit.style.color = '#65B307';
  }

  return updateBalance();
}

function clearStorage(){
  window.location.href = '../index.html'
  localStorage.removeItem("username");
  localStorage.removeItem("balance-span");
}

