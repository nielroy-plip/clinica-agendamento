/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Appointment];

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] VARCHAR(100) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
    [senha] VARCHAR(255) NOT NULL,
    [telefone] VARCHAR(20),
    [role] VARCHAR(50) NOT NULL CONSTRAINT [users_role_df] DEFAULT 'RECEPCIONISTA',
    [ativo] BIT NOT NULL CONSTRAINT [users_ativo_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[patients] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] VARCHAR(100) NOT NULL,
    [cpf] VARCHAR(14),
    [telefone] VARCHAR(20) NOT NULL,
    [email] VARCHAR(100),
    [dataNascimento] DATETIME2,
    [endereco] VARCHAR(200),
    [observacoes] TEXT,
    [ativo] BIT NOT NULL CONSTRAINT [patients_ativo_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [patients_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [patients_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [patients_cpf_key] UNIQUE NONCLUSTERED ([cpf])
);

-- CreateTable
CREATE TABLE [dbo].[procedures] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] VARCHAR(200) NOT NULL,
    [descricao] TEXT,
    [duracao] INT NOT NULL,
    [valor] DECIMAL(10,2),
    [ativo] BIT NOT NULL CONSTRAINT [procedures_ativo_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [procedures_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [procedures_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[appointments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [dataHora] DATETIME2 NOT NULL,
    [status] VARCHAR(50) NOT NULL CONSTRAINT [appointments_status_df] DEFAULT 'AGENDADO',
    [observacoes] TEXT,
    [valor] DECIMAL(10,2),
    [pacienteId] INT NOT NULL,
    [dentistaId] INT NOT NULL,
    [procedimentoId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [appointments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [appointments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[working_hours] (
    [id] INT NOT NULL IDENTITY(1,1),
    [diaSemana] INT NOT NULL,
    [horaInicio] VARCHAR(5) NOT NULL,
    [horaFim] VARCHAR(5) NOT NULL,
    [ativo] BIT NOT NULL CONSTRAINT [working_hours_ativo_df] DEFAULT 1,
    [dentistaId] INT,
    CONSTRAINT [working_hours_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[appointments] ADD CONSTRAINT [appointments_pacienteId_fkey] FOREIGN KEY ([pacienteId]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[appointments] ADD CONSTRAINT [appointments_dentistaId_fkey] FOREIGN KEY ([dentistaId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[appointments] ADD CONSTRAINT [appointments_procedimentoId_fkey] FOREIGN KEY ([procedimentoId]) REFERENCES [dbo].[procedures]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[working_hours] ADD CONSTRAINT [working_hours_dentistaId_fkey] FOREIGN KEY ([dentistaId]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
