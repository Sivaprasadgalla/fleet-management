const VehicleExpense= require('../models/vehicle.expenses.model')

const createVehicleExpense = async (req, res) => {
    try {
        const { userId, vehicleId,expenses} = req.body;
        let vehicleExpense = await VehicleExpense.findOne({
            user: userId,
            vehicle: vehicleId
        });

        if (!vehicleExpense) {
            vehicleExpense = await VehicleExpense.create({
                user: userId,
                vehicle: vehicleId,
                expenses: expenses
            });
        } else {
            vehicleExpense.expenses.push(...expenses);
            await vehicleExpense.save();
        }

        res.status(201).json({
            message: "Vehicle Expenses Added Successfully",
            data: vehicleExpense
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error Occured",
            error: error.message
        });
    }
};

const getVehicleExpense =async(req,res)=>{
    try {
        
        const {userId,vehicleId}=req.query;
        const getExpenses = await VehicleExpense.find({user:userId,vehicle:vehicleId});
        res.status(200).json({message:"Vehicle Expenses Details",data:getExpenses})
    } catch (error) {
         res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}

const updateVehicleExpense = async (req, res) => {
    try {
        const { userId, vehicleId, expenses} = req.body;

        const updatedExpense = await VehicleExpense.findOneAndUpdate(
           {
                user: userId,
                vehicle: vehicleId,
                "expenses._id": expenses._id
            },
            {
                $set: {
                    "expenses.$.expenseName": expenses.expenseName,
                    "expenses.$.date": expenses.date,
                    "expenses.$.amount": expenses.amount
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                message: "Vehicle Expense not found"
            });
        }

        res.status(200).json({
            message: "Vehicle Expenses Updated Successfully",
            data: updatedExpense
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error Occured",
            error: error.message
        });
    }
};

const deleteVehicleExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, vehicleId } = req.query;
       
        const updatedExpense = await VehicleExpense.findOneAndUpdate(
            {
                user: userId,
                vehicle: vehicleId,
                "expenses._id": id
            },
            {
                $pull: {
                    expenses: {
                        _id: id
                    }
                }
            },
            {
                new: true
            }
        );
        if (!updatedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense Deleted Successfully",
            data: updatedExpense
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error Occured",
            error: error.message
        });
    }
};

module.exports = {createVehicleExpense,getVehicleExpense,updateVehicleExpense,deleteVehicleExpense}