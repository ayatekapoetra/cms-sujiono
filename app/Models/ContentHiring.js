'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ContentHiring extends Model {
    static get table(){
        return 'content_hiring'
    }
}

module.exports = ContentHiring
