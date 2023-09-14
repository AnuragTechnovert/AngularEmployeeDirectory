export class User{
    userName:string;
    email:string;
    password:string

    constructor(args:any){
        this.userName = !! args && !!args.userName? args.userName : '';
        this.email = !!args  && !!args.email ? args.email : '';
        this.password = !!args  && !!args.password ? args.password : '';
    }
}