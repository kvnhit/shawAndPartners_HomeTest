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
exports.uploadCSV = void 0;
const fileService_1 = require("../fileService");
const uploadCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Checks if the CSV file was sent in the request
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: 'Nenhum arquivo CSV enviado.' });
        }
        // Calls the function to process the CSV file (using uploadCSVFile)
        // The uploadCSVFile function processes the file and returns formatted
        const result = yield (0, fileService_1.uploadCSVFile)(req.file.buffer);
        if (result.success) {
            return res.status(200).json({ message: 'CSV file uploaded successfully.' });
        }
        else {
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.uploadCSV = uploadCSV;
