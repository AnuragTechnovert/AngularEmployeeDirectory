export class Login {
    email: string;
    password: string;

    constructor(args:any){
        this.email = !! args && !!args.email? args.email : '';
        this.password = !!args  && !!args.password ? args.password : '';
    }
}