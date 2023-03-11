'use strict'

const Helpers = use('Helpers')
const moment = use('moment')
const Main = use("App/Models/HomeMain")

class HomeBannerController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const data = (await Main.query().where( w => {
            w.where('tipe', 'slider-banner')
            w.where('aktif', 'Y')
        }).fetch()).toJSON()

        return view.render("dashboard.home-banner.index", {list: data})
    }

    async create ( { auth, view } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }


        return view.render("dashboard.home-banner.create")
    }

    async store ({auth, request, view}) {
        let req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        const validateFile = {
            types: ['image'],
            size: '10mb',
            extnames: ['png', 'gif', 'jpg', 'jpeg', 'pdf']
        }

        const photo = request.file('photo', validateFile)

        let photoUri = null
        if(photo){
            const randURL = moment().format('YYYYMMDDHHmmss')
            const aliasName = `BANNER-${randURL}.${photo.extname}`
            photoUri = 'pages/images/main-slider/'+aliasName
            await photo.move(Helpers.publicPath(`blog`), {
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

        const data = new Main()
        photoUri = photoUri || data.photo
        data.fill({
            tipe: 'slider-banner',
            title: req.title,
            subtitle: req.subtitle,
            photo: photoUri,
            urut: req.urut
        })

        console.log('xxxx');
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

    async show ( { auth, params, view } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        const data = (await Main.query().where('id', params.id).last()).toJSON()

        return view.render("dashboard.home-banner.show", {data: data})
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
            const aliasName = `BANNER-${randURL}.${photo.extname}`
            photoUri = 'pages/images/main-slider/'+aliasName
            await photo.move(Helpers.publicPath(`pages/images/main-slider`), {
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
        photoUri = photoUri || data.photo
        data.merge({
            title: req.title,
            subtitle: req.subtitle,
            photo: photoUri,
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

module.exports = HomeBannerController

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