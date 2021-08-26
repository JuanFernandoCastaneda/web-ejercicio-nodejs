const http = require("http");
const fs = require("fs");
const axios = require("axios");

http
  .createServer(function (req, res) {
    if (req.url === "/api/proveedores") {
      fs.readFile("./index.html", (err, data) => {
        var html = data.toString();
        axios
          .get(
            "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
          )
          .then((document) => {
            html = html.substring(0, html.search("</body>"));
            html += `<h1 style="text-align:center">Listado de proveedores</h1>
            <table class="table table-striped">
            <thead><tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Contacto</th>
            </tr></thead>`;
            document.data.forEach((element) => {
              html += "<tr>";
              html += "<td>" + element.idproveedor + "</td>";
              html += "<td>" + element.nombrecompania + "</td>";
              html += "<td>" + element.nombrecontacto + "</td>";
              html += "</tr>";
            });
            html += "</table></body>";
            res.setHeader("Content-Type", "text/html");
            res.write(html);
            res.end();
          });
      });
    } else if (req.url === "/api/clientes") {
      fs.readFile("./index.html", (err, data) => {
        var html = data.toString();
        axios
          .get(
            "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
          )
          .then((document) => {
            html = html.substring(0, html.search("</body>"));
            html += `<h1 style="text-align:center">Listado de clientes</h1>
            <table class="table table-striped">
            <thead><tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Contacto</th>
            </tr></thead>`;
            document.data.forEach((element) => {
              html += "<tr>";
              html += "<td>" + element.idCliente + "</td>";
              html += "<td>" + element.NombreCompania + "</td>";
              html += "<td>" + element.NombreContacto + "</td>";
              html += "</tr>";
            });
            html += "</table></body>";
            res.setHeader("Content-Type", "text/html");
            res.write(html);
            res.end();
          });
      });
    } else {
      res.write("<p>BAD END</p>");
    }
  })
  .listen("8081");
