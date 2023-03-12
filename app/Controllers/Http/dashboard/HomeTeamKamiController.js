'use strict'

const Helpers = use('Helpers')
const moment = use('moment')
const Main = use("App/Models/HomeMain")

class HomeTeamKamiController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const data = (await Main.query().where( w => {
            w.where('tipe', 'team-member')
            w.where('aktif', 'Y')
        }).fetch()).toJSON()

        const res = (await Main.query().where( w => {
            w.where('tipe', 'team-teks')
            w.where('aktif', 'Y')
        }).last()).toJSON()

        console.log(res);

        return view.render("dashboard.home-team-kami.index", {list: data, res: res})
    }

    async create ( { auth, view } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        return view.render("dashboard.home-team-kami.create")
    }

    async show ( { auth, params, view } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        const data = (await Main.query().where('id', params.id).last()).toJSON()

        return view.render("dashboard.home-team-kami.show", {data: data})
    }

    async store (  { auth, request, view } ) {
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const validateFile = {
            types: ['image'],
            size: '20mb',
            extnames: ['png', 'gif', 'jpg', 'jpeg', 'pdf']
        }

        const photo = request.file('photo', validateFile)

        let photoUri = null
        if(photo){
            console.log('photoUri', photo);
            const randURL = moment().format('YYYYMMDDHHmmss')
            const aliasName = `TEAM-${randURL}.${photo.extname}`
            photoUri = 'pages/images/resource/'+aliasName
            await photo.move(Helpers.publicPath(`pages/images/resource`), {
                name: aliasName,
                overwrite: true,
            })

            if (!photo.moved()) {
                return {
                    success: false,
                    message: 'Failed upload photo image...'
                }
            }

            req.photo = photoUri
        }

        const team = new Main()
        team.fill({
            tipe: 'team-member',
            title: req.title,
            subtitle: req.subtitle,
            narasi: req.narasi,
            images: photoUri,
            urut: req.urut || 99
        })

        try {
            await team.save()
            return {
                success: true,
                message: 'Success save data...'
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error
            }
        }
    }

    async update ( {auth, params, request, view} ) {
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        const validateFile = {
            types: ['image'],
            size: '20mb',
            extnames: ['png', 'gif', 'jpg', 'jpeg', 'pdf']
        }

        const photo = request.file('photo', validateFile)

        let photoUri = null
        if(photo){
            console.log('photoUri', photo);
            const randURL = moment().format('YYYYMMDDHHmmss')
            const aliasName = `TEAM-${randURL}.${photo.extname}`
            photoUri = 'pages/images/resource/'+aliasName
            await photo.move(Helpers.publicPath(`pages/images/resource`), {
                name: aliasName,
                overwrite: true,
            })

            if (!photo.moved()) {
                return {
                    success: false,
                    message: 'Failed upload photo image...'
                }
            }

            req.photo = photoUri
        }

        const data = await Main.query().where('id', params.id).last()
        console.log(data);
        console.log(req);
        data.merge({
            title: req.title,
            subtitle: req.subtitle,
            narasi: req.narasi,
            photo: photoUri || data.photo,
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

    async updateText ( {auth, params, request, view} ) {
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        // console.log(req);
        console.log(params);
        const main = await Main.query().where('id', params.id).last()
        main.merge({
            title: req.title,
            subtitle: req.subtitle,
            narasi: req.narasi
        })
        try {
            await main.save()
            return {
                success: true,
                message: 'Success save data...'
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error
            }
        }
    }

    async destroy ( { auth, params } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const main = await Main.query().where('id', params.id).last()
        main.merge({aktif: 'N'})
        try {
            await main.save()
            return {
                success: true,
                message: 'Success save data...'
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error
            }
        }
    }
}

module.exports = HomeTeamKamiController

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