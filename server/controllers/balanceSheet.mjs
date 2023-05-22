import { JournalEntryModel, AccountModel } from "../models/models.mjs";
import { calculateOwnerEquityStatement } from "./ownerEquityStatement.mjs";

const calculateBalanceSheet = async () => {
    try {
        // Retrieve all journal entries from the database, including associated account information
        const journalEntries = await JournalEntryModel.findAll({
            include: {
                model: AccountModel,
                required: false, // Perform a left join
            },
        });

        // Initialize variables to store the asset and liability & equity totals
        let totalAssets = 0;
        let totalLiabilities = 0;
        let totalEquity = 0;
        let transactions = {
            assets: [],
            liabilities: [],
            equity: []
        }

        // Calculate the asset, liability, and equity totals by iterating through the journal entries
        for (const entry of journalEntries) {
            let { Account, amount, transaction_type } = entry;

            Account.dataValues.amount = amount
            transaction_type = transaction_type.toLowerCase();

            if (Account) {
                let { account_type } = Account;

                account_type = account_type.toLowerCase();

                if (account_type === 'asset') {
                    transactions.assets.push(Account)
                    // Asset account
                    if (transaction_type === 'debit') {
                        totalAssets += +amount;
                    } else if (transaction_type === 'credit') {
                        totalAssets -= +amount;
                    }
                } else if (account_type === 'liability') {
                    transactions.liabilities.push(Account)
                    // Liability account
                    if (transaction_type === 'credit') {
                        totalLiabilities += +amount;
                    } else if (transaction_type === 'debit') {
                        totalLiabilities -= +amount;
                    }
                } 
                
            }
        }
        const ownerEquityStatement = await calculateOwnerEquityStatement();
        totalEquity = ownerEquityStatement.newOwnerEquity

        console.log(+totalEquity)

        const isBalanced = totalAssets === +totalLiabilities + +totalEquity ? true : false

        // Prepare and return the balance sheet data
        const balanceSheet = {
            transactions,
            assets: totalAssets,
            liabilities: totalLiabilities,
            equity: totalEquity,
            isBalanced
        };

        return balanceSheet;
    } catch (error) {
        console.error("Error generating balance sheet:", error);
        throw new Error("Failed to generate balance sheet");
    }
};

export const generateBalanceSheet = async (req, res) => {
    try {
        const balanceSheet = await calculateBalanceSheet();

        res.status(200).json(balanceSheet);
    } catch (error) {
        console.error("Error generating balance sheet:", error);
        res.status(500).json({ error: "Failed to generate balance sheet" });
    }
};
