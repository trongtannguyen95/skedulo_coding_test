import IPerformance from "../interfaces/performance.interface";
export default class Performance {
    band: string;
    start: Date;
    finish: Date;
    priority: number;
    length: number;
    constructor(data: IPerformance) {
        Object.assign(this, data);
    }

}