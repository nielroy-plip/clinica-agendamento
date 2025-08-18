import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export class Dentist extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public specialty!: string;
}

Dentist.init(
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
    specialty: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Dentists', 
    timestamps: true,
  }
);