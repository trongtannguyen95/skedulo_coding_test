import Concert from './models/concert.model';
import fs from "fs"
import path from 'path';
function importData(filePath: string): Concert {
    const data = JSON.parse(fs.readFileSync(filePath).toString());
    const filename = path.parse(filePath).base;
    const basePath = path.parse(filePath).dir;
    const baseName = filename.replace(/\.[^/.]+$/, "")
    const concert = new Concert({ name: baseName, performances: data })
    concert.sort();//sort list performance to create a priority queue
    const cleanUpOutput = concert.findBestSchedule().map((out) => { return { band: out?.band, start: out?.start, finish: out?.finish } })//clean up output to match the requirement
    const jsonContent = JSON.stringify(cleanUpOutput, null, 4);
    fs.writeFile(path.join(basePath, baseName + '.optimal.json'), jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
    return concert;
}
const args = process.argv.slice(2);

importData(args[0])