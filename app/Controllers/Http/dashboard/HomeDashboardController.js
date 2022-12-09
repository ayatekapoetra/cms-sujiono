'use strict'

const moment = use("moment")
const Visitor = use("App/Models/Visitor")

class HomeDashboardController {
    async index ({auth, view}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render('login')
        }
        
        const currDay = (
                await Visitor.query().where( w => {
                w.where('date', moment().format('YYYY-MM-DD'))
            }).fetch()
        ).toJSON()

        const prevDay = (
                await Visitor.query().where( w => {
                w.where('date', moment().subtract(1, 'days').format('YYYY-MM-DD'))
            }).fetch()
        ).toJSON()

        let startWeek = moment().startOf('week').format('YYYY-MM-DD')
        let endWeek = moment().endOf('week').format('YYYY-MM-DD')

        let startWeekPrev = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD')
        let endWeekPrev = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD')

        const currWeek = (
                await Visitor.query().where( w => {
                w.where('date', '>=', startWeek)
                w.where('date', '<=', endWeek)
            }).fetch()
        ).toJSON()

        const prevWeek = (
                await Visitor.query().where( w => {
                w.where('date', '>=', startWeekPrev)
                w.where('date', '<=', endWeekPrev)
            }).fetch()
        ).toJSON()

        let startMonth = moment().startOf('month').format('YYYY-MM-DD')
        let endMonth = moment().endOf('month').format('YYYY-MM-DD')

        let startMonthPrev = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD')
        let endMonthPrev = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')

        const currMonth = (
                await Visitor.query().where( w => {
                w.where('date', '>=', startMonth)
                w.where('date', '<=', endMonth)
            }).fetch()
        ).toJSON()

        const prevMonth = (
                await Visitor.query().where( w => {
                w.where('date', '>=', startMonthPrev)
                w.where('date', '<=', endMonthPrev)
            }).fetch()
        ).toJSON()

        let startYear = moment().startOf('year').format('YYYY-MM-DD')
        let endYear = moment().endOf('year').format('YYYY-MM-DD')

        let startYearPrev = moment().subtract(1, 'months').startOf('year').format('YYYY-MM-DD')
        let endYearPrev = moment().subtract(1, 'months').endOf('year').format('YYYY-MM-DD')

        const currYear = (
                await Visitor.query().where( w => {
                w.where('date', '>=', startYear)
                w.where('date', '<=', endYear)
            }).fetch()
        ).toJSON()

        const prevYear = (
                await Visitor.query().where( w => {
                w.where('date', '>=', startYearPrev)
                w.where('date', '<=', endYearPrev)
            }).fetch()
        ).toJSON()

        return view.render("index", {
            v_daily: {
                current: currDay.length,
                status: currDay.length > prevDay.length ? 'up':'down'
            },
            v_weekly: {
                current: currWeek.length,
                status: currWeek.length > prevWeek.length ? 'up':'down'
            },
            v_monthly: {
                current: currMonth.length,
                status: currMonth.length > prevMonth.length ? 'up':'down'
            },
            v_yearly: {
                current: currYear.length,
                status: currYear.length > prevYear.length ? 'up':'down'
            }
        })
    }
}

module.exports = HomeDashboardController

async function userValidate(auth){
    let user
    try {
        user = await auth.getUser()
        return user
    } catch (error) {
        console.log(error);
        return null
    }
}
