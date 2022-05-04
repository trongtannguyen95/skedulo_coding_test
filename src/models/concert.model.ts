import IConcert from "../interfaces/concert.interface";
import Performance from "./performance.model";
export default class Concert {
    name: String;
    performances: Performance[];

    constructor({ name, performances }: IConcert) {
        this.name = name;
        this.performances = performances.map((p) => {
            const performance = new Performance(p)
            return performance;
        });
    }
    public sort = () => {//create sort function that compare start=>priority=>length
        this.performances.sort((a, b) => {
            const aStart = new Date(a.start).getTime();
            const aFinish = new Date(a.finish).getTime();
            const bStart = new Date(b.start).getTime();
            const bFinish = new Date(b.finish).getTime();

            if (aStart !== bStart) {
                return aStart - bStart;
            } else if (a.priority !== b.priority) {
                return b.priority - a.priority;
            } else if ((aFinish - aStart) !== (bFinish - bStart)) {
                return (aFinish - aStart) - (bFinish - bStart);
            }
            return 0;
        })
    }
    public deQueue = (): Performance => {
        const performance = this.performances[0];
        if (performance)
            this.performances.splice(0, 1)
        return new Performance(performance)

    }
    public findBestSchedule = (): Array<Performance | undefined> => {
        let result: Array<Performance> = [];
        let last: any = null;
        while (this.performances[0]) {

            let current = this.deQueue();//getting the current first performance in the list
            last = result.length > 0 ? new Performance(result[result.length - 1]) : null;

            if (last) {//checking if there is last performance on the output list
                let lastFinish = new Date(last.finish);
                let currentStart = new Date(current.start);
                let currentFinish = new Date(current.finish);
                if (current.priority > last.priority) {//if the current performance has higher priority than the last one, add the current one into the output
                    if (currentStart.getTime() < lastFinish.getTime()) {//if the current one start before the last one finish, cut the last one's start time into a new performance and put it back to the list
                        last.start = current.finish
                        result[result.length - 1].finish = current.start
                        this.performances.push(last);
                        this.sort();
                    }
                    result.push(current)

                } else if (currentFinish.getTime() > lastFinish.getTime()) {//if the current performance has lower than or equal priority the last one and it finish after the last one
                    if (currentStart.getTime() < lastFinish.getTime()) {//if the current one start before the last one finish, recalculate the current one start time and put it back to the list
                        current.start = last.finish
                        currentStart = new Date(current.start);
                        this.performances.push(current);
                        this.sort();

                    } else {//if the current one start after the last one finish, put it in the output list
                        result.push(current)
                    }
                }
            } else {//if this is the first performance, put it in the output list
                result.push(current)

            }
        }

        return result
    }
}
