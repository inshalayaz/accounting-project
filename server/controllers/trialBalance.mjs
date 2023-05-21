import { JournalEntryModel, AccountModel } from "../models/models.mjs";

export const getTrialBalance = async (req, res) => {
  try {
    // Retrieve all journal entries from the database, including associated account information
    const journalEntries = await JournalEntryModel.findAll({
      include: {
        model: AccountModel,
        required: false, // Perform a left join
      },
    });

    // Initialize an object to store the account balances
    const accountBalances = {};

    // Calculate the account balances by iterating through the journal entries
    for (const entry of journalEntries) {
      const { Account, amount, credit, debit } = entry;

      if (Account) {
        const { account_id } = Account;
        const transactionType = entry.transaction_type.toLowerCase();

        // Add or subtract the amount based on the transaction type (credit or debit)
        if (transactionType === 'credit') {
          accountBalances[account_id] = (accountBalances[account_id] || 0) - +amount;
        } else if (transactionType === 'debit') {
          accountBalances[account_id] = (accountBalances[account_id] || 0) + +amount;
        }
      }
    }

    // Prepare the trial balance report data with both account name and ID
    const trialBalance = await Promise.all(
      Object.entries(accountBalances).map(async ([accountId, balance]) => {
        const account = await AccountModel.findByPk(accountId);
        console.log( account)
        const account_name = account ? account.account_name : 'Unknown';
        const account_type = account.account_type.toLowerCase();
        let isDebit = false;

        if(account_type === 'asset' || account_type === 'expense'){
            isDebit = true
        }
        else {
            balance = balance * -1
        }

        return { account_id: accountId, account_name, balance, account_type, is_debit: isDebit};
      })
    );

    res.status(200).json(trialBalance);
  } catch (error) {
    console.error("Error generating trial balance report:", error);
    res.status(500).json({ error: "Failed to generate trial balance report" });
  }
};
