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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.uploadCSV = void 0;
const csv_parse_1 = require("csv-parse");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
exports.uploadCSV = upload.single('file');
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search parameter not provided.' });
        }
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: 'No CSV files uploaded.' });
        }
        const csvData = req.file.buffer.toString('utf-8');
        const csvRows = yield new Promise((resolve, reject) => {
            (0, csv_parse_1.parse)(csvData, { delimiter: ',' }, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
        const headerRow = csvRows[0]; // The first line is the header line
        const csvRowsData = csvRows.slice(1);
        const filteredRows = csvRowsData.filter((row) => {
            return Object.values(row).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));
        });
        console.log(filteredRows);
        return res.status(200).json({ results: filteredRows, header: headerRow });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.searchUsers = searchUsers;
