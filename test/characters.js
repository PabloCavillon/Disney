const { request } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { generarJWT } = require('../src/helpers/jwt');
const { response } = require('../src/index');
const server = require('../src/index');

chai.should();

chai.use(chaiHttp)

describe('Test /characters', async () => {
    const token = await generarJWT(0, 'prueba');
    let id;

    // test registrar personaje
    describe ('POST /character', () => {
        it('Debe registrar y devolver los datos del personaje',
            done => {
                const data = {
                    "nombre":"prueba",
                    "edad":"999",
                    "peso":"999",
                    "historia":"Este es un personaje de prueba",
                    "imagen":"https://fakeimg.pl/300/"
                }
                chai.request(server)
                .post('/characters')
                .set('x-token', token)
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(200);
                    res.body.personaje.should.be.a('object');
                    res.body.personaje.should.have.property('nombre').eq('prueba');
                    res.body.personaje.should.have.property('edad').eq('999');
                    res.body.personaje.should.have.property('peso').eq('999');
                    res.body.personaje.should.have.property('historia').eq('Este es un personaje de prueba');
                    res.body.personaje.should.have.property('imagen').eq('https://fakeimg.pl/300/');
                    id = res.body.personaje.id;
                    done();
                });
            }
        );
        it('Debe informar que le faltan parametros obligatorios',
            done => {
                const data = {}
                chai.request(server)
                .post('/characters')
                .set('x-token', token)
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(400);
                    res.body.nombre.should.have.property('msg').eq('El nombre del personaje es obligatorio');
                    res.body.edad.should.have.property('msg').eq('La edad del personaje es obligatoria y debe ser mayor a \"0\"');
                    res.body.peso.should.have.property('msg').eq('El peso del personaje es obligatorio y debe ser mayor a \"0\"');
                    res.body.historia.should.have.property('msg').eq('Debe ingresar la historia del personaje');
                    res.body.imagen.should.have.property('msg').eq('Debe ingresar la url de la imagen');
                    done();
                });
            }
        );
        it('Debe informar que los parametros fueron ingresados con mal formato o fuera de rango',
            done => {
                const data = {
                    "nombre":"prueba",
                    "edad":"-1",
                    "peso":"-1",
                    "historia":"Este es un personaje de prueba",
                    "imagen":"esto no es una url"
                }
                chai.request(server)
                .post('/characters')
                .set('x-token', token)
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(400);
                    res.body.edad.should.have.property('msg').eq('La edad del personaje es obligatoria y debe ser mayor a \"0\"');
                    res.body.peso.should.have.property('msg').eq('El peso del personaje es obligatorio y debe ser mayor a \"0\"');
                    res.body.imagen.should.have.property('msg').eq('Debe ingresar la url de la imagen');
                    done();
                });
            }
        );
        it('Debe informar que falta el token o es invalido', 
            done => {
                data = {}
                request(server)
                .post('/characters')
                .set('x-token', "a")
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(401);
                    res.body.should.have.property('msg').eq('Token no valido');
                    done();
                })
            }
        );
    })
    
    // test obtener personajes
    describe('GET /character', () => {
        it('Debe devolver todos los personajes registrados', 
            done => {
                request(server)
                .get('/characters')
                .set('x-token', token)
                .end((err, res = response) => {
                    res.should.have.status(200);
                    res.body.personajes.should.be.a('array');
                    done();
                })
            }
        );
        it('Debe informar que el token falta o no es valido', 
            done => {
                request(server)
                .get('/characters')
                .set('x-token', "")
                .end((err, res = response) => {
                    res.should.have.status(401);
                    res.body.should.have.property('msg').eq('Token no valido');
                    done();
                })
            }
        );
    });

    // test obtener personaje por id
    describe('GET /characters/:id', () => {
        it('Debe devolver el personaje correspndiente al id', 
            done => {
                request(server)
                .get('/characters/')
                .set('x-token', token)
                .end((err, res = response) => {
                    res.should.have.status(200);
                    res.body.personajes.should.be.a('array');
                    done();
                })
            }
        );
    })
    // test editar personaje

    // test eliminar personaje
    describe('DELETE /character', () => {
        it('Debe informar que el usuario se elimino correctamente', 
            done => {
                const data = {id}
                request(server)
                .delete('/characters')
                .set('x-token', token)
                .send(data)
                .end((err, res = response) => {
                    res.should.have.status(200);
                    res.body.should.have.property('msg').eq('El personaje se elimino con exito');
                    done();
                })
            }
        )
    })
})