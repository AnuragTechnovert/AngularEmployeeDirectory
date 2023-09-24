export class Office{
    officeId: number;
    officeName: string;

    constructor(args: any) {
        this.officeId = !!args && !!args.officeId ? args.officeId : '';
        this.officeName = !!args && !!args.officeName ? args.officeName : '';
    }
}