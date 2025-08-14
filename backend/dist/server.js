"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rota de teste
app.get('/', (req, res) => {
    res.send('API da Clínica Odontológica');
});
// Rota para agendamento 
app.post('/api/appointments', (req, res) => {
    const { paciente, data, procedimento } = req.body;
    res.json({
        sucess: true,
        appointment: { paciente, data, procedimento }
    });
});
app.use('/api/appointments', appointment_routes_1.default);
app.use(errorHandler_1.errorHandler); //Middlewate de erros
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
