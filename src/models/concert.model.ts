import IConcert from "../interfaces/concert.interface";
import Performance from "./performance.model";
export default class Concert {
    name: String;
    performances: Performance[];

    constructor({ name, performances }: IConcert) {
        this.name = name;
        this.performances = performances.map((p) => {
            const performance = new Performance(p)

            const start = new Date(performance.start)
            const finish = new Date(performance.finish)

            performance.length = (finish.getTime() - start.getTime()) / 1000;//calculating length of performance by seconds
            return performance;
        });
    }
    public sort = () => {//create sort function that compare start=>priority=>length
        this.performances.sort((a, b) => {
            const aStart = new Date(a.start).getTime();
            const bStart = new Date(b.start).getTime();
            if (aStart !== bStart) {
                return aStart - bStart;
            } else if (a.priority !== b.priority) {
                return b.priority - a.priority;
            } else if (a.length !== b.length) {
                return a.length - b.length;
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
    public enQueue = (performance: Performance) => {
        this.performances.push(performance)
        return
    }
    public findBestSchedule = (): Array<Performance | undefined> => {
        let result: Array<Performance> = [];
        let last: any = null;
        let index = 0
        while (this.performances[0]) {
            let current = this.deQueue();//getting the current first performance in the list
            last = index > 0 ? new Performance(result[index - 1]) : null;
            if (last) {//checking if there is last performance on the output list
                let lastFinish = new Date(last.finish);
                let lastStart = new Date(last.start);
                let currentStart = new Date(current.start);
                if (current.priority > last.priority) {//if the current performance has higher priority than the last one, add the current one into the output
                    if (currentStart.getTime() < lastFinish.getTime()) {//if the current one start before the last one finish, cut the last one into a new performnace and put it back to the list
                        last.start = current.finish
                        last.length -= (lastFinish.getTime() - currentStart.getTime()) / 1000
                        result[index - 1].finish = current.start
                        this.enQueue(last)
                    }
                    result.push(current)
                    index++

                } else {//if the current performance has lower than or equal priority the last one
                    if (currentStart.getTime() < lastFinish.getTime()) {//if the current one start before the last one finish, recalculate the current one start time and put it back to the list
                        current.start = new Date(lastStart.getTime() + (lastFinish.getTime() - currentStart.getTime()))
                        current.length -= (lastFinish.getTime() - currentStart.getTime()) / 1000
                        this.enQueue(current)
                    } else {//if the current one start after the last one finish, put it in the output list
                        result.push(current)
                        index++
                    }
                }
            } else {//if this is the first performance, put it in the output list
                result.push(current)
                index++

            }
            this.sort();
        }
        return result
    }
}