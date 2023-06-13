import { AccountModel, JournalEntryModel } from "../models/models.mjs"

export const createAccount = async (req, res) => {
    const {accountName, accountType} = req.body
    try {
        await AccountModel.create({
            account_name: accountName,
            account_type: accountType
        })
        res.status(201).json({ message: 'Account Created Successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getAccounts = async (req, res) => {
    try {
        const accounts = await AccountModel.findAll()
        accounts.sort((prevAccount, nextAccount) => {
            if (prevAccount.account_type < nextAccount.account_type)
                  return -1;
            return 1;
        });
    
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getTAccounts = async (req, res) => {
    try {

        const {accountId} = req.body
        
        const resultObj = {}

        const journalEntries = await JournalEntryModel.findAll({
            include: {
              model: AccountModel,
              required: false, // Perform a left join
            },
            where: {
                account_id: accountId
            }
          });

        //   let result = {
        //     debit: [],
        //     credit: []
        //   }
          
        //   for (const entry of journalEntries) {
        //     const { Account, amount, entry_type, transaction_type } = entry;
        //     console.log(Account)
        //     if(transaction_type.toLowerCase() === 'debit'){
        //         result.debit.push(entry)
        //     } else {
        //         result.credit.push(entry)
        //     }
            
        //   }

          res.status(200).json(journalEntries)

    } catch (error) {
        res.status(500).json(error.message)
    }
}