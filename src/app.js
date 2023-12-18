const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const { google } = require("googleapis");
const { JWT } = require("google-auth-library");

const errorHandler = require("./handler/errorHandler");
const pageNotFound = require("./handler/pageNotFound.js");

const credentials = require("../database-for-au.json");

// Create a new JWT client using the credentials
const jwtClient = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

//init app

const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//init database
app.use(cors());

app.get("/districts", async (req, res) => {
  try {
    jwtClient.authorize(async (err, tokens) => {
      if (err) {
        res.status(200).send({
          message: err,
          data: [],
        });
      }
      const sheets = google.sheets({ version: "v4", auth: jwtClient });
      sheets.spreadsheets.values
        .get({
          spreadsheetId: "15Dn4fmpLlU0gfU07AIzaK03myoNJm7G0unssfBXvPZM",
          range: "Main!A1:B20",
        })
        .then(({ data }) => {
          const values = data.values || [];
          res.status(200).send({
            message: values.length ? "Correct for get data" : "No data found",
            data: values.slice(1).map(([label, value]) => ({ label, value })),
          });
        })
        .catch((e) =>
          res.status(200).send({
            message: e.message || "Error to get data",
            data: [],
          })
        );
    });
  } catch (error) {
    res.status(200).send({
      message: error.message || "Error to get data",
      data: [],
    });
  }
});

app.get("/districts/:id", (req, res) => {
  const { id } = req.params;
  try {
    jwtClient.authorize(async (err, tokens) => {
      if (err) {
        res.status(200).send({
          message: err,
          data: [],
        });
      }
      const sheets = google.sheets({ version: "v4", auth: jwtClient });
      sheets.spreadsheets.values
        .get({
          spreadsheetId: "15Dn4fmpLlU0gfU07AIzaK03myoNJm7G0unssfBXvPZM",
          range: `${id}!A1:B20`,
        })
        .then(({ data }) => {
          const values = data.values || [];
          res.status(200).send({
            message: values.length ? "Correct for get data" : "No data found",
            data: values.slice(1).map(([label, value]) => ({ label, value })),
          });
        })
        .catch((e) =>
          res.status(200).send({
            message: e.message || "Error to get data",
            data: [],
          })
        );
    });
  } catch (error) {
    res.status(200).send({
      message: error.message || "Error to get data",
      data: [],
    });
  }
});

app.use("*", pageNotFound);

app.use(errorHandler);

module.exports = app;
