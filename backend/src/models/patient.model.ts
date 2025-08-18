import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export class Patient extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public phone!: string;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Patients',
    timestamps: true,
  }
);