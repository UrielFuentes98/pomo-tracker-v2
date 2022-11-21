"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
exports.default = ({ app }) => {
    app.get("/status", (req, res) => {
        res.status(200).end();
    });
    app.head("/status", (req, res) => {
        res.status(200).end();
    });
    app.enable("trust proxy");
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    //routes
    /// catch 404 and forward to error handler
    app.use((_req, _res, next) => {
        const err = new Error("Not Found");
        err["status"] = 404;
        next(err);
    });
    /// error handlers
    app.use((err, _req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === "UnauthorizedError") {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, _req, res, _next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
//# sourceMappingURL=express.js.map