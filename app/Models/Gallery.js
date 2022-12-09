'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gallery extends Model {
    static get table(){
        return 'cms_gallery'
    }
}

module.exports = Gallery
