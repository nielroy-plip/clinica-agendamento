"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchema = void 0;
const zod_1 = require("zod");
exports.appointmentSchema = zod_1.z.object({
    paciente: zod_1.z.string().min(3, { message: "Nome do paciente muito curto" }),
    data: zod_1.z.coerce.date().min(new Date(), { message: "Data deve ser futura" }),
    procedimento: zod_1.z.string().min(5, { message: "Procedimento deve ter pelo menos 5 caracters" })
});
