function createUser(){
  event.preventDefault();
  var uName = document.getElementById('userName').value,
    isMale= document.getElementById('uSexMale').checked,
    uBirth=document.getElementById('userBirth').value,
    uAddress=document.getElementById('userAddr').value,
    uPhone=document.getElementById('userPhone').value;
  var erros=[];
    if(!isNameValid(uName))erros.push('name');
    if(!isBirthValid(uBirth))erros.push('birthday');
    if(!isPhoneValid(uPhone))erros.push('phone');
    if(erros.length>0){
      alert('Some field are invalid: '+ erros.join(', '));
    }
    else{
      //create user
      console.log('user created');
    }
}
function isNameValid(name){
  if(name.length==0||/\d/.test(name))return false;
  return true;
}
function isBirthValid(birth){
  return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]\d{4}/.test(birth);
}
function isPhoneValid(phone){
  return /^\+\d\(\d{3}\)\-\d{3}(\-\d{2}){2}/.test(phone);
}
