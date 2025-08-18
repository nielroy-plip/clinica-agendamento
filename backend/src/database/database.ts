import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'mssql', 
  dialectModule: require('tedious'), 
  host: 'localhost', // Ou o IP do seu servidor SQL Server
  port: 1433, 
  database: 'ClinicaDB', 
  username: 'sa', 
  password: 'sua_senha',
  logging: false, // Desative em produção
  dialectOptions: {
    options: {
      encrypt: false, // Desative se não usar SSL
      trustServerCertificate: true, // Para ambientes de desenvolvimento/local
    },
  },
  define: {
    timestamps: true,
    underscored: true, // Opcional: snake_case nas colunas
  },
});
