import { AccountModel, JournalEntryModel, PastJournalEntryModel } from "../models/models.mjs";
import { Op } from "sequelize";

export const closeJournalEntries = async (req, res) => {
  // try {
    // Retrieve all journal entries from JournalEntryModel
    const journalEntries = await JournalEntryModel.findAll({
      include: {
        model: AccountModel,
        required: false,
      },
    });

    let closing_account_id_set = new Set();
   

    let accountsToBeClosed = await AccountModel.findAll({
      where: {
        account_type: {
          [Op.in]: ['expense', 'revenue', 'owner_drawings']
        },
        account_status: {
          [Op.not]: false
        }
      }
    })

    accountsToBeClosed.forEach(({account_id, account_name}) => {
      closing_account_id_set.add({account_id, account_name})
    })
    

    for (const { account_id, account_name } of closing_account_id_set) {
      await AccountModel.update(
        { account_status: false, account_name: `${account_name}_${account_id}` },
        { where: { account_id: account_id } }
      );
    }

    // Prepare the journal entry records for insertion into PastJournalEntryModel
    const pastJournalEntries = journalEntries.map(entry => ({
      transaction_date: entry.transaction_date,
      description: entry.description,
      transaction_type: entry.transaction_type,
      account_id: entry.account_id,
      amount: entry.amount,
      entry_type: entry.entry_type,
    }));

    // Create journal entry history records in PastJournalEntryModel
    await PastJournalEntryModel.bulkCreate(pastJournalEntries);

    // Delete all journal entries from JournalEntryModel
    await JournalEntryModel.destroy({
      truncate: true,
      where: {},
    });

    res.status(200).json({ message: 'Journal entries closed successfully' });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};
