import { JournalEntryModel, AccountModel } from "../models/models.mjs";

export const generateIncomeStatement = async (req, res) => {
  try {
    // Retrieve all journal entries from the database, including associated account information
    const journalEntries = await JournalEntryModel.findAll({
      include: {
        model: AccountModel,
        required: false, // Perform a left join
      },
    });

    // Initialize variables to store the revenue, expense, and net income totals
    let totalRevenue = 0;
    let totalExpenses = 0;
    let netIncome = 0;

    let entities = {
      revenue: [],
      expense: []
    }

    // Calculate the revenue and expense totals by iterating through the journal entries
    for (const entry of journalEntries) {
      const { Account, amount, entry_type } = entry;

      if (Account) {
        const { account_type } = Account;
        Account.dataValues.amount = amount

        if (account_type === 'revenue') {
          entities.revenue.push(Account)
          // Revenue account
          totalRevenue += +amount;
        } else if (account_type === 'expense') {
          entities.expense.push(Account)
          // Expense account
          totalExpenses += +amount;
        }
      }
    }

    // Calculate the net income by subtracting the total expenses from the total revenue
    netIncome = totalRevenue - totalExpenses;

    // Retrieve the net income from the "owner_capital" account
    const ownerCapitalAccount = await AccountModel.findOne({
      where: { account_type: 'owner_capital' },
    });

    if (ownerCapitalAccount) {
      const { account_name, account_id } = ownerCapitalAccount;
      const ownerCapitalEntry = await JournalEntryModel.findOne({
        where: { account_id },
      });

      if (ownerCapitalEntry) {
        const { amount, entry_type } = ownerCapitalEntry;

        // Add or subtract the amount based on the entry type (debit or credit)
        if (entry_type === 'debit') {
          netIncome -= +amount;
        } else if (entry_type === 'credit') {
          netIncome += +amount;
        }
      }
    }

    // Prepare the income statement data
    const incomeStatement = {
      entities,
      revenue: totalRevenue,
      expenses: totalExpenses,
      netIncome
    };

    res.status(200).json(incomeStatement);
  } catch (error) {
    console.error("Error generating income statement:", error);
    res.status(500).json({ error: "Failed to generate income statement" });
  }
};
