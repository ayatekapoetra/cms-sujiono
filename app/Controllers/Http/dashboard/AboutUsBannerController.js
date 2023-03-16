'use strict'

const Helpers = use('Helpers')
const moment = use('moment')
const Main = use("App/Models/HomeMain")
const Prestasi = use("App/Models/Prestasi")

class AboutUsBannerController {
    async indexBanner ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const data = (await Main.query().where( w => {
            w.where('tipe', 'banner-about-us')
            w.where('aktif', 'Y')
        }).last()).toJSON()

        return view.render("dashboard.about-us-banner.index", {data: data})
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
            const aliasName = `BANNER-ABOUTUS-${randURL}.${photo.extname}`
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

        const data = await Main.query().where('id', params.id).last()
        photoUri = photoUri || data.photo
        data.merge({ photo: photoUri })

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

    async indexNarasi ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const data = (await Main.query().where( w => {
            w.where('tipe', 'main-about-us')
            w.where('aktif', 'Y')
        }).last()).toJSON()

        return view.render("dashboard.home-tentang-kami.index", {data: data})
    }

    async updateNarasi ( {auth, params, request, view} ) {
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
            const aliasName = `ABOUTUS-${randURL}.${photo.extname}`
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
        data.merge({
            title: req.title,
            subtitle: req.subtitle,
            narasi: req.narasi,
            photo: photoUri || data.photo,
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

    async indexPrestasi ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const prestasi = (await Prestasi.query().where('aktif', 'Y').limit(4).fetch()).toJSON()

        return view.render("dashboard.about-us-prestasi.index", {list: prestasi})
    }

    async showPrestasi ({auth, params, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const prestasi = (await Prestasi.query().where('id', params.id).last()).toJSON()


        return view.render("dashboard.about-us-prestasi.show", {data: prestasi})
    }

    async updatePrestasi ( {auth, params, request, view} ){
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.route('/login')
        }

        console.log(req);
        const prestasi = await Prestasi.query().where('id', params.id).last()
        prestasi.merge({
            tahun: req.tahun,
            title: req.title,
            narasi: req.narasi
        })

        try {
            await prestasi.save()
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

    async indexFact ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const mainTitle = (await Main.query().where(w => {
            w.where('tipe', 'fakta-menarik-teks')
        }).last()).toJSON()

        const mainList = (await Main.query().where(w => {
            w.where('tipe', 'fakta-menarik')
        }).limit(4).orderBy('urut').fetch()).toJSON()

        return view.render("dashboard.about-us-fact.index", {list: mainList, title: mainTitle})
        
    }

    async showFact ({auth, params, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const data = (await Main.query().where(w => {
            w.where('id', params.id)
        }).last()).toJSON()

        return view.render("dashboard.about-us-fact.show", {data: data})

    }

    async updateFact ({auth, params, request, view}) {
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const funFact = await Main.query().where(w => {
            w.where('id', params.id)
        }).last()

        funFact.merge({
            title: req.title,
            subtitle: req.subtitle,
            urut: req.urut
        })
        try {
            await funFact.save()
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

    async updateFactText ({auth, params, request, view}) {
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const funFact = await Main.query().where(w => {
            w.where('id', params.id)
        }).last()

        funFact.merge({
            title: req.title,
            subtitle: req.subtitle,
            narasi: req.narasi || ''
        })
        
        try {
            await funFact.save()
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

module.exports = AboutUsBannerController

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