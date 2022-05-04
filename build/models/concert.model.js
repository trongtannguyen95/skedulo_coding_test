"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var performance_model_1 = __importDefault(require("./performance.model"));
var Concert = /** @class */ (function () {
    function Concert(_a) {
        var name = _a.name, performances = _a.performances;
        var _this = this;
        this.sort = function () {
            _this.performances.sort(function (a, b) {
                var aStart = new Date(a.start).getTime();
                var bStart = new Date(b.start).getTime();
                if (aStart !== bStart) {
                    return aStart - bStart;
                }
                else if (a.priority !== b.priority) {
                    return b.priority - a.priority;
                }
                else if (a.length !== b.length) {
                    return a.length - b.length;
                }
                return 0;
            });
        };
        this.deQueue = function () {
            var performance = _this.performances[0];
            if (performance)
                _this.performances.splice(0, 1);
            return new performance_model_1.default(performance);
        };
        this.findBestSchedule = function () {
            var result = [];
            var last = null;
            while (_this.performances[0]) {
                var current = _this.deQueue(); //getting the current first performance in the list
                last = result.length > 0 ? new performance_model_1.default(result[result.length - 1]) : null;
                if (last) { //checking if there is last performance on the output list
                    var lastFinish = new Date(last.finish);
                    var currentStart = new Date(current.start);
                    var currentFinish = new Date(current.finish);
                    if (current.priority > last.priority) { //if the current performance has higher priority than the last one, add the current one into the output
                        if (currentStart.getTime() < lastFinish.getTime()) { //if the current one start before the last one finish, cut the last one's start time into a new performance and put it back to the list
                            last.start = current.finish;
                            last.length -= (lastFinish.getTime() - currentStart.getTime()) / 1000;
                            result[result.length - 1].finish = current.start;
                            _this.performances.push(last);
                            _this.sort();
                        }
                        result.push(current);
                    }
                    else if (currentFinish.getTime() > lastFinish.getTime()) { //if the current performance has lower than or equal priority the last one and it finish after the last one
                        if (currentStart.getTime() < lastFinish.getTime()) { //if the current one start before the last one finish, recalculate the current one start time and put it back to the list
                            current.start = last.finish;
                            current.length -= (lastFinish.getTime() - currentStart.getTime()) / 1000;
                            _this.performances.push(current);
                            _this.sort();
                        }
                        else { //if the current one start after the last one finish, put it in the output list
                            result.push(current);
                        }
                    }
                }
                else { //if this is the first performance, put it in the output list
                    result.push(current);
                }
            }
            return result;
        };
        this.name = name;
        this.performances = performances.map(function (p) {
            var performance = new performance_model_1.default(p);
            var start = new Date(performance.start);
            var finish = new Date(performance.finish);
            performance.length = (finish.getTime() - start.getTime()) / 1000; //calculating length of performance by seconds
            return performance;
        });
    }
    return Concert;
}());
exports.default = Concert;
