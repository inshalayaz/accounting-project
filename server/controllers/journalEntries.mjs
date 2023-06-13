import { Op } from 'sequelize';
import { JournalEntryModel, PastJournalEntryModel, AccountModel } from "../models/models.mjs";

export const createJournalEntry = async (req, res) => {
  try {
    const { credit, debit, description } = req.body;


    const entryObj = {
      credit,
      debit,
    };

    let transaction_date = Date.now();
    for (const key in entryObj) {
      const transactions = entryObj[key];

      for (const transactionType of transactions) {
        const { transaction_type, account_id, amount, entry_type } = transactionType;

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
            [Op.notIn]: ["expense", "revenue", "owner_drawings"],
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

    let formatedEntriesList = formatJournalEntries(allEntries);

    res.status(200).json(formatedEntriesList);
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

    const formatedEntriesList = formatJournalEntries(currentEntries);
    
    res.status(200).json(formatedEntriesList);


  } catch (error) {
    console.error("Error retrieving journal entries:", error);
    res.status(500).json({ error: "Failed to retrieve journal entries" });
  }
};


function formatJournalEntries(entryList) {
  const formatedEntriesList = [];
  for (const entry of entryList) {
    const existingEntry = formatedEntriesList.find(obj => new Date(obj.date).getTime() === new Date(entry.transaction_date).getTime());

    if (existingEntry) {
      if (entry.transaction_type === 'Debit') {
        existingEntry.debit = entry;
      } else {
        existingEntry.credit = entry;
      }
    } else {
      const formatedEntries = {
        date: new Date(entry.transaction_date),
      };

      if (entry.transaction_type === 'Debit') {
        formatedEntries.debit = entry;
      } else {
        formatedEntries.credit = entry;
      }

      formatedEntriesList.push(formatedEntries);
    }
  }

  return formatedEntriesList;
}