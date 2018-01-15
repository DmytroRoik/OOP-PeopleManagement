var users=[new User({
  name: "uName",
  isMale: "isMale",
  birth: "uBirth",
  address: "uAddress",
  phone: "uPhone",
  email: "uEmail"
})];


function createUser(){
  event.preventDefault();
  var uName = document.getElementById('userName').value,
  isMale= document.getElementById('uSexMale').checked,
  uBirth=document.getElementById('userBirth').value,
  uAddress=document.getElementById('userAddr').value,
  uPhone=document.getElementById('userPhone').value,
  uEmail=document.getElementById('userEmail').value;
  var erros=[];
  if(!isNameValid(uName))erros.push('name');
  if(!isBirthValid(uBirth))erros.push('birthday');
  if(!isPhoneValid(uPhone))erros.push('phone');
  if(!isEmailValid(uEmail))erros.push('email');
  if(erros.length>0){
    alert('Some field are invalid: '+ erros.join(', '));
  }
  else{
    var user=new User({
      name: uName,
      isMale: isMale,
      birth: uBirth,
      address: uAddress,
      phone: uPhone,
      email: uEmail
    });
    users.push(user);
    renderUsers();
  }
}

function renderUsers(){
  var $tableBody=document.querySelector(' section#users-table .table .table-body');
  $tableBody.innerHTML='';
  var userIndex=0;
  for(let el of users){
    let $row = document.createElement('div');
    $row.setAttribute('data-id',userIndex++);
    $row.classList.add('table-row');

    $row.addEventListener('click',showHideUserInfo);//add click to row
    for(let prop in el){
      if(el.hasOwnProperty(prop)){
        let $cell=document.createElement('div');
        $cell.classList.add('table-cell');
        $cell.innerText=el[prop];
        $row.append($cell);
      }
    }
    $tableBody.append($row);
  }
}
function showHideUserInfo(e){
  var id=this.getAttribute('data-id');
  var user=users[parseInt(id)];
  console.log(user);
  user.changeDataVisibility();
  var $cells=this.getElementsByClassName('table-cell');
  console.log($cells);
  if(user.isDataVisible){
    for(let i=1;i<6;i++){
      $cells[i].classList.remove('hidden');
    }
  }
  else{
    for(let i=1;i<6;i++){
      $cells[i].classList.add('hidden');
    }
  }
}

renderUsers();
function isNameValid(name){
  if(name.length==0||/\d/.test(name))return false;
  return true;
}
function isBirthValid(birth){
  if(birth.length!=10)return false;
  return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]\d{4}/.test(birth);
}
function isPhoneValid(phone){
  if(phone.length!=13)return false;
  return /^\+\d{12}/.test(phone);
}
function isEmailValid(email){
  var count=0;
  for(let i=0;i<email.length;i++){
    if(email[i]=='@')count++;
  }
  return count==1;
}
