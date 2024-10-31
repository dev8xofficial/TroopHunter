import { type ILeadBusinessAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import { Business } from './Business';
import { Lead } from './Lead';
import sequelize from '../config/database';

export class LeadBusiness extends Model<ILeadBusinessAttributes> implements ILeadBusinessAttributes {
  public leadId!: string;
  public businessId!: string;
}

LeadBusiness.init(
  {
    leadId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'LeadBusiness',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['leadId', 'businessId'],
      },
    ],
  },
);

// Add the correct associations for LeadBusiness model
Lead.belongsToMany(Business, { through: LeadBusiness, foreignKey: 'leadId' });
Business.belongsToMany(Lead, { through: LeadBusiness, foreignKey: 'businessId' });
