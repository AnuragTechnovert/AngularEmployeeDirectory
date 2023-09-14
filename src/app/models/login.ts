export class Login {
    userName: string;
    password: string;

    constructor(args:any){
        this.userName = !! args && !!args.userName? args.userName : '';
        this.password = !!args  && !!args.password ? args.password : '';
    }
}