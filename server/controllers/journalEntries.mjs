import { JournalEntryModel } from "../models/models.mjs";

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
