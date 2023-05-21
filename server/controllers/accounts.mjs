import { AccountModel } from "../models/models.mjs"

export const createAccount = async (req, res) => {
    const {account_name, account_type} = req.body
    try {
        await AccountModel.create({
            account_name,
            account_type
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