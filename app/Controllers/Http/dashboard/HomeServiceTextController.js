'use strict'

const Helpers = use('Helpers')
const moment = use('moment')
const Main = use("App/Models/HomeMain")

class HomeServiceTextController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const data = (await Main.query().where( w => {
            w.where('tipe', 'services-teks')
            w.where('aktif', 'Y')
        }).fetch()).toJSON()

        return view.render("dashboard.home-service-text.index", {list: data})
    }

    async show ( { auth, params, view } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        const data = (await Main.query().where('id', params.id).last()).toJSON()

        return view.render("dashboard.home-service-text.show", {data: data})
    }

    async update ( {auth, params, request, view} ) {
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        const data = await Main.query().where('id', params.id).last()
        console.log(data);
        console.log(req);
        data.merge({
            title: req.title,
            subtitle: req.subtitle,
            urut: req.urut
        })

        try {
            await data.save()
            return {
                success: true,
                message: 'Success save data...'
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'Failed save data...'
            }
        }
    }
}

module.exports = HomeServiceTextController

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