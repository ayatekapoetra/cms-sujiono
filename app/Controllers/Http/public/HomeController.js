'use strict'

const Visitor = use("App/Models/Visitor")
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
        return view.render('pages.blog')
    }

    async blogDetail ({view, params}) {
        return view.render('pages.blog-detail')
    }

    async contact ({view}) {
        return view.render('pages.contact')
    }
}

module.exports = HomeController
