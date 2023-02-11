'use strict'

const Visitor = use("App/Models/Visitor")
const Blog = use("App/Models/Blog")
const ContentHiring = use("App/Models/ContentHiring")
const moment = use('moment')

class HomeController {
    async index ({request, view}) {
        const ip = request.ip()
        const userAgent = request.header('user-agent')

        const visitor = await Visitor.query().where( w => {
            w.where('ip', ip)
            w.where('date', moment().format('YYYY-MM-DD'))
            w.where('userAgent', userAgent)
        }).last()

        if(!visitor){
            const newVisitor = new Visitor()
            newVisitor.fill({ip: ip, userAgent: userAgent, date: new Date()})
            await newVisitor.save()
        }

        return view.render('pages.index')
    }

    async about ({view}) {
        return view.render('pages.about')
    }

    async testimonial ({view}) {
        return view.render('pages.testimonial')
    }

    async service ({view}) {
        return view.render('pages.service')
    }

    async serviceDetail ({view}) {
        return view.render('pages.service-detail')
    }

    async blog ({view}) {
        let blog = (await Blog.query().where('aktif', 'Y').fetch()).toJSON()
        blog = blog.map(v => {
            return {
                ...v,
                date: moment(v.date).format('DD MMMM YYYY')
            }
        })
        return view.render('pages.blog', {list: blog})
    }

    async blogDetail ({view, params}) {
        let blog = (await Blog.query().where('id', params.id).last()).toJSON()
        blog = {...blog, date: moment(blog.date).format('DD MMMM YYYY')}
        return view.render('pages.blog-detail', {data: blog})
    }

    async contact ({view}) {
        return view.render('pages.contact')
    }

    async joinUs ({view}) {
        const contentHiring = (await ContentHiring.query().where('aktif', 'Y').last()).toJSON()
        return view.render('pages.join-us', {data: contentHiring})
    }
}

module.exports = HomeController
