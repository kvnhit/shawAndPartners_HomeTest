"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const filesRoute_1 = __importDefault(require("./routes/filesRoute"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(filesRoute_1.default);
app.use(usersRoute_1.default);
exports.default = app;
