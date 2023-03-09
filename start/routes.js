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

    Route.get('/hiring', 'HiringDashboardController.index').as('hiring')
    Route.post('/hiring', 'HiringDashboardController.store').as('content-hiring-post')

}).prefix('dashboard').namespace('dashboard').middleware(['gp'])