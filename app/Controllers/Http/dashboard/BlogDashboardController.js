'use strict'

const moment = use("moment")
const Visitor = use("App/Models/Visitor")

class BlogDashboardController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        console.log(user);

        return view.render("dashboard.blog.index")
    }

    async create ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        console.log(user);

        return view.render("dashboard.blog.create")
    }
}

module.exports = BlogDashboardController

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
