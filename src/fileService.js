"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCSVFile = void 0;
const csv_parse_1 = require("csv-parse");
const stream_1 = require("stream");
function uploadCSVFile(fileBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Converts the file buffer into a readable stream
            const readableStream = new stream_1.Readable();
            readableStream.push(fileBuffer);
            readableStream.push(null);
            // Parse the CSV from the stream
            const csvData = yield parseCSVFromStream(readableStream);
            console.log(csvData);
            // To do: database storage (optional)
            return { success: true, data: csvData };
        }
        catch (error) {
            console.error('Error processing CSV file:', error);
            return { success: false };
        }
    });
}
exports.uploadCSVFile = uploadCSVFile;
// Helper function to parse CSV from the stream
function parseCSVFromStream(stream) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const data = [];
            stream
                .pipe((0, csv_parse_1.parse)({ delimiter: ',' })) // csv file delimiter
                .on('data', (row) => {
                data.push(row);
            })
                .on('end', () => {
                resolve(data);
            })
                .on('error', (error) => {
                reject(error);
            });
        });
    });
}
