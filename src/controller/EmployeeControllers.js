const {insertNewDataEmployee, getEmployees, getEmployeeByID, getSearchEmployee, deleteEmployeeById} = require("../models/model")
const express = require('express')

const router = express.Router()

router.post('/insertEmployee', async (req, res) => {

    try{

        const reqBody = {
        EmployeeId: req.body.EmployeeId,
        Name: req.body.Name,
        Address: req.body.Address,
        Department: req.body.Department,
        Email: req.body.Email
    }

    await insertNewDataEmployee(reqBody)
    
    res.status(201).json({message: "Data berhasil dikirim"})

    }
    catch(err){
        console.log(err)

        res.status(500).send({ message: 'Internal server error during product update.', error: err.message})
    }
})

router.get('/getEmployees', async (req, res) => {

    try{
        
        const getEmp = await getEmployees()
        
        if (getEmp.length > 0 || getEmp != null){
            res.status(200).json(getEmp)
        }
    }
    catch(err){
        console.log(err)
    }
})

router.get('/getEmployeeById/:id', async (req, res) => {

    try{

        let { id } = req.params

        const getEmpByid = await getEmployeeByID(id)

        if (getEmpByid.length === 0) {
            return res.status(404).send({ message: `Product with ID ${id} not found.` });
        }

        res.status(200).json(getEmpByid[0])
    }
    catch(err){
        console.log(err)
    }
})

router.get("/Get/employees/search", async (req, res) => {

    try{
        
        const {name, department} = req.query;
        const getSearchEmp = await getSearchEmployee(name, department);

        if (getSearchEmp.length === 0){
            return res.status(200).json({message: 'No employees found matching the criteria.'})
        }

        res.json(getSearchEmp[0])
    }
    catch(err){
        console.log(err)
    }
})

router.delete("/deleteEmployeeById/:id", async (req, res) => {

    let { id } = req.params 
    console.log(id)
    try{

       const results = await deleteEmployeeById(id)
       console.log(results)

        if (!results || results.affectedRows === 0) {
            return res.status(404).send({ message: `Employee with ID ${id} not found.` });
        }

        res.status(200).json({message: `Employee by ${id} deleted successfully.`})
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router