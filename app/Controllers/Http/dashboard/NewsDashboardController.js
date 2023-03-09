'use strict'

const moment = use("moment")
const Helpers = use('Helpers')
const News = use("App/Models/News")

class NewsDashboardController {
    async index ({auth, view, response}) {
        const user = await userValidate(auth)
        if(!user){
            return response.route('/login')
        }
        
        let news = (await News.query().where('aktif', 'Y').fetch()).toJSON()
        console.log('<>', news);
        news = news.map(v => {
            return {
                ...v,
                date: moment(v.date).format('DD MMMM YYYY')
            }
        })
        return view.render("dashboard.news.index", {list: news})
    }

    async create ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        console.log(user);

        return view.render("dashboard.news.create")
    }

    async store ( { auth, request, response } ) {
        const req = request.all()
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
            const aliasName = `NEWS-${randURL}.${photo.extname}`
            photoUri = 'news/'+aliasName
            await photo.move(Helpers.publicPath(`news`), {
                name: aliasName,
                overwrite: true,
            })

            if (!photo.moved()) {
                return {
                    success: false,
                    message: 'Failed upload photo image...'
                }
            }
        }

        const news = new News()
        news.fill({
            title: req.title,
            narasi: req.narasi,
            date: new Date(),
            author: 'admin',
            images: photoUri
        })

        try {
            await news.save()
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

    async show ( { auth, params, view } ) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const news = (await News.query().where('id', params.id).last()).toJSON()

        return view.render("dashboard.news.show", {data: news})
    }

    async update ( { auth, params, request } ) {
        let data = {}
        const req = request.all()
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        data = {
            ...data, 
            title: req.title,
            narasi: req.narasi,
            date: new Date(),
            author: 'admin',
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
            const aliasName = `NEWS-${randURL}.${photo.extname}`
            photoUri = 'blog/'+aliasName
            await photo.move(Helpers.publicPath(`news`), {
                name: aliasName,
                overwrite: true,
            })

            if (!photo.moved()) {
                return {
                    success: false,
                    message: 'Failed upload photo image...'
                }
            }

            data = {...data, images: photoUri}
        }



        const news = await News.query().where('id', params.id).last()
        console.log("new", news);
        news.merge(data)

        try {
            await news.save()
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
        console.log('PARAMS', params);
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }

        const news = await News.query().where('id', params.id).last()
        news.merge({aktif: 'N'})
        try {
            await news.save()
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

module.exports = NewsDashboardController

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
