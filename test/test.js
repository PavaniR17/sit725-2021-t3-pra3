const expect = require("chai").expect;
const request = require("request");

describe("Test add two numbers", ()=> {
const url = "http://localhost:8080/add/2/3";

    it("return status code 200 when calling api",(done) => {
        request(url, (err,response,body) => { 
            //if the status of response.status code = 200 
            expect(response.statusCode).to.equal(200);
            done();
        });
    })

    it("return a number as a result of request",(done) => {
        request(url, (err,response,body) => { 
        //if body result is a number
            body = JSON.parse(body);
             expect(body.result).to.be.a("number");
             done();
        });
    });

    it("return 5 as a result of request",(done) => {
    request(url, (err,response,body) => { 
    //if body result is a number
    body = JSON.parse(body);
    expect(body.result).to.equal(5);
    done();
    });
});
})

describe("Test add two string", ()=> {
    const url = "http://localhost:8080/add/a/b";

    it("return status code 400 when calling api",(done) => {
        request(url, (err,response,body) => { 
             //if the status of response.status code = 200
             expect(response.statusCode).to.equal(400);
             done();
        });
    })

    it("return the right error message",(done) => {
        request(url, (err,response,body) => { 
             //if the body error == ' the input should be two number'
             body = JSON.parse(body);
             expect(body.error).to.equal('bad input, the input should be two numbers');
             done();
        });
    })
});

describe("Test add one  string and one number", ()=> {
    const url = "http://localhost:8080/add/a/2";

    it("return status code 400 when calling api",(done) => {
        request(url, (err,response,body) => { 
             //if the status of response.status code = 200
             expect(response.statusCode).to.equal(400);
             done();
        });
    })

    it("return the right error message",(done) => {
        request(url, (err,response,body) => { 
             //if the body error == ' the input should be two number'
             body = JSON.parse(body);
             expect(body.error).to.equal('bad input, the input should be two numbers');
             done();
        });
    })
});


describe("Test add two numbers wth space", ()=> {
    const url = "http://localhost:8080/add/2 / 3 ";
    
        it("return status code 200 when calling api",(done) => {
            request(url, (err,response,body) => { 
                //if the status of response.status code = 200 
                expect(response.statusCode).to.equal(200);
                done();
            });
        })
    
        it("return a number as a result of request",(done) => {
            request(url, (err,response,body) => { 
            //if body result is a number
                body = JSON.parse(body);
                 expect(body.result).to.be.a("number");
                 done();
            });
        });
    
        it("return 5 as a result of request",(done) => {
        request(url, (err,response,body) => { 
        //if body result is a number
        body = JSON.parse(body);
        expect(body.result).to.equal(5);
        done();
        });
    });
    })