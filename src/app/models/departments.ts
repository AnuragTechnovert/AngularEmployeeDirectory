export class Departments{
    deptId:number;
    deptName: string;
    constructor(args:any){
        this.deptId = !! args && !!args.deptId? args.deptId : '';
        this.deptName = !!args  && !!args.deptName ? args.deptName : '';
    }
}