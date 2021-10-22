"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLogs = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const session_1 = require("./session");
const utils_1 = require("../utils");
let CommandLogs = class CommandLogs extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], CommandLogs.prototype, "log_id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => session_1.Session)
], CommandLogs.prototype, "session_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
    })
], CommandLogs.prototype, "command_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
    })
], CommandLogs.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
    })
], CommandLogs.prototype, "title_info", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(Object.assign({ type: sequelize_1.DataTypes.STRING }, (0, utils_1.customModelColumn)({ name: "response", json: true })))
], CommandLogs.prototype, "response", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(Object.assign({ type: sequelize_1.DataTypes.STRING }, (0, utils_1.customModelColumn)({ name: "params", json: true })))
], CommandLogs.prototype, "params", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    })
], CommandLogs.prototype, "is_error", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => session_1.Session, { foreignKey: "session_id" })
], CommandLogs.prototype, "session", void 0);
CommandLogs = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "command_logs",
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    })
], CommandLogs);
exports.CommandLogs = CommandLogs;
