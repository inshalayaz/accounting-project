import { Op } from 'sequelize';
import { JournalEntryModel, PastJournalEntryModel, AccountModel } from "../models/models.mjs";

export const createJournalEntry = async (req, res) => {
  try {
    const { credit, debit } = req.body;

    const entryObj = {
      credit,
      debit,
    };

    for (const key in entryObj) {
      const transactions = entryObj[key];

      for (const transactionType of transactions) {
        const { transaction_date, description, transaction_type, account_id, amount, entry_type } = transactionType;

        try {
          await JournalEntryModel.create({
            transaction_date,
            description,
            transaction_type,
            account_id,
            amount,
            entry_type,
          });
        } catch (error) {
          console.error("Error creating journal entry:", error);
          // Handle the error or throw it to the outer catch block
          throw error;
        }
      }
    }

    res.status(200).json({ message: "Journal entries created successfully" });
  } catch (error) {
    console.error("Error creating journal entries:", error);
    res.status(500).json({ error: "Failed to create journal entries" });
  }
};

export const getAllJournalEntries = async (req, res) => {
  try {
    const pastEntries = await PastJournalEntryModel.findAll({
      include: {
        model: AccountModel,
        where: {
          account_type: {
            [Op.notIn]: ["expense", "revenue"],
          },
        },
      },
    });

    const currentEntries = await JournalEntryModel.findAll({
      include: {
        model: AccountModel,
        required: false, // Perform a left join
      },
    });

    const allEntries = [...pastEntries, ...currentEntries];

    res.status(200).json({ entries: allEntries });
  } catch (error) {
    console.error("Error retrieving journal entries:", error);
    res.status(500).json({ error: "Failed to retrieve journal entries" });
  }
};


export const getCurrentJournalEntries = async (req, res) => {
  try {
    const currentEntries = await JournalEntryModel.findAll({
      include: {
        model: AccountModel,
        required: false, // Perform a left join
      },
    });

    const allEntries = [...currentEntries];

    res.status(200).json({ entries: allEntries });
  } catch (error) {
    console.error("Error retrieving journal entries:", error);
    res.status(500).json({ error: "Failed to retrieve journal entries" });
  }
};