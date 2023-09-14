export class JobTitles {
    jobId: number;
    jobTitleName: string;

    constructor(args: any) {
        this.jobId = !!args && !!args.jobId ? args.jobId : '';
        this.jobTitleName = !!args && !!args.jobTitleName ? args.jobTitleName : '';
    }
}