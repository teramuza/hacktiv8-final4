const request = require('supertest')
const app = require('../app')
var token
var idComments

beforeAll(async () => {
    const dataUser = {
        email: "teramuza_test2@gmail.com",
        full_name: "Tera Test",
        username: "teramuzaTest2",
        password: "1233",
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

describe('POST /comments',() => {
    it('success insert comments', (done) => {
        const dataComments = {
            comment : 'Waw keren',
            photoid : 1,
        }
        request(app)
            .post('/comments')
            .send(dataComments)
            .set('Accept', 'application/json')
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(201)
                expect(res.body).toHaveProperty("comment")
                expect(res.body.comment).toHaveProperty("id")
                expect(res.body.comment).toHaveProperty("comment")
                expect(res.body.comment).toHaveProperty("photoid")
                expect(res.body.comment.comment).toBe(dataComments.comment)
                expect(res.body.comment.photoid).toBe(dataComments.photoid)
                idComments = res.body.comment.id
                done()
            })
    })

    it('gagal insert comment', (done) => {
        const dataComments = {
            photoid : 1,
        }
        request(app)
            .post('/comments')
            .send(dataComments)
            .set('Accept', 'application/json')
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500)
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual('Comment is required')

                done()
            })
    })
})


describe('GET /comments',() => {
    it('success get comments', (done) => {
        request(app)
            .get(`/comments`)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body.comments[0]).toHaveProperty("comment")
                expect(res.body.comments[0]).toHaveProperty("photoid")
                expect(res.body.comments[0]).toHaveProperty("id")

                done()
            })
    })

    it('gagal get comments, token tidak dikirim', (done) => {
        request(app)
            .get(`/comments`)
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

describe('PUT /comments',() => {
    it('success update comments', (done) => {
        const dataComments = {
            comment : 'Waw bagus',
            photoid : 1,
        }
        request(app)
            .put(`/comments/${idComments}`)
            .set('token', token)
            .send(dataComments)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body.comment).toHaveProperty("comment")
                expect(res.body.comment).toHaveProperty("photoid")
                expect(res.body.comment.comment).toEqual(dataComments.comment)
                expect(res.body.comment.photoid).toEqual(dataComments.photoid)
                done()
            })
    })

    it('gagal update comments, token tidak dikirim', (done) => {
        request(app)
            .put(`/comments/${idComments}`)
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

describe('DELETE /comments',() => {
    it('success delete comments', (done) => {
        console.log('ID comments ', idComments)
        request(app)
            .delete(`/comments/${idComments}`)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(200)
                expect(typeof res).toBe("object")
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual("Your comment has been successfully deleted")
                expect(res.body.message).toContain("deleted")
                done()
            })
    })

    it('gagal delete comments, token tidak dikirim', (done) => {
        request(app)
            .delete(`/comments/${idComments}`)
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