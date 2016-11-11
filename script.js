var pdf = require('pdfkit');
var fs = require('fs');

module.exports = {
	ImprimirReciboPago: function() {
		var myDoc = new pdf;
		var today = new Date();

		myDoc.pipe(fs.createWriteStream('output.pdf'));
		myDoc.roundedRect(60, 65, 530, 240, 20);
		myDoc.stroke();
		myDoc.image('public/logo.png', 70, 10, {width: 64, height: 64});
		myDoc.font('public/Roboto-Regular.ttf')
		    .fontSize(12)
		    .text("San José Iturbide, Gto. a " + (today.getDate()) + " de " + (today.getMonth()+1) + " del " + today.getFullYear(), {width: 500, align: 'right'});
	    myDoc.moveDown();
	    myDoc.fontSize(16).text("Recibo de Pago", {width: 500, align: 'center'});
	    myDoc.moveDown();
		myDoc.font('public/Roboto-Thin.ttf')
		    .fontSize(12)
		    .text("Recibí de: GUILLERMO ORTIZ REBOLLEDO", {width: 500, align: 'justify'});
		myDoc.moveDown();
		myDoc.text("Licenciatura: LICENCIATURA EN INFORMÁTICA", {width: 500, align: 'justify'});
		myDoc.moveDown();
		myDoc.text("La cantidad de: $ 1500.00 ( MIL QUINIENTOS PESOS )", {width: 500, align: 'left'});
		myDoc.moveDown();
		myDoc.text("Por condepto de: PAGO MENSUAL NOVIEMBRE 2016", {width: 500, align: 'justify'});
		myDoc.moveDown();
		myDoc.moveDown();
		myDoc.text("_________________________________", {width: 500, align: 'right'});
		myDoc.text("Firma", {width: 500, align: 'right'});
		myDoc.end();
	}
};