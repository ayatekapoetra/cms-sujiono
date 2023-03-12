'use strict'

const Helpers = use('Helpers')
const moment = use('moment')
const Main = use("App/Models/HomeMain")

class HomeTentangKamiController {
    async index ({auth, view}) {
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
}

module.exports = HomeTentangKamiController

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