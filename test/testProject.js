const expect = require("chai").expect;
const request = require("request");
const dbo = require ('../db/conn');

describe("Test get all projects", ()=> {
    const url = "http://localhost:8080/projects";

    //setup clearing db &  insert dummy projects
    before ((done) => {
      //  this.enableTimeouts(false) ;
        dbo.connect(() => {
        const  projectCollection = dbo.getDB().collection("projects");
          
                    //clear teh database
         projectCollection.deleteMany({});
         const projects = [];
        // create 10 dummy projects
         for (let i = 1 ; i <= 5; i ++ ){
            projects.push ({project:{
                projecId : i,
                title: 'title '+ i,
                info: 'info ' + i,
                img: 'img ' + i 
            }})
         }
         projectCollection.insertMany(projects, () =>{
             dbo.disconnect();
             done();
         })
        })


    })

    it("return status code 200 when calling api",(done) => {
        request(url, (err,response,body) => { 
            //if the status of response.status code = 200 
            expect(response.statusCode).to.equal(200);
            done();
        });
    })

    it("return an array as the body of request",(done) => {
        request(url, (err,response,body) => { 
            //if the status of response.status code = 200 
            body = JSON.parse(body);
            expect(body).to.be.a("array");
            done();
        });
    })

    it("return exactly 5projects as body of the response",(done) => {
        request(url, (err,response,body) => { 
            //if the status of response.status code = 200 
            body = JSON.parse(body);
            expect(body.length).to.be.equal(5);
            done();
        });
    })

    
    after (() => {
        dbo.connect(() => {
            const projectCollection = dbo.getDB().collection("projects");
            //clear teh database
            projectCollection.deleteMany({}, () => {
                dbo.disconnect();        
            });

           })
    })
})

describe("Test delete projects", ()=> {
    const url = "http://localhost:8080/projects";

    //setup clearing db &  insert dummy projects
    before ((done) => {
      //  this.enableTimeouts(false) ;
        dbo.connect(() => {
        const  projectCollection = dbo.getDB().collection("projects");
          
                    //clear teh database
         projectCollection.deleteMany({});
         const projects = [];
        // create 10 dummy projects
         for (let i = 1 ; i <= 5; i ++ ){
            projects.push ({project:{
                projecId : i,
                title: 'title '+ i,
                info: 'info ' + i,
                img: 'img ' + i 
            }})
         }
         projectCollection.insertMany(projects, () =>{
             dbo.disconnect();
             done();
         })
        })


    })

    it("return status code 200 when calling api",(done) => {
        request(url, (err,response,body) => { 
            //if the status of response.status code = 200 
            expect(response.statusCode).to.equal(200);
            done();
        });
    })

    it("return an array as the body of request",(done) => {
        request(url, (err,response,body) => { 
            //if the status of response.status code = 200 
            body = JSON.parse(body);
            expect(body).to.be.a("array");
            done();
        });
    })

    it("return exactly 5 projects as body of the response",(done) => {
        request(url, (err,response,body) => { 
            //if the status of response.status code = 200 
            body = JSON.parse(body);
            expect(body.length).to.be.equal(5);
            done();
        });
    })

    
    after (() => {
        dbo.connect(() => {
            const projectCollection = dbo.getDB().collection("projects");
            //clear teh database
            projectCollection.deleteMany({}, () => {
                dbo.disconnect();        
            });

           })
    })
})