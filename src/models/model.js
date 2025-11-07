const {getConnection} = require('../config/db')
let conection = null

async function insertNewDataEmployee(employee){

    const {EmployeeId, Name, Address, Department, Email} = employee

    try{
        conection = await getConnection()
        const sql = "INSERT INTO employe VALUES (?, ?, ?, ?, ?)";
        await conection.query(sql, [EmployeeId, Name, Address, Department, Email])
    }
    catch(err){
        console.log(err)
    }
    finally{
        if (conection) {
            // Mengembalikan koneksi ke pool
            conection.release(); 
        }
    }
}

async function getEmployees(){

    let employees = null;

    try{
        conection = await getConnection()
        const sql = "SELECT * FROM employe"

        employees = await conection.query(sql)
    }
    catch(err){
        console.log(err)
    }
    finally{
        if (conection) {
            // Mengembalikan koneksi ke pool
            conection.release(); 
        }
    }

    return employees
}

async function getEmployeeByID(EmployeeId){

    let getEmpById = null;

    try{
        conection = await getConnection()
        getEmpById = await conection.query("SELECT * FROM employe WHERE EmployeeId = ?", [EmployeeId])
    }
    catch(err){
        console.log(err)
    }
    finally{
        if (conection) {
            // Mengembalikan koneksi ke pool
            conection.release(); 
        }
    }

    return getEmpById
}

async function getSearchEmployee(name, department){

    let getEmployee = null;

    try{

        let temps = []
        let raws = []

        if (name.length === 0 && department.length === 0){
            throw err;
        }
        else{
            
            if (name){
                raws.push("name LIKE ?")
                temps.push(`%${name}`)
            }

            if (department){
                raws.push("Department = ?")
                temps.push(department)
            }
        }
        
        conection = await getConnection()
        let sql = "SELECT * FROM employe"

        if (raws.length < 0){
            throw new Error("Data NotFound");         
        }

        sql += " WHERE " + raws.join(" AND ")

        getEmployee = await conection.query(sql, temps);        
    }
    catch(err){
        console.log(err)
    }
    finally{
        if (conection){
            conection.release()
        }
    }

    return getEmployee
}

async function deleteEmployeeById(employeeId){

    try{

        let temp = []

        conection = await getConnection()
        let sql = "DELETE FROM employe"

        if (employeeId.length != 0 || employeeId != undefined){
            temp.push("EmployeeId = ?")
        }

        if (temp.length === 0){
            throw new Error("Data NotFound"); 
        }

        sql += " WHERE " + temp.join()
        
        await conection.query(sql, [employeeId])
    }
    catch(err){
        console.log(err)
    }
    finally{

        if (conection){
            conection.release()
        }
    }
}

module.exports = {
    insertNewDataEmployee, 
    getEmployees, 
    getEmployeeByID, 
    getSearchEmployee, 
    deleteEmployeeById
}