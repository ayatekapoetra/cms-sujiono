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
}).namespace('public')

Route.group(() => {
    Route.get('/', 'HomeDashboardController.index').as('dashboard')
}).prefix('dashboard').namespace('dashboard').middleware(['gp'])