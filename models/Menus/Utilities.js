const mongoose = require('mongoose')
const MenuModel = require('./Model')

async function insertMenusOne(req, res, Menu) {

    try {
        let newMenu = new MenuModel({b:Menu.b, l:Menu.l, s:Menu.s, d:Menu.d})
        await newMenu.save()
        console.log('insertMenusOne: Menu Inserted sucessfully.')
        res.json({response: 'Success'})
        return true
    } catch (err) {
        console.log('insertMenusOne: throwed an error.')
        res.sendStatus(500).json({response: "Something went wrong. We're Sorry!"})
        return false
    }   

}

async function insertMenusMany(req, res, menuList) {
    let connections = 0
    try {
        for(let i=0; i<menuList.length; i++)
        {
            let status = insertMenusMany(req, res, menuList[i])
            if(status) connections++
            else throw Error('There was an error while inserting one of the documents.')
        }
        console.log(`insertMenusMany: ${connections} Menu(s) Inserted sucessfully.`)
        res.json({response: `Success: ${connections}`})
        return true
    } catch (err) {
        console.log(`insertMenusMany: throwed an error.\ninsertMenusMany: only ${connections} Menu(s) Inserted sucessfully. Encountered an error.`)
        res.sendStatus(500).json({response: `Inserted only ${connections} menu(s). Something went wrong. We're Sorry!`})
        return false
    }   
}

async function fetchMenuById(req, res, menuid) {
    let menu = undefined;
    try {
        menu = await MenuModel.find({_id: menuid})

        if(menu && menu.length!==undefined && menu.length===0) {
            console.log('fetchMenuById: menuid match not found!')
            // res.json({response: 'Menu with given menuid not found.'})
            return { status:false, menu: [], data: {response: 'Menu with given menuid not found.'} }
        } 
        else if(menu && menu.length!==undefined && menu.length===1){
            // res.json(menu[0])
            console.log('fetchMenuById: match found! Document returned successfully.\n' + menu[0])
            return { status:true, menu: menu, data: {response: 'match found! Document returned successfully.'} }
        } 
        else {
            throw Error('menu object is not an array Or it has some wierd value, which should not happen.\nmenu is expected to be an array of documents.')
        }
        return menu
    } catch (err) {
        console.log('fetchMenuById: throwed an error!\n' + err + 'menu: ' + menu.length)
        // res.sendStatus(500).json({response: "Something went wrong. We're Sorry!"})
        return { status:false, menu: [], data: {response: err} }    
    }
}

async function fetchMenusAll(req, res) {
    let menuList = undefined

    try {
        menuList = await MenuModel.find({})

        if(menuList) {
            console.log('fetchMenusAll: All menus have been fetched successfully. Length: ' + menuList.length)
            await res.json(menuList)
            console.log('fecthMenusAll: data successfully sent to client.')
        } else {
            console.log('fetchMenusAll: menuList is undefined. typeof: ' + typeof menuList)
            throw Error('menuList is undefined. typeof: ' + typeof menuList + '\nThis should not happen.')
        }
    }
    catch (err) {
        console.log('fetchMenusAll: throwed an error.' + err)
        await res.sendStatus(500).json({response: "Something went wrong. We're sorry!" })
        console.log('error message sent to client.')
    }

}

async function removeMenuById(req, res, menuid) {
    let result = undefined
    try {
        result = await MenuModel.deleteOne({_id:menuid})

        if(result.acknowledged && result.deletedCount===1) {
            console.log('removeMenuById: menu with menuid: ' + menuid +' has been deleted successfully.')
            await res.json({response: result})
            console.log('removeMenuById: result successfully sent to client.')
        } else if(result.acknowledged && result.deletedCount===0) {
            console.log('removeMenuById: no document has been deleted. Matches found: ')
            await res.json({response: result})
            console.log('removeMenuById: result successfully sent to client.')
        } else if(!result.acknowledged) {
            console.log('removeMenuById: delete request has not been acknowledged by db.')
            throw Error('menuList is undefined. typeof: ' + typeof menuList + '\nThis should not happen.')
        }
    }
    catch (err) {
        console.log('removeMenuById: throwed an error.' + err)
        await res.sendStatus(500).json({response: "Something went wrong. We're sorry!" })
        console.log('error message sent to client.')
    }
}

async function updateMenuById(req, res, menuid) {
    
}
module.exports = {insertMenusOne, insertMenusMany, fetchMenuById, fetchMenusAll, removeMenuById, updateMenuById}