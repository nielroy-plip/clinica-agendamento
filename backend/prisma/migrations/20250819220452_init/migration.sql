/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[appointments] DROP CONSTRAINT [appointments_dentistaId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[working_hours] DROP CONSTRAINT [working_hours_dentistaId_fkey];

-- DropTable
DROP TABLE [dbo].[users];

-- CreateTable
CREATE TABLE [dbo].[Dentist] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] VARCHAR(100) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
    [senha] VARCHAR(255) NOT NULL,
    [telefone] VARCHAR(20),
    [role] VARCHAR(50) NOT NULL CONSTRAINT [Dentist_role_df] DEFAULT 'RECEPCIONISTA',
    [ativo] BIT NOT NULL CONSTRAINT [Dentist_ativo_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Dentist_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Dentist_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Dentist_email_key] UNIQUE NONCLUSTERED ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[appointments] ADD CONSTRAINT [appointments_dentistaId_fkey] FOREIGN KEY ([dentistaId]) REFERENCES [dbo].[Dentist]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[working_hours] ADD CONSTRAINT [working_hours_dentistaId_fkey] FOREIGN KEY ([dentistaId]) REFERENCES [dbo].[Dentist]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
