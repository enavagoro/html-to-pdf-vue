const pdf = require('html-pdf');
const Vue = require('vue');
var fs = require('fs'); //Filesystem

renderPdf();

function renderPdf(){

    const template = fs.readFileSync('./factura.html', 'utf-8');

    const renderer = require('vue-server-renderer').createRenderer({
        template,
    });

    const app = new Vue({
        data: {
          nombreEmpresa: 'capital',
          rutEmpresa: '19390374-6',
          giro: '360deg',
          direccionEmpresa: 'norte',
          bills:[1,2,3,4,5,6,7,8],
        },
        template: 
    `<div class="container">
        <div class="header-container">
            <p class="header-title-left">Comercial Divenser S.A</p>
            <p class="header-title-rigth">14/02/2021</p>
        </div>
  
        <div class="principal-title-container">
          <p class="principal-title">Detalles de venta por cliente</p>
        </div>
  
        <div class="subtitles-container">
          <div class="subtitle-patent-container">
            <p class="subtitle-patent">
              HZLL19 WV GOL TREND 1.6 1996
            </p>
          </div>
          <div class="subtitle-date-container">
            <p class="subtitle-date">
              Desde el 01-01-2018  Hasta el 14-02-2021
            </p>
          </div>
        </div>
        
        <div class="bills-container" v-for="bill of bills">
          <div class="bills-header-container">
            <div class="bills-header-left">
              <p style="margin-left:0%">Boleta</p>
              <p>1078867</p>
              <p>02/05/18</p>
              <p>KM.47.080.-</p>
            </div>
            <div class="bills-header-rigth">
              <p style="text-align: right;">Bod. 1</p>
            </div>
          </div>
          <div class="bills-list-container">
            <table>
                <tr>
                  <td class="index"></td>
                  <td class="number"></td>
                  <td class="expenses"></td>
                  <td class="blank-space"></td>
                  <td class="seller">Vendedor</td>
                  <td class="quantitie">Cant.</td>
                  <td class="price">Precio</td>
                  <td class="value">Valor.</td>
                </tr>
                <tr>
                  <td class="index">1</td>
                  <td class="number">0335530</td>
                  <td class="">AC.TOTAL 5W30 INEO LONG LIFE C3 SYNT.5 LT.LOW SAP</td>
                  <td class="space-table"></td>
                  <td class="seller">046</td>
                  <td class="quantitie">1.00</td>
                  <td class="price">1000000000</td>
                  <td class="value">13,900</td>
                </tr>
                <tr>
                  <td class="index">1</td>
                  <td class="number">040W71252</td>
                  <td class="">AC.TOTAL 5W30 INEO LONG LIFE C3 SYNT.5 LT.LOW SAP</td>
                  <td class="space-table"></td>
                  <td class="seller">046</td>
                  <td class="quantitie">1.00</td>
                  <td class="price">1000000</td>
                  <td class="value">13,900</td>
                </tr>
            </table>
            <div class="bottom-table">
              <div class="bottom-table-left">
  
              </div>
              <div class="bottom-table-right">
                <p class="bottom-table-right-value">12222222</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="total-container">
          <div class="total-left-side">
  
          </div>
          <div class="total-right-side">
            <p class="total">Total</p>
            <p class="total">12222222</p>
          </div>
        </div>


        <div class="text-container">
            <h1>{{nombreEmpresa}}</h1>
            <h1>Rut: {{rutEmpresa}}</h1>
            <h1>Giro: {{giro}}</h1>
            <h1>Dirección: {{direccionEmpresa}}</h1>
        </div>

    </div>`
    });

    renderer.renderToString(app, (err, html) => {
        if(err){
            console.log('hubo error',err);
            return
        }
        console.log('esto sale',html);
        /*

        var content = fs.readFileSync("./factura.html","utf-8");
    */
        var options = {"height": "", "width": "21.6cm",   "border": {
            "top": "0cm",            
            "right": "0cm",
            "bottom": "0cm",
            "left": "0cm",
          }};      
        
        
        pdf.create(html,options).toFile('./factura.pdf', function(err, res) {
            if (err){
                console.log(err);
            } else {
                console.log(res);
            }
            
         });

    });
      
}

