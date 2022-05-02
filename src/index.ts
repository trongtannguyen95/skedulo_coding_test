import Concert from './models/concert.model';
import fs from "fs"
import path from 'path';
function importData(filePath: string, fileName: string): Concert {
    const data = JSON.parse(fs.readFileSync(filePath).toString());
    const concert = new Concert({ name: 'test', performances: data })
    concert.sort();//sort list performance to create a priority queue
    const cleanUpOutput = concert.findBestSchedule().map((out) => { return { start: out?.start, finish: out?.finish, band: out?.band } })//clean up output to match the requirement
    const jsonContent = JSON.stringify(cleanUpOutput, null, 4);
    const baseName = fileName.replace(/\.[^/.]+$/, "")
    fs.writeFile(path.join(__dirname, `..`, baseName + '.optimal.json'), jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
    return concert;
}
const args = process.argv.slice(2);

importData(path.join(__dirname, `..`, args[0]), args[0])