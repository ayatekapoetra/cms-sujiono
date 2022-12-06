'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Visitor extends Model {
    static get table(){
        return 'cms_visitors'
    }
}

module.exports = Visitor
