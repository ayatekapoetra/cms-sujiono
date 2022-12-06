'use strict'

class HomeDashboardController {
    async index ({auth, view}) {
        // console.log(auth);
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        return view.render("index")
    }
}

module.exports = HomeDashboardController

async function userValidate(auth){
    let user
    try {
        user = await auth.getUser()
        return user
    } catch (error) {
        console.log(error);
        return null
    }
}
