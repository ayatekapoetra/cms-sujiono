'use strict'

const moment = use("moment")
const Helpers = use('Helpers')
const Blog = use("App/Models/Blog")

class BlogDashboardController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        console.log(user);

        let blog = (await Blog.query().where('aktif', 'Y').fetch()).toJSON()
        blog = blog.map(v => {
            return {
                ...v,
                date: moment(v.date).format('DD MMMM YYYY')
            }
        })
        return view.render("dashboard.blog.index", {list: blog})
    }

    async create ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        console.log(user);

        return view.render("dashboard.blog.create")
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
            const aliasName = `BLOG-${randURL}.${photo.extname}`
            photoUri = 'blog/'+aliasName
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
        }

        const blog = new Blog()
        blog.fill({
            title: req.title,
            narasi: req.narasi,
            date: new Date(),
            author: 'admin',
            images: photoUri
        })

        try {
            await blog.save()
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

        const blog = (await Blog.query().where('id', params.id).last()).toJSON()

        return view.render("dashboard.blog.show", {data: blog})
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
            const aliasName = `BLOG-${randURL}.${photo.extname}`
            photoUri = 'blog/'+aliasName
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

            data = {...data, images: photoUri}
        }



        const blog = await Blog.query().where('id', params.id).last()
        blog.merge(data)

        try {
            await blog.save()
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

        const blog = await Blog.query().where('id', params.id).last()
        blog.merge({aktif: 'N'})
        try {
            await blog.save()
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
