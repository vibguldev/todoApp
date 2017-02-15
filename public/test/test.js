var expect = chai.expect
var should = chai.should()

describe('when the read API is called', function () {
  it('should return succes message when succesfully read operation is done', function (done) {
    readFetch()
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        console.log('hello')
        expect(result instanceof Array).to.equals(true)
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
})

describe('when the delete API is called', function () {
  it('should return false message when ID not present', function (done) {
    destroyFetch(600)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        console.log('hello')
        expect(result).to.equals('cannot delete as ID specified does not exist')
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
  it('should return false message when weird ID is passed', function (done) {
    destroyFetch('abc')
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        console.log('hello')
        expect(result).to.equals('weird ID')
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
  it('should return false message when no ID is passed', function (done) {
    destroyFetch()
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        console.log('hello')
        expect(result).to.equals('weird ID')
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
  it('should return success message for correct ID', function (done) {
     destroyFetch(523)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        console.log('hello')
        expect(result).to.equals('successfully deleted')
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
   })
})

describe('when the write API is called', function () {
  it('should return success message when valid insertion message is passed', function (done) {
    writeFetch('hello')
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        console.log('hello')
        expect(typeof Number(result.id)).to.equals('number')
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
  it('should return false message when no description is passed', function () {
    expect(writeFetch()).to.equals('no description passed')
  })
  it('should return false message when empty description is passed', function () {
    expect(writeFetch()).to.equals('no description passed')
  })
})

describe('when the update API is called', function () {
  it('should return success when correct description and status with id are passed', function (done) {
    const data ={status: true, description: "hellooooo"}
    updateFetch(data, 524)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals("succesfully updated at the given ID")
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
  it('should return success when only correct description with IS is passed', function (done) {
    const data ={description: "hellooooo i am here"}
    updateFetch(data, 524)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals("succesfully updated at the given ID")
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
  it('should return success when only correct status with ID is passed', function (done) {
    const data ={status: false}
    updateFetch(data, 524)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals("succesfully updated at the given ID")
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
  it('should return false when nothing is passed for the given ID', function () {
    const data = {}
    expect(updateFetch(data, 524)).to.equals("neither description nor status was passed")
    
  })
  it('should return false message when no ID is passed', function (done) {
    const data ={description: "hellooooo this is me"}
    updateFetch(data)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        console.log('hello')
        expect(result).to.equals('no ID passed')
        done()
      })
      .catch((err) => {
        console.log('here')
        done(err)
      })
  })
})
