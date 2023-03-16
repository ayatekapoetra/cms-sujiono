'use strict'

const Visitor = use("App/Models/Visitor")
const Blog = use("App/Models/Blog")
const News = use("App/Models/News")
const Main = use("App/Models/HomeMain")
const Gallery = use("App/Models/Gallery")
const Prestasi = use("App/Models/Prestasi")
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

        let news = (await News.query().where('aktif', 'Y').orderBy('date', 'desc').paginate(1, 3)).toJSON()
        news.data = news.data?.map( v => ({
            ...v,
            date: moment(v.date).format('DD MMMM YYYY')
        }))

        const bannerSlider = (await Main.query().where( w => {
            w.where('tipe', 'slider-banner')
            w.where('aktif', 'Y')
        }).limit(4).orderBy('urut').fetch()).toJSON()
        const serviceIco = (await Main.query().where( w => {
            w.where('tipe', 'services-icon')
            w.where('aktif', 'Y')
        }).limit(4).orderBy('urut').fetch()).toJSON()
        const serviceTxt = (await Main.query().where( w => {
            w.where('tipe', 'services-teks')
            w.where('aktif', 'Y')
        }).limit(6).orderBy('urut').fetch()).toJSON()
        const faktaMenarik = (await Main.query().where( w => {
            w.where('tipe', 'fakta-menarik')
            w.where('aktif', 'Y')
        }).limit(4).orderBy('urut').fetch()).toJSON()
        const teamMember = (await Main.query().where( w => {
            w.where('tipe', 'team-member')
            w.where('aktif', 'Y')
        }).limit(4).orderBy('urut').fetch()).toJSON()
        const gallery = (await Gallery.query().where( w => {
            w.where('aktif', 'Y')
        }).limit(6).orderBy('id', 'desc').fetch()).toJSON()
        const aboutUs = (await Main.query().where('tipe', 'main-about-us').last()).toJSON()
        const signature = (await Main.query().where('tipe', 'signature').last()).toJSON()
        const teamText = (await Main.query().where('tipe', 'team-teks').last()).toJSON()


        return view.render('pages.index', {
            news: news.data,
            slider: bannerSlider,
            serviceIco: serviceIco,
            aboutUs: aboutUs,
            signature: signature,
            serviceTxt: serviceTxt,
            faktaMenarik: faktaMenarik,
            team: teamMember,
            teamText: teamText,
            gallery: gallery
        })
    }

    async about ({view}) {
        const banner = (await Main.query().where('tipe', 'banner-about-us').last()).toJSON()
        const aboutUs = (await Main.query().where('tipe', 'main-about-us').last()).toJSON()
        const signature = (await Main.query().where('tipe', 'signature').last()).toJSON()
        const teamText = (await Main.query().where('tipe', 'team-teks').last()).toJSON()
        const faktaTitle = (await Main.query().where(w => {
            w.where('tipe', 'fakta-menarik-teks')
        }).last()).toJSON()
        const faktaMenarik = (await Main.query().where('tipe', 'fakta-menarik').limit(4).orderBy('urut').fetch()).toJSON()
        const prestasi = (await Prestasi.query().where('aktif', 'Y').limit(4).fetch()).toJSON()
        const teamMember = (await Main.query().where( w => {
            w.where('tipe', 'team-member')
            w.where('aktif', 'Y')
        }).limit(8).fetch()).toJSON()
        return view.render('pages.about', {
            banner: banner,
            aboutUs: aboutUs,
            signature: signature,
            faktaMenarik: faktaMenarik,
            faktaTitle: faktaTitle,
            team: teamMember,
            teamText: teamText,
            prestasi: prestasi
        })
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

    async newsDetail ({view, params}) {
        let news = (await News.query().where('id', params.id).last()).toJSON()
        news = {...news, date: moment(news.date).format('DD MMMM YYYY')}
        return view.render('pages.news-detail', {data: news})
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
