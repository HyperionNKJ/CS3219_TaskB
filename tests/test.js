Module = require('../moduleModel');
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Modules", () => {
  beforeEach((done) => {
      Module.remove({}, (err) => {
         done();
      });
  });
  describe('GET /api/modules', () => {
      it('it should GET no module because database is empty', (done) => {
            chai.request(app)
            .get('/api/modules')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql('success');
                  res.body.should.have.property('message').eql('Modules retrieved successfully');
                  res.body.data.length.should.be.eql(0);
              done();
            });
      });
      it('it should GET all modules', (done) => {
        let modOne = new Module({name: 'Introduction to Computer Networks', code: 'CS2105', mc: 4, grade: 'A'})
        let modTwo = new Module({name: 'Introduction to Operating Systems', code: 'CS2106', mc: 4, grade: 'A-'})
        modOne.save(() => {
          modTwo.save(() => {
            chai.request(app)
            .get('/api/modules')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql('success');
                  res.body.should.have.property('message').eql('Modules retrieved successfully');
                  res.body.data.length.should.be.eql(2);
                  res.body.data[0].code.should.be.eql('CS2105')
                  res.body.data[1].code.should.be.eql('CS2106')
                  done();
            });
          });
        });
      });
    });
  describe('POST /api/modules', () => {
    it('it should POST a module', (done) => {
      let mod = new Module({name: 'Calculus for Computing', code: 'MA1521', mc: 4, grade: 'A+'})
      chai.request(app)
      .post('/api/modules')
      .send(mod)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('New module created!');
        res.body.data.should.have.property('_id');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('grade');
        res.body.data.should.have.property('mc');
        res.body.data.code.should.be.eql('MA1521');
        done();
      });
    });
  });
  describe('GET /api/modules/:id', () => {
    it('it should GET the book with the given id', (done) => {
      let mod = new Module({name: 'Introduction to Computer Networks', code: 'CS2105', mc: 4, grade: 'A'})
      mod.save(() => {
        chai.request(app)
        .get('/api/modules/' + mod.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('Module details loaded!');
          res.body.data.name.should.be.eql('Introduction to Computer Networks')
          res.body.data.code.should.be.eql('CS2105')
          done();
        });
      })
    })
  });
  describe('PUT /api/modules/:id', () => {
    it('it should UPDATE the book with the given id', (done) => {
      let mod = new Module({name: 'Software Engineering Project', code: 'CS3203', mc: 8, grade: 'B+'})
      mod.save(() => {
        chai.request(app)
        .put('/api/modules/' + mod.id)
        .send({name: 'Software Engineering Project', code: 'CS3203', mc: 8, grade: 'A+'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('Module Info updated');
          res.body.data.should.have.property('grade').eql('A+');
          done();
        });
      })
    })
  });
  describe('DELETE /api/modules/:id', () => {
    it('it should DELETE the book with the given id', (done) => {
      let mod = new Module({name: 'Calculus for Computing', code: 'MA1521', mc: 4, grade: 'A+'})
      mod.save(() => {
        chai.request(app)
        .delete('/api/modules/' + mod.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('Module deleted!');
          res.body.data.should.have.property('n').eql(1);
          res.body.data.should.have.property('ok').eql(1);
          res.body.data.should.have.property('deletedCount').eql(1);
          done();
        });
      })
    })
  })
});
