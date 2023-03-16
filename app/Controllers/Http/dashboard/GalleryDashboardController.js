'use strict'

const Helpers = use('Helpers')
const moment = use("moment")
const Gallery = use("App/Models/Gallery")

class GalleryDashboardController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const gallery = (await Gallery.query().where('aktif', 'Y').fetch()).toJSON()
        
        return view.render('dashboard.gallery.index', {list: gallery})
    }

    async create ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        
        return view.render('dashboard.gallery.create')
    }

    async store ({auth, request}) {
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const galleryPic = request.file('photo', {
            types: ['image'],
            size: '10mb'
        })

        let photoLib = null
        if(galleryPic){
            const randURL = moment().format('YYYYMMDDHHmmss')
            const aliasName = `IMG-${randURL}.${galleryPic.extname}`
            photoLib = 'pages/gallery/'+aliasName
            await galleryPic.move(Helpers.publicPath(`pages/gallery`), {
                name: aliasName,
                overwrite: true,
            })

            if (!galleryPic.moved()) {
                return {
                    success: false,
                    message: 'Failed upload photo image... \n'+galleryPic.error().message
                }
            }
        }else{
            return {
                success: false,
                message: 'Gambar/Photo belum terpilih...'
            }
        }

        const gallery = new Gallery()
        gallery.fill({
            title: req.title || 'gallery',
            narasi: req.narasi || '',
            date: new Date(),
            uri: photoLib,
            user_id: user.id
        })
        try {
            await gallery.save()
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'Gagal upload gambar...'
            }
        }

        return {
            success: true,
            message: 'Success upload gambar...'
        }
    }
}

module.exports = GalleryDashboardController

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
