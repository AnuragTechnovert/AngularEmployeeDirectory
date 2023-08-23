export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    preferredName: string;
    email: string;
    jobTitle: string;
    office: string;
    department: string;
    phoneNumber: string;
    skypeId: string;
    
    constructor(args : any) {
        this.id = !!args  && !!args.id ? args.id : '';
        this.firstName = !!args  && !!args.firstName ? args.firstName : '';
        this.lastName = !!args  && !!args.lastName ? args.lastName : '';
        this.preferredName = !!args  && !!args.preferredName ? args.preferredName : '';
        this.email = !!args  && !!args.email ? args.email : '';
        this.jobTitle = !!args  && !!args.jobTitle ? args.jobTitle : '';
        this.office = !!args  && !!args.office ? args.office : '';
        this.department = !!args  && !!args.department ? args.department : '';
        this.phoneNumber = !!args  && !!args.phoneNumber ? args.phoneNumber : '';
        this.skypeId = !!args  && !!args.skypeId ? args.skypeId : '';
    }
}