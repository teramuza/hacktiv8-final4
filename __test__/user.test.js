const request = require('supertest')
const app = require('../app')
const { verifyToken } = require("../helpers/jwt");
var jwtToken = {};

describe("POST /users/register", () => {
    it("Registrasi sukses", (done) => {
        const dataUser = {
            email: "lestari@gmail.com",
            full_name: "Lestari",
            username: "lestari",
            password: "123",
            profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
            age: 21,
            phone_number: "00000000"
        }
        request(app)
            .post('/users/register')
            .send(dataUser)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(201)
                expect(res.body.user).toHaveProperty("email")
                expect(res.body.user).toHaveProperty("full_name")
                expect(res.body.user).toHaveProperty("username")
                expect(res.body.user).toHaveProperty("profile_image_url")
                expect(res.body.user).toHaveProperty("age")
                expect(res.body.user).toHaveProperty("phone_number")
                expect(res.body.user.email).toBe(dataUser.email)
                expect(res.body.user.full_name).toBe(dataUser.full_name)
                expect(res.body.user.username).toBe(dataUser.username)
                expect(res.body.user.profile_image_url).toBe(dataUser.profile_image_url)
                expect(res.body.user.age).toBe(dataUser.age)

                done()
            })
    });

    it("Username kosong", (done) => {
        const dataUser = {
            email: "lestari@gmail.com",
            full_name: "Lestari",
            username: "",
            password: "123",
            profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
            age: 21,
            phone_number: "00000000"
        }
        request(app)
            .post('/users/register')
            .send(dataUser)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500)
                expect(res.body).toHaveProperty('message')
                done()
            })
    });

    it("Email kosong", (done) => {
        const dataUser = {
            email: "",
            full_name: "Lestari",
            username: "lestari",
            password: "123",
            profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
            age: 21,
            phone_number: "00000000"
        }
        request(app)
            .post('/users/register')
            .send(dataUser)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500)
                expect(res.body).toHaveProperty('message')
                done()
            })
    });

    it("Nama Lengkap kosong", (done) => {
        const dataUser = {
            email: "lestari@gmail.com",
            full_name: "",
            username: "lestari",
            password: "123",
            profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
            age: 21,
            phone_number: "00000000"
        }
        request(app)
            .post('/users/register')
            .send(dataUser)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500)
                expect(res.body).toHaveProperty('message')
                done()
            })
    });
})

describe("POST /users/login", () => {
    it("Login sukses", (done) => {
        const dataLogin = {
            email: "lestari@gmail.com", password: "123",
        }
        request(app)
            .post('/users/login')
            .send(dataLogin)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(res.body).toHaveProperty('token')
                expect(res.body.token).not.toBeNull()
                expect(res.body.token).toBeDefined()
                expect(res.body.token).toBeTruthy()
                expect(res.body.token.length).toBeGreaterThan(0)

                jwtToken = { token: res.body.token }
                done()
                return jwtToken
            })
    });

    it("Login gagal, password salah", (done) => {
        const dataLogin = {
            email: "lestari@gmail.com", password: "1234",
        }
        request(app)
            .post('/users/login')
            .send(dataLogin)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(401)

                done()
            })
    });

    it("Login gagal, password tidak dikirim", (done) => {
        const dataLogin = {
            email: "lestari@gmail.com", password: "",
        }
        request(app)
            .post('/users/login')
            .send(dataLogin)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(401)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid Credentials')
                done()
            })
    });

    it("Login gagal, email tidak dikirim", (done) => {
        const dataLogin = {
            email: "", password: "123",
        }
        request(app)
            .post('/users/login')
            .send(dataLogin)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(401)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid Credentials')
                done()
            })
    });

})

describe("PUT /users/:id", () => {
    it("Update user sukses", (done) => {
        const dataUser = {
            email: "lestari@gmail.com",
            full_name: "Lestari",
            username: "lestari",
            password: "123",
            profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
            age: 21,
            phone_number: "00000000"
        }
        const userId = verifyToken(jwtToken.token).id
        request(app)
            .put(`/users/${userId}`)
            .send(dataUser)
            .set('Accept', 'application/json')
            .set('token', jwtToken.token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(res.body.user).toHaveProperty("email")
                expect(res.body.user).toHaveProperty("full_name")
                expect(res.body.user).toHaveProperty("username")
                expect(res.body.user).toHaveProperty("profile_image_url")
                expect(res.body.user).toHaveProperty("age")
                expect(res.body.user).toHaveProperty("phone_number")
                expect(res.body.user.email).toBe(dataUser.email)
                expect(res.body.user.full_name).toBe(dataUser.full_name)
                expect(res.body.user.username).toBe(dataUser.username)
                expect(res.body.user.profile_image_url).toBe(dataUser.profile_image_url)
                expect(res.body.user.age).toBe(dataUser.age)

                done()
            })
    });

    it("Update user gagal, token tidak dikirim", (done) => {
        const dataUser = {
            email: "lestari@gmail.com",
            full_name: "Lestari",
            username: "lestari",
            password: "123",
            profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
            age: 21,
            phone_number: "00000000"
        }
        const userId = verifyToken(jwtToken.token).id
        request(app)
            .put(`/users/${userId}`)
            .send(dataUser)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(401)
                expect(res.body.message).toEqual('jwt must be provided')

                done()
            })
    });

    it("Update user gagal, username kosong", (done) => {
        const dataUser = {
            email: "lestari@gmail.com",
            full_name: "Lestari",
            username: "",
            password: "123",
            profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
            age: 21,
            phone_number: "00000000"
        }
        const userId = verifyToken(jwtToken.token).id
        request(app)
            .put(`/users/${userId}`)
            .send(dataUser)
            .set('Accept', 'application/json')
            .set('token', jwtToken.token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500)
                // console.log(res.body.message)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Username is required')

                done()
            })
    });

    it("Update user gagal, email kosong", (done) => {
        const dataUser = {
            email: "",
            full_name: "Lestari",
            username: "lestari",
            password: "123",
            profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
            age: 21,
            phone_number: "00000000"
        }
        const userId = verifyToken(jwtToken.token).id
        request(app)
            .put(`/users/${userId}`)
            .send(dataUser)
            .set('Accept', 'application/json')
            .set('token', jwtToken.token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500)
                // console.log(res.body.message)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Email is required')

                done()
            })
    });
})

describe("DELETE /users/:id", () => {
    it("Delete user sukses", (done) => {
        const userId = verifyToken(jwtToken.token).id
        request(app)
            .delete(`/users/${userId}`)
            .set('Accept', 'application/json')
            .set('token', jwtToken.token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual("Your account has been successfully deleted")
                expect(typeof res).toBe("object")
                expect(res.body.message).toContain("deleted")
                done()
            })
    });

    it("Detele user gagal, token tidak dikirim", (done) => {
        const userId = verifyToken(jwtToken.token).id
        request(app)
            .delete(`/users/${userId}`)
            .set('Accept', 'application/json')
            // .set('token', jwtToken.token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(401)
                expect(res.body.message).toEqual('jwt must be provided')
                expect(res.body).toHaveProperty('message')
                done()
            })
    });
})


// afterAll((done) => {
//     sequelize.queryInterface.bulkDelete('Users',{})
//         .then(() => {
//             return done()
//         }).catch(err=> {
//             done(err)
//     })
// })