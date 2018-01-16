var users=[];

function createUser(){
  event.preventDefault();
  var uName = document.getElementById('userName').value,
  uBirth=document.getElementById('userBirth').value,
  uAddress=document.getElementById('userAddr').value,
  uPhone=document.getElementById('userPhone').value,
  uEmail=document.getElementById('userEmail').value;

  var $sexSelect= document.getElementById('userSex');
  var index=$sexSelect.selectedIndex;
  var uSex=$sexSelect.options[index].text;
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
      sex: uSex,
      birth: uBirth,
      address: uAddress,
      phone: uPhone,
      email: uEmail
    });
    if(!users.some(u=>u.isEquals(user))){//uniq user
     users.push(user);
     renderUsers();
     event.target.reset();
   }
   else alert('people has duplicate');
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
  if(email.length==0)return false;
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
