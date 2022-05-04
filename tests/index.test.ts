import Concert from '../src/models/concert.model';
import fs from "fs"
import path from 'path';

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'test.json')).toString());
const sortedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'sorted_test.json')).toString());
const optimizedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'test.optimal.json')).toString());
describe('testing concert model file', () => {

    it("create & sort performances successfully", async () => {
        const testConcert = new Concert({ name: 'Test concert', performances: data });
        expect(testConcert.name).toBeDefined();
        expect(testConcert.name).toBe('Test concert');
        expect(testConcert.performances).toBeDefined();
        expect(testConcert.performances).toBeInstanceOf(Array);
        testConcert.sort();
        expect(JSON.parse(JSON.stringify(testConcert.performances))).toStrictEqual(sortedData);
    })
    it("optimize performances successfully", async () => {
        const testConcert = new Concert({ name: 'Test concert', performances: data });
        testConcert.sort();
        expect(JSON.parse(JSON.stringify(testConcert.findBestSchedule()))).toStrictEqual(optimizedData);
    })
});