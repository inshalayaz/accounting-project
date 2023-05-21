import { AccountModel } from "../models/Accounts.mjs"

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
    
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).json(error.message)
    }
}