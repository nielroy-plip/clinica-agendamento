import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const loginDentist = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const dentist = await prisma.dentist.findUnique({ where: { email } });
        if (!dentist) return res.status(404).json({ error: 'Dentista não encontrado' });

        const isMatch = await bcrypt.compare(password, dentist.senha!);
        if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

        const token = jwt.sign({ id: dentist.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.json({ 
            token, 
            user: { 
                id: dentist.id, 
                name: dentist.nome 
            } 
        });

    } catch (error) {
        console.error('Erro no login do dentista:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

export const loginPatient = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const patient = await prisma.patient.findFirst({ where: { email } });
        if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });

        const isMatch = await bcrypt.compare(password, patient.senha!);
        if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

        const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.json({ 
            token, 
            user: { 
                id: patient.id, 
                name: patient.nome
            } 
        });

    } catch (error) {
        console.error('Erro no login do paciente:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

export const createDentist = async (req: Request, res: Response) => {
    const { email, password, name, specialty } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const dentist = await prisma.dentist.create({
            data: {
                email,
                senha: hashedPassword,
                nome: name  
            }
        });
        res.status(201).json({ id: dentist.id, email: dentist.email });
    } catch (error) {
        console.error("Erro ao criar dentista:", error);
        res.status(500).json({ error: "Erro ao registrar dentista" });
    }
};