const request = require('supertest')
const app = require('../app')
const { verifyToken } = require("../helpers/jwt");
var token
var idPhoto

beforeAll(async () => {
    const dataUser = {
        email: "lestari_test@gmail.com",
        full_name: "Lestari_test",
        username: "lestari_test",
        password: "123",
        profile_image_url: "https://gadgetren.com/wp-content/uploads/2021/06/Pinterest-Logo-Feature.jpg",
        age: 21,
        phone_number: "00000000"
    }

    await request(app).post('/users/register').send(dataUser).set('Accept', 'application/json')
    const dataLogin = await request(app).post('/users/login').send({
        email: dataUser.email,
        password: dataUser.password
    }).set('Accept', 'application/json')

    token = dataLogin.body.token
})

describe('POST /photos',() => {
    it('success insert foto', (done) => {
        const dataPhoto = {
            poster_image_url : 'https://firebase.google.com/docs/ml-kit/images/face_detection@2x.png',
            title : 'title testing',
            caption : 'this is testing broh'
        }
        request(app)
            .post('/photos')
            .send(dataPhoto)
            .set('Accept', 'application/json')
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(201)
                expect(res.body).toHaveProperty("poster_image_url")
                expect(res.body).toHaveProperty("title")
                expect(res.body).toHaveProperty("caption")
                expect(res.body.poster_image_url).toBe(dataPhoto.poster_image_url)
                expect(res.body.title).toBe(dataPhoto.title)
                expect(res.body.caption).toBe(dataPhoto.caption)
                idPhoto = res.body.id
                done()
            })
    })

    it('gagal insert foto', (done) => {
        const dataPhoto = {
            poster_image_url : '',
            title : 'title testing',
            caption : 'this is testing broh'
        }
        request(app)
            .post('/photos')
            .send(dataPhoto)
            .set('Accept', 'application/json')
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500)
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual('poster image url is required')

                done()
            })
    })
})


describe('GET /photos',() => {

    it('success get foto', (done) => {
        request(app)
            .get(`/photos`)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body.photos[0]).toHaveProperty("title")
                expect(res.body.photos[0]).toHaveProperty("caption")
                expect(res.body.photos[0]).toHaveProperty("poster_image_url")
                expect(res.body.photos[0]).toHaveProperty("userid")

                done()
            })
    })

    it('gagal get foto, token tidak dikirim', (done) => {
        request(app)
            .get(`/photos`)
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


describe('GET /photos',() => {

    it('success get foto', (done) => {
        request(app)
            .get(`/photos`)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body.photos[0]).toHaveProperty("title")
                expect(res.body.photos[0]).toHaveProperty("caption")
                expect(res.body.photos[0]).toHaveProperty("poster_image_url")
                expect(res.body.photos[0]).toHaveProperty("userid")

                done()
            })
    })

    it('gagal get foto, token tidak dikirim', (done) => {
        request(app)
            .get(`/photos`)
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

describe('PUT /photos',() => {

    it('success update foto', (done) => {
        const dataPhoto = {
            poster_image_url : 'https://firebase.google.com/docs/ml-kit/images/face_detection@2x.png',
            title : 'title testing',
            caption : 'this is testing broh'
        }
        request(app)
            .put(`/photos/${idPhoto}`)
            .set('token', token)
            .send(dataPhoto)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body.photo).toHaveProperty("title")
                expect(res.body.photo).toHaveProperty("caption")
                expect(res.body.photo).toHaveProperty("poster_image_url")
                expect(res.body.photo).toHaveProperty("userid")
                expect(res.body.photo.title).toEqual(dataPhoto.title)
                expect(res.body.photo.caption).toEqual(dataPhoto.caption)
                done()
            })
    })

    it('gagal update foto, token tidak dikirim', (done) => {
        request(app)
            .put(`/photos/${idPhoto}`)
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

describe('DELETE /photos',() => {

    it('success delete foto', (done) => {
        console.log('ID PHOTO ', idPhoto)
        request(app)
            .delete(`/photos/${idPhoto}`)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual("Your photo has been successfully deleted")
                expect(res.body.message).toContain("deleted")
                done()
            })
    })

    it('gagal delete foto, token tidak dikirim', (done) => {
        request(app)
            .delete(`/photos/${idPhoto}`)
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