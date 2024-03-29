'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('template.main')

Route.get('/login', 'AuthDashboardController.index').as('login')
Route.post('/login', 'AuthDashboardController.signin').as('signin')
Route.get('/signout', 'AuthDashboardController.signout').as('signout')

Route.group(() => {
    Route.get('/', 'HomeController.index').as('home-guest')
    Route.get('/about', 'HomeController.about').as('about-guest')
    Route.get('/testimonial', 'HomeController.testimonial').as('testimonial-guest')
    Route.get('/service', 'HomeController.service').as('service-guest')
    Route.get('/service-detail', 'HomeController.serviceDetail').as('serviceDetail-guest')
    Route.get('/blog', 'HomeController.blog').as('blog-guest')
    Route.get('/blog-detail/:id', 'HomeController.blogDetail').as('blogDetail-guest')
    Route.get('/news-detail/:id', 'HomeController.newsDetail').as('newsDetail-guest')
    Route.get('/contact-us', 'HomeController.contact').as('contact-guest')
    Route.get('/join-us', 'HomeController.joinUs').as('career-guest')
}).namespace('public')

Route.group(() => {
    Route.get('/', 'HomeDashboardController.index').as('dashboard')

    Route.get('/gallery', 'GalleryDashboardController.index').as('gallery')
    Route.get('/gallery-create', 'GalleryDashboardController.create').as('gallery-create')
    Route.post('/gallery-create', 'GalleryDashboardController.store').as('gallery-store')

    Route.get('/blog', 'BlogDashboardController.index').as('blog')
    Route.post('/blog', 'BlogDashboardController.store').as('blog-store')
    Route.get('/blog/create', 'BlogDashboardController.create').as('blog-create')
    Route.get('/blog/:id/show', 'BlogDashboardController.show').as('blog-show')
    Route.post('/blog/:id/update', 'BlogDashboardController.update').as('blog-update')
    Route.post('/blog/:id/destroy', 'BlogDashboardController.destroy').as('blog-destroy')

    Route.get('/news', 'NewsDashboardController.index').as('news')
    Route.post('/news', 'NewsDashboardController.store').as('news-store')
    Route.get('/news/create', 'NewsDashboardController.create').as('news-create')
    Route.get('/news/:id/show', 'NewsDashboardController.show').as('news-show')
    Route.post('/news/:id/update', 'NewsDashboardController.update').as('news-update')
    Route.post('/news/:id/destroy', 'NewsDashboardController.destroy').as('news-destroy')

    Route.get('/testimonial', 'TestimonialController.index').as('testimonial')
    Route.post('/testimonial', 'TestimonialController.store').as('testimonial-store')
    Route.get('/testimonial/create', 'TestimonialController.create').as('testimonial-create')
    Route.get('/testimonial/:id/show', 'TestimonialController.show').as('testimonial-show')
    Route.post('/testimonial/:id/update', 'TestimonialController.update').as('testimonial-update')
    Route.post('/testimonial/:id/update-banner', 'TestimonialController.updateBanner').as('testimonial-updateBanner')
    Route.post('/testimonial/:id/destroy', 'TestimonialController.destroy').as('testimonial-destroy')

    Route.get('/hiring', 'HiringDashboardController.index').as('hiring')
    Route.post('/hiring', 'HiringDashboardController.store').as('content-hiring-post')
    
    Route.get('/home/banner', 'HomeBannerController.index').as('home-banner')
    Route.post('/home/banner', 'HomeBannerController.store').as('home-banner.store')
    Route.get('/home/banner/create', 'HomeBannerController.create').as('home-banner.create')
    Route.get('/home/banner/:id/show', 'HomeBannerController.show').as('home-banner.show')
    Route.post('/home/banner/:id/update', 'HomeBannerController.update').as('home-banner.update')
    Route.post('/home/banner/:id/destroy', 'HomeBannerController.destroy').as('home-banner.destroy')

    Route.get('/home/service-icon', 'HomeServiceIconController.index').as('home-service-icon')
    Route.post('/home/service-icon', 'HomeServiceIconController.store').as('home-service-icon.store')
    Route.get('/home/service-icon/create', 'HomeServiceIconController.create').as('home-service-icon.create')
    Route.get('/home/service-icon/:id/show', 'HomeServiceIconController.show').as('home-service-icon.show')
    Route.post('/home/service-icon/:id/update', 'HomeServiceIconController.update').as('home-service-icon.update')
    Route.post('/home/service-icon/:id/destroy', 'HomeServiceIconController.destroy').as('home-service-icon.destroy')

    Route.get('/home/service-text', 'HomeServiceTextController.index').as('home-service-text')
    Route.post('/home/service-text', 'HomeServiceTextController.store').as('home-service-text.store')
    Route.get('/home/service-text/create', 'HomeServiceTextController.create').as('home-service-text.create')
    Route.get('/home/service-text/:id/show', 'HomeServiceTextController.show').as('home-service-text.show')
    Route.post('/home/service-text/:id/update', 'HomeServiceTextController.update').as('home-service-text.update')
    Route.post('/home/service-text/:id/destroy', 'HomeServiceTextController.destroy').as('home-service-text.destroy')

    Route.get('/home/tentang-kami', 'HomeTentangKamiController.index').as('home-tentang-kami')
    Route.post('/home/tentang-kami/:id/update', 'HomeTentangKamiController.update').as('home-tentang-kami.update')

    Route.get('/home/team-kami', 'HomeTeamKamiController.index').as('home-team-kami')
    Route.post('/home/team-kami', 'HomeTeamKamiController.store').as('home-team-kami.store')
    Route.get('/home/team-kami/create', 'HomeTeamKamiController.create').as('home-team-kami.create')
    Route.get('/home/team-kami/:id/show', 'HomeTeamKamiController.show').as('home-team-kami.show')
    Route.post('/home/team-kami/:id/update', 'HomeTeamKamiController.update').as('home-team-kami.update')
    Route.post('/home/team-kami/:id/update-text', 'HomeTeamKamiController.updateText').as('home-team-kami.updateText')
    Route.post('/home/team-kami/:id/destroy', 'HomeTeamKamiController.destroy').as('home-team-kami.destroy')

    // ABOUT US
    Route.get('/about-us/banner', 'AboutUsBannerController.indexBanner').as('about-us-banner')
    Route.post('/about-us/banner/:id/update', 'AboutUsBannerController.updateBanner').as('about-us-banner.update')
    Route.get('/about-us/teks-narasi', 'AboutUsBannerController.indexNarasi').as('about-us-teks-narasi')
    Route.post('/about-us/teks-narasi', 'AboutUsBannerController.updateNarasi').as('about-us-teks-narasi.store')
    Route.get('/about-us/tahun-prestasi', 'AboutUsBannerController.indexPrestasi').as('about-us-tahun-prestasi')
    Route.get('/about-us/tahun-prestasi/:id/show', 'AboutUsBannerController.showPrestasi').as('about-us-tahun-prestasi')
    Route.post('/about-us/tahun-prestasi/:id/update', 'AboutUsBannerController.updatePrestasi').as('about-us-tahun-prestasi.update')
    Route.get('/about-us/fun-fact', 'AboutUsBannerController.indexFact').as('home-team-kami')
    Route.get('/about-us/fun-fact/:id/show', 'AboutUsBannerController.showFact').as('home-team-kami.show')
    Route.post('/about-us/fun-fact/:id/update', 'AboutUsBannerController.updateFact').as('home-team-kami.update')
    Route.post('/about-us/fun-fact/:id/update-text', 'AboutUsBannerController.updateFactText').as('home-team-kami.updateText')

}).prefix('dashboard').namespace('dashboard')//.middleware(['gp'])