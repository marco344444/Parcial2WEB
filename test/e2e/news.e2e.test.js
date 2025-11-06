"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../src/index");
describe('News E2E', () => {
    test('GET /news/v1.0/list returns 200 and contains Noticias', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/news/v1.0/list');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Noticias');
    });
    test('GET /news/v1.0/detail/1 returns 200 and contains Presentación', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/news/v1.0/detail/1');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Presentación');
    });
});
