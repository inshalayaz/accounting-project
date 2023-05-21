import { DataTypes } from 'sequelize';

const JournalEntry = (sequelize) => {
  const model = sequelize.define('JournalEntries', {
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
    transactionDate: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    accountId: {
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
    entryType: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  });

  return model;
};

export default JournalEntry;
