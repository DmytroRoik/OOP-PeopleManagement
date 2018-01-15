class User extends superUser{
  constructor(options){
    super(options);
    this.name=options.name;
    this.sex= options.isMale?"male":"female";
    this.birth=options.birth;
    this.address=options.address;
    this.phone=options.phone;
    this.email=options.email;


    Object.defineProperty(this, 'isDataVisible', {
      enumerable: false
    });
  }
}

