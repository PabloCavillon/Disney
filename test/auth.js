const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = require('../src/index');

chai.should();

chai.use(chaiHttp);

describe('Test /auth', () => {
    // Test Register
    describe('POST /auth/register', () => {
        it('Debe devolver un Token y los datos del usuario en caso de registrarse correctamente',
            done => {
                const data = {
                    "username": "prueba",
                    "password": "1234",
                    "mail": "prueba@mail.com"
                };
                chai.request(server)
                .post('/auth/register')
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username').eq('prueba');
                    res.body.should.have.property('mail').eq('prueba@mail.com');
                    res.body.should.have.property('token');
                    done();
                })
        });
        it('Debe informar cuando el username ya esta registrado', 
            done => {
                const data = {
                    "username":"pablo",
                    "mail":"control@user.com",
                    "password":"1234"
                };
                chai.request(server)
                .post('/auth/register')
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(400);
                    res.body.should.have.property('msg').eq('El usuario ya ha sido registrado');
                    done();
                })
        });
        it('Debe informar cuando el mail ya esta registrado', 
            done => {
                const data = {
                    "username":"control_mail",
                    "mail":"pabloa.cavillon@gmail.com",
                    "password":"1234"
                };
                chai.request(server)
                .post('/auth/register')
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(400);
                    res.body.should.have.property('msg').eq('El mail ya ha sido registrado');
                    done();
                })
        });
        it('Debe informar cuando el mail no tiene el formato correcto', 
            done => {
                const data = {
                    "username":"cavillon",
                    "mail":"malformato",
                    "password":"1234"
                };
                chai.request(server)
                .post('/auth/register')
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.mail.should.have.property('msg').eq('El mail no fue enviado o no tiene el formato correcto');
                    done();
                })
        });
        it('El username, el mail y la contraseña no deben faltar',
            done => {
                const data = {};
                chai.request(server)
                .post('/auth/register')
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.username.should.have.property('msg').eq('El nombre de usuario es obligatorio');
                    res.body.password.should.have.property('msg').eq('La contraseña es obligatoria');
                    res.body.mail.should.have.property('msg').eq('El mail no fue enviado o no tiene el formato correcto');
                    done();
                })
        });
    });

    // Test Login
    describe('POST /auth/login', () => {
        it ('Debe devolver un Token y los datos del usuario en caso de logearse correctamente',
        done => {
            const data = {
                "username": "prueba",
                "password": "1234",
            };
            chai.request(server)
                .post('/auth/login')
                .send(data)
                .end((err, res = response) => {
                    if (err) {
                        return console.log(err)
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username').eq('prueba');
                    res.body.should.have.property('mail').eq('prueba@mail.com');
                    res.body.should.have.property('token');
                    done();
                })
        });
        it('Debe devolver un error en caso de que el logeo sea erroneo', 
            done => {
                const data = {
                    "username": "pabloa",
                    "password": "12345"
                };
                chai.request(server)
                    .post('/auth/login')
                    .send(data)
                    .end((err, res = response) => {
                        if (err) {
                            return console.log(err)
                        }
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eq('El usuario o la contraseña es incorrecto');
                        done();
                    })
        });
        it('El username y la contraseña no deben faltar',
            done => {
                const data = {};
                chai.request(server)
                .post('/auth/register')
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.username.should.have.property('msg').eq('El nombre de usuario es obligatorio');
                    res.body.password.should.have.property('msg').eq('La contraseña es obligatoria');
                    done();
                })
        });
    });

    // Test unsubscribe
    describe('DELETE /auth', () => {
        it('Debe informar que se elimino el usuario', 
            done => {
                const data = {
                    "username": "prueba",
                };
                chai.request(server)
                .delete('/auth')
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eq('Usuario eliminado con exito');
                    done();
                });
            }
        )
    });
});