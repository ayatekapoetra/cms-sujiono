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
    Route.get('/blog-detail', 'HomeController.blogDetail').as('blogDetail-guest')
    Route.get('/contact-us', 'HomeController.contact').as('contact-guest')
}).namespace('public')

Route.group(() => {
    Route.get('/', 'HomeDashboardController.index').as('dashboard')

    Route.get('/gallery', 'GalleryDashboardController.index').as('gallery')
    Route.get('/gallery-create', 'GalleryDashboardController.create').as('gallery-create')
    Route.post('/gallery-create', 'GalleryDashboardController.store').as('gallery-store')

    Route.get('/blog', 'BlogDashboardController.index').as('blog')
    Route.get('/blog-create', 'BlogDashboardController.create').as('blog-create')
}).prefix('dashboard').namespace('dashboard').middleware(['gp'])