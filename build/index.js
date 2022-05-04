"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var concert_model_1 = __importDefault(require("./models/concert.model"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function importData(filePath) {
    var data = JSON.parse(fs_1.default.readFileSync(filePath).toString());
    var filename = path_1.default.parse(filePath).base;
    var basePath = path_1.default.parse(filePath).dir;
    var baseName = filename.replace(/\.[^/.]+$/, "");
    var concert = new concert_model_1.default({ name: baseName, performances: data });
    concert.sort(); //sort list performance to create a priority queue
    var cleanUpOutput = concert.findBestSchedule().map(function (out) { return { band: out === null || out === void 0 ? void 0 : out.band, start: out === null || out === void 0 ? void 0 : out.start, finish: out === null || out === void 0 ? void 0 : out.finish }; }); //clean up output to match the requirement
    var jsonContent = JSON.stringify(cleanUpOutput, null, 4);
    fs_1.default.writeFile(path_1.default.join(basePath, baseName + '.optimal.json'), jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
    return concert;
}
var args = process.argv.slice(2);
importData(args[0]);
