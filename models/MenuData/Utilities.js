const mongoose = require('mongoose')
const MenuDataModel = require('./Model').MenuDataModel

async function insertMenuDate(date, menuID, b, l, s, d) {
  try{
    const menudate= new MenuDataModel({date: date, menuID:menuID, b:b, l:l, s:s, d:d})
    await menudate.save()
    console.log('Inserted succesfully into MenuData')
    return true
  }
  catch(err)
  {
    console.log('Insertion falied: \n' + err)
    return false
  }
}

async function insertManyMenuDates(menuDates) {
    let connections = 0;
    try{
        if(!(menuDates && menuDates.length && menuDates.length!=0)) return;

        for(let i=0; i<menuDates.length; i++)
        {
            let status = await insertMenuDate(menuDates[i].date, menuDates[i].menuID, menuDates[i].b, menuDates[i].l, menuDates[i].s, menuDates[i].d)
            if(status) connections++;
        }

        return connections;
    }
    catch(err) 
    {
        console.log(`Something went wrong: \n Total inserted: ${connections} inside MenuData` + err)
        return connections;
    }
}

async function fetchMenuDateData(req, res, startDate, endDate) {
    let menuDates = undefined;

    let data = {response: ''}
    let status = false
    
    try{
        menuDates = await MenuDataModel.find({date : {$lte : endDate, $gte : startDate}})

        if(!menuDates || (menuDates && menuDates!== undefined && menuDates.length===0)) 
        {
            console.log('No menuDates within given date range.')
            data.response = 'No menuDates within given date range.'
            // res.json(data)
            status=false
            return {status: status, error: false, menuList: menuDates, data: data}
        }
        else{
            console.log(`found ${menuDates.length} number of queries.`)
            // res.json(data)
            status=true
            return {status: status, error: false, menuList: menuDates, data: data}
        }
        
    } catch(err) {
        console.log(err)
        data.response = err
        status = false
        return {status: status, error: true, menuList: menuDates, data: data}
    } 
}

async function removeMenuDate(req, res, date, oid) {
    let result = undefined;
    let rstatus = false; 
    try{
        if(oid) {
            result= await MenuDataModel.deleteOne({_id: oid})
            rstatus=true
            console.log(result)
            res.json({response: result})
        }else if(date) { 
            result= await MenuDataModel.deleteOne({date: date})
            rstatus=true
            console.log(result)
            res.json({response: result})
        }else{
            rstatus=false
            res.sendStatus(500).send('An internal error occured at the server. We are sorry! ;(')
        }
        
    } catch(err) {
        rstatus=false
        console.log(err)
        res.sendStatus(500).json({response: err}) 
    }
}

async function updateMenuDate(req, res, date, menuID, b, l, s, d) {
    let result = undefined;
    let ustatus = false; 
    try{
        result= await MenuDataModel.updateOne({_id: oid}, {$set: {menuID:menuID, b:b, l:l, s:s, d:d}})
        ustatus=true
        console.log(result)
        res.json({response: result})
    } catch(err) {
        ustatus=false
        console.log(err)
        res.sendStatus(500).json({response: err}) 
    }
}

module.exports = {insertMenuDate, insertManyMenuDates, removeMenuDate, updateMenuDate, fetchMenuDateData}