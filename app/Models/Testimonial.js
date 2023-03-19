'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Testimonial extends Model {
    static get table(){
        return 'cms_testimonial'
    }
}

module.exports = Testimonial
