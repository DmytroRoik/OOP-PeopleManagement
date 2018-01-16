class User extends superUser{
  constructor(options){
    super(options);
    this.name=options.name;
    this.sex= options.sex;
    this.birth=options.birth;
    this.address=options.address;
    this.phone=options.phone;
    this.email=options.email;

    Object.defineProperty(this, 'isDataVisible', {
      enumerable: false
    });
  }
  isEquals(user){
    if(!(user instanceof User))return false;
    return this.name==user.name&&this.sex==user.sex&&this.birth==user.birth&&this.phone==user.phone&&this.email==user.email;
  }
}


