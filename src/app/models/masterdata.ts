import { Department } from "./department"
import { JobTitle } from "./jobtitle";
import { Office } from "./office";

export class MasterData {
    departments: Department[];
    offices: Office[];
    jobTitles: JobTitle[];

    constructor(args: any) {
        this.departments = !!args && !!args.departments ? args.departments : [];
        this.offices = !!args && !!args.offices ? args.offices : [];
        this.jobTitles = !!args && !!args.jobTitles ? args.jobTitles : [];
    }
}