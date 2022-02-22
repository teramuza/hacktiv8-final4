const request = require('supertest')
const app = require('../app')
var token
var idSosmed

beforeAll(async () => {
    const dataUser = {
        email: "teramuza_test@gmail.com",
        full_name: "Tera Test",
        username: "teramuzaTest",
        password: "123",
        profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
        age: 21,
        phone_number: "0898765445"
    }

    await request(app).post('/users/register').send(dataUser).set('Accept', 'application/json')
    const dataLogin = await request(app).post('/users/login').send({
        email: dataUser.email,
        password: dataUser.password
    }).set('Accept', 'application/json')

    token = dataLogin.body.token
})

describe('POST /socialmedias',() => {
    it('success post sosmed', (done) => {
        const dataSosmed = {
            name : 'Tera Sosmed',
            social_media_url : 'https://web.facebook.com/teramuza/',
        }
        request(app)
            .post('/socialmedias')
            .send(dataSosmed)
            .set('Accept', 'application/json')
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(201)
                expect(res.body).toHaveProperty("social_media")
                expect(res.body.social_media).toHaveProperty("name")
                expect(res.body.social_media).toHaveProperty("social_media_url")
                expect(res.body.social_media.name).toBe(dataSosmed.name)
                expect(res.body.social_media.social_media_url).toBe(dataSosmed.social_media_url)
                idSosmed = res.body.social_media.id
                done()
            })
    })

    it('gagal post sosmed', (done) => {
        const dataSosmed = {
            name : 'Tera Sosmed',
        }
        request(app)
            .post('/socialmedias')
            .send(dataSosmed)
            .set('Accept', 'application/json')
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500)
                expect(res.body).toHaveProperty("social_media_url")
                expect(res.body.message).toEqual('Social media url is required')

                done()
            })
    })
})


describe('GET /socialmedias',() => {

    it('success get socialmedias', (done) => {
        request(app)
            .get(`/socialmedias`)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body.social_media[0]).toHaveProperty("name")
                expect(res.body.social_media[0]).toHaveProperty("social_media_url")
                expect(res.body.social_media[0]).toHaveProperty("id")
                expect(res.body.social_media[0]).toHaveProperty("userid")

                done()
            })
    })

    it('gagal get socialmedias, token tidak dikirim', (done) => {
        request(app)
            .get(`/socialmedias`)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(401)
                expect(typeof res).toBe("object")
                expect(res.body).toHaveProperty("name")
                expect(res.body).toHaveProperty("message")
                expect(res.body.name).toEqual("JsonWebTokenError")
                expect(res.body.message).toEqual("jwt must be provided")

                done()
            })
    })
})

describe('PUT /socialmedias',() => {

    it('success update sosmed', (done) => {
        const dataSosmed = {
            name : 'Tera FB',
            social_media_url : 'https://web.facebook.com/teramuza/',
        }
        request(app)
            .put(`/socialmedias/${idSosmed}`)
            .set('token', token)
            .send(dataSosmed)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body).toHaveProperty("social_media")
                expect(res.body.social_media).toHaveProperty("name")
                expect(res.body.social_media).toHaveProperty("social_media_url")
                expect(res.body.social_media.name).toBe(dataSosmed.name)
                expect(res.body.social_media.social_media_url).toBe(dataSosmed.social_media_url)
                done()
            })
    })

    it('gagal update socialmedias, token tidak dikirim', (done) => {
        request(app)
            .put(`/socialmedias/${idSosmed}`)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(401)
                expect(typeof res).toBe("object")
                expect(res.body).toHaveProperty("name")
                expect(res.body).toHaveProperty("message")
                expect(res.body.name).toEqual("JsonWebTokenError")
                expect(res.body.message).toEqual("jwt must be provided")

                done()
            })
    })
})

describe('DELETE /socialmedias',() => {

    it('success delete socialmedias', (done) => {
        console.log('ID SOSMED ', idSosmed)
        request(app)
            .delete(`/socialmedias/${idSosmed}`)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual("Your social media has been successfully deleted")
                expect(res.body.message).toContain("deleted")
                done()
            })
    })

    it('gagal delete socialmedias, token tidak dikirim', (done) => {
        request(app)
            .delete(`/socialmedias/${idSosmed}`)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(401)
                expect(typeof res).toBe("object")
                expect(res.body).toHaveProperty("name")
                expect(res.body).toHaveProperty("message")
                expect(res.body.name).toEqual("JsonWebTokenError")
                expect(res.body.message).toEqual("jwt must be provided")

                done()
            })
    })
})