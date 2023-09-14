export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    preferredName: string;
    email: string;
    jobId: number;
    officeId: number;
    deptId: number;
    phoneNumber: string;
    skypeId: string;
    
    constructor(args : any) {
        this.id = !!args  && !!args.id ? args.id : 0;
        this.firstName = !!args  && !!args.firstName ? args.firstName : '';
        this.lastName = !!args  && !!args.lastName ? args.lastName : '';
        this.preferredName = !!args  && !!args.preferredName ? args.preferredName : '';
        this.email = !!args  && !!args.email ? args.email : '';
        this.jobId = !!args  && !!args.jobId ? args.jobId : '';
        this.officeId = !!args  && !!args.officeId ? args.officeId : '';
        this.deptId = !!args  && !!args.deptId ? args.deptId : '';
        this.phoneNumber = !!args  && !!args.phoneNumber ? args.phoneNumber : '';
        this.skypeId = !!args  && !!args.skypeId ? args.skypeId : '';
    }
}