import { Sequelize, where } from "sequelize";
import { AccountModel, JournalEntryModel, PastJournalEntryModel } from "../models/models.mjs"

export const createAccount = async (req, res) => {
    const { accountName, accountType } = req.body;
  
    // try {
      const doesExist = await AccountModel.findAndCountAll({
        where: {
          account_name: accountName,
          account_type: accountType
        }
      });
  
      if (doesExist.count === 1) {
        return res.status(500).json({message: 'Account with the same name already exists'});
      }
  
      await AccountModel.create({
        account_name: accountName,
        account_type: accountType
      });
  
      return res.status(201).json({ message: 'Account Created Successfully' });
  
  };
  

export const getAccounts = async (req, res) => {
    try {
        const accounts = await AccountModel.findAll({
            where: {
                account_status: {
                    [Sequelize.Op.notIn]: [false],
                }
            }
        })
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

        const { accountId } = req.body

        const resultObj = {}

        let journalEntries = await JournalEntryModel.findAll({
            include: {
                model: AccountModel,
                required: false,
            },
            where: {
                account_id: accountId
            }
        });

        const pastEntries = await PastJournalEntryModel.findAll({
            include: {
                model: AccountModel,
                required: false,
                where: {
                    account_type: {
                        [Sequelize.Op.notIn]: ['revenue', 'expense']
                    }
                }
            },
            where: {
                account_id: accountId
            }
        })

        journalEntries = [...journalEntries, ...pastEntries]

        res.status(200).json(journalEntries)

    } catch (error) {
        res.status(500).json(error.message)
    }
}