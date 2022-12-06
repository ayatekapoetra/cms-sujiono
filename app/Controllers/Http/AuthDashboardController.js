'use strict'

class AuthDashboardController {
    async index ({auth, view, response}) {
        const user = await userValidate(auth)
        if(!user){
            return view.render("login")
        }else{
            return response.redirect('dashboard')
        }
    }

    async signin ({auth, request, session, response}) {
        const req = request.all()
        session.clear()
        try {
            await auth.attempt(req.username, req.password)
            return response.route('dashboard')
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'failed authorization....'
            }
        }
    }

    async signout ({auth, response}) {
        await auth.logout()
        return response.redirect('login')
    }
}

module.exports = AuthDashboardController

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
