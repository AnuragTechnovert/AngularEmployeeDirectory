import { Department } from "./department"
import { JobTitle } from "./jobtitle";
import { Office } from "./office";

export class MasterData {
    departments: Department[] = [];
    offices: Office[] = [];
    jobTitles: JobTitle[] = [];
}