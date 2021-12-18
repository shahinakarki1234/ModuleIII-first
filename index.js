const express = require("express");
const fetch = require("node-fetch");
const request = require("request");

const app = express();
const port = 3000;

//get employee data
app.get("/employee/:id", (req, res) => {
  fetch("./employee.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      console.log("\n\ndata", data);

      let foundData;
      for (let i = 0; i < data.length; i++) {
        console.log("data[i]", data[i]);
        if (data[i].id === req.params.id) {
          foundData = data[i];
          break;
        }
      }
      if (foundData) {
        res.status(200).send({
          status: "success",
          employee: foundData,
        });
      } else {
        res.status(404).send({
          status: "fail",
          message: "Couldn't find employee",
        });
      }
    })
    .catch((err) => {
      // Do something for an error here
      console.log("\n\nerr", err);
      res.status(500).send(err);
    });
});

//get project data
app.get("/project/:id", (req, res) => {
  fetch("./project.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      console.log("\n\ndata", data);

      let foundData;
      for (let i = 0; i < data.length; i++) {
        console.log("data[i]", data[i]);
        if (data[i].id === req.params.id) {
          foundData = data[i];
          break;
        }
      }

      if (foundData) {
        res.status(200).send({
          status: "success",
          project: foundData,
        });
      } else {
        res.status(404).send({
          status: "fail",
          message: "Couldn't find employee",
        });
      }
    })
    .catch((err) => {
      // Do something for an error here
      console.log("\n\nerr", err);
      res.status(500).send(err);
    });
});

//get employee details
app.get("/getemployeedetails", (req, res) => {
  fetch("./employee.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // all employee data
      console.log("\n\ndata", data);

      let foundData;
      for (let i = 0; i < data.length; i++) {
        console.log("data[i]", data[i]);
        request(
          `localhost:3000/project/${data[i].projectId}`,
          { json: true },
          (err, res, body) => {
            if (err) {
              res.status(400).send({
                status: "fail",
                message: "Couldn't get project data",
              });
            }
            data[i].project = body.project;
          }
        );
      }

      res.status(200).send({
        status: "success",
        employeeDetails: data,
      });
    })
    .catch((err) => {
      // Do something for an error here
      console.log("\n\nerr", err);
      res.status(500).send(err);
    });
});

//server listen on port
app.listen(port, (err) => {
  if (err) {
    console.log("error listening on port:", port);
    return;
  }
  console.log("server is running on port:", port);
});
