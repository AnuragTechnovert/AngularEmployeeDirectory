export class Employee {
    // id: number;
    // firstName: string;
    // lastName: string;
    // preferredName: string;
    // email: string;
    // jobTitle: string;
    // office: string;
    // department: string;
    // phoneNumber: string;
    // skypeId: string;

    // constructor(id: number, firstName: string, lastName: string, preferredName: string, email: string, jobtitle: string, office: string, department: string, phoneNumber: string, skypeId: string) {
    //     this.id = id;
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.preferredName = preferredName;
    //     this.email = email;
    //     this.jobTitle = jobtitle;
    //     this.office = office;
    //     this.department = department;
    //     this.phoneNumber = phoneNumber;
    //     this.skypeId = skypeId;
    // }

    id!: number;
    firstName!: string;
    lastName!: string;
    preferredName!: string;
    email!: string;
    jobTitle!: string;
    office!: string;
    department!: string;
    phoneNumber!: string;
    skypeId!: string;
    
    constructor(props?: Partial<Employee>) {
        Object.assign(this, props);
    }
}