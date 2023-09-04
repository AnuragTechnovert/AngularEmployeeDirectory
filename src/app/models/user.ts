export class User{
    name:string;
    email:string;
    password:string

    constructor(args:any){
        this.name = !! args && !!args.firstName? args.firstName : '';
        this.email = !!args  && !!args.email ? args.email : '';
        this.password = !!args  && !!args.password ? args.password : '';
    }
}