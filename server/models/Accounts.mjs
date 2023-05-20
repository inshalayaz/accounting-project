import { Sequelize } from 'sequelize';
import sequelize from '../config/config.mjs';

const { DataTypes } = Sequelize;

const Account = sequelize.define('Account', {
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    account_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    account_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
  
  const JournalEntry = sequelize.define('JournalEntry', {
    entry_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'account_id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    entry_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  });
  
  // Define the relationship between Account and JournalEntry
  Account.hasMany(JournalEntry, { foreignKey: 'account_id' });
  JournalEntry.belongsTo(Account, { foreignKey: 'account_id' });