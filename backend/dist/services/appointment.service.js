"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAppointment = async (data) => {
    return await prisma.appointment.create({
        data: {
            ...data,
            data: new Date(data.data)
        }
    });
};
exports.createAppointment = createAppointment;
// adicionar outros métodos (get, update, delete)
