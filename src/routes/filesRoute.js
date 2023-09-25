"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const FilesController_1 = require("../controllers/FilesController");
const router = (0, express_1.Router)();
// Multer configuration to save files to disk
// memoryStorage to buffer in memory
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// CSV file upload route
router.post('/api/files', upload.single('file'), FilesController_1.uploadCSV);
exports.default = router;
