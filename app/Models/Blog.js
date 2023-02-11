'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Blog extends Model {
    static get table(){
        return 'cms_blogs'
    }
}

module.exports = Blog
