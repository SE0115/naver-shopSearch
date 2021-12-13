// const express = require("express");
const request = require("request");
const app = require("express")();
const uuidAPIKey = require("uuid-apikey");

const server = app.listen(3001, () => {
  console.log("Start Server : localhost:3001");
});

const key = {
  apiKey: "VHJ6N32-T32MZ8C-QAXEYFN-34YCTXJ",
  uuid: "dc646a8c-d0c5-4fa1-baba-ef3e193ccd76",
};

const client_id = "eQaD0chJ_nOgLGrCTdaS";
const client_secret = "c0EyvFQYF3";
let api_url = "https://openapi.naver.com/v1/search/shop?query=";

app.get("/search/:input", async (req, res) => {
  let { input } = req.params;
  console.log(input);

  request.get(
    {
      url: encodeURI(api_url + input),
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    },
    function (error, response, body) {
      console.log("검색: ", response.statusCode);
      res.send(body);
    }
  );
});

app.get("/auto/:input", async (req, res) => {
  let { input } = req.params;
  console.log(input);

  request.get(
    {
      url: encodeURI(
        `https://mac.search.naver.com/m/ac?_callback=result&q_enc=UTF-8&st=1&frm=mobile_nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&q=${input}`
      ),
    },
    function (error, response, body) {
      console.log("자동완성: ", response.statusCode);
      console.log(...JSON.parse(body.slice(7, body.length - 1))["items"][0]);
      res.send(JSON.parse(body.slice(7, body.length - 1))["items"][0]);
    }
  );
});
