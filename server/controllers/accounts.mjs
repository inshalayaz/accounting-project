import { AccountModel } from "../models/Accounts.mjs"
import { v4 as uuidv4 } from 'uuid';

export const createAccount = async (req, res) => {
    console.log({req: req.body})
    const {accountName, accountType} = req.body
    try {
        const newAccount = await AccountModel.create({
            account_name: accountName,
            account_type: accountType
        })
        console.log({newAccount})
        res.status(201).json({ message: 'Account Created Successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }

}