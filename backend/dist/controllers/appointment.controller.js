"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const appointment_service_1 = require("../services/appointment.service");
const appointment_1 = require("../types/appointment");
const create = async (req, res) => {
    try {
        const validatedData = appointment_1.appointmentSchema.parse(req.body); //Validação com Zod
        const appointment = await (0, appointment_service_1.createAppointment)(validatedData);
        res.status(201).json(appointment);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Dados inválidos ' });
    }
};
exports.create = create;
