'use strict'

const Helpers = use('Helpers')
const moment = use('moment')
const Main = use("App/Models/HomeMain")
const Testimonial = use("App/Models/Testimonial")

class TestimonialController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const banner = (await Main.query().where( w => {
            w.where('tipe', 'banner-testimonial')
            w.where('aktif', 'Y')
        }).last()).toJSON()

        const testimonial = (await Testimonial.query().where('aktif', 'Y').fetch()).toJSON()

        return view.render("dashboard.testimonial.index", {banner: banner, list: testimonial})
    }

    async create ( { auth, view } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        return view.render("dashboard.testimonial.create")
    }

    async show ( { auth, params, view } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        const banner = (await Main.query().where( w => {
            w.where('tipe', 'banner-testimonial')
            w.where('aktif', 'Y')
        }).last()).toJSON()

        const data = (await Testimonial.query().where('id', params.id).last()).toJSON()

        return view.render("dashboard.testimonial.show", {data: data, banner: banner})
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
            const aliasName = `TESTIMONIAL-BANNER-${randURL}.${photo.extname}`
            photoUri = 'pages/images/background/'+aliasName
            await photo.move(Helpers.publicPath(`pages/images/background`), {
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

        const testimonial = new Testimonial()
        testimonial.fill({
            nama: req.title,
            subject: req.subtitle,
            narasi: req.narasi,
            photo: photoUri,
            urut: req.urut || 99
        })

        try {
            await testimonial.save()
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

    async updateBanner ( {auth, params, request, view} ) {
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
            const aliasName = `TESTIMONIAL-BANNER-${randURL}.${photo.extname}`
            photoUri = 'pages/images/background/'+aliasName
            await photo.move(Helpers.publicPath(`pages/images/background`), {
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

        console.log(params);
        const main = await Main.query().where('id', params.id).last()
        main.merge({
            title: req.title,
            subtitle: req.subtitle,
            photo: photoUri ? photoUri : main.photo
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

module.exports = TestimonialController

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