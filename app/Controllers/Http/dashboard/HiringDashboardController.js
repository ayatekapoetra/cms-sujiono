'use strict'

const ContentHiring = use("App/Models/ContentHiring")

class HiringDashboardController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        console.log(user);

        const contentHiring = (await ContentHiring.query().where('aktif', 'Y').last()).toJSON()

        return view.render("dashboard.hiring.index", {data: contentHiring})
    }

    async store ({auth, request, response, view}) {
        let req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        console.log(req);

        const contentHiring = await ContentHiring.query().where('id', 1).first()
        contentHiring.merge({
            teks: req.teks
        })

        try {
            await contentHiring.save()
            return response.route('/dashboard')
        } catch (error) {
            console.log(error);
            return view.render("dashboard.hiring.index", {data: contentHiring})
        }
        
    }
}

module.exports = HiringDashboardController

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