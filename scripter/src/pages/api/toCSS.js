'use strict';

import { renderSync } from 'node-sass';

function getCSS(){
    let dataTemp = '.red\n color: red';
    var output = renderSync({ data: dataTemp, indentedSyntax: true, outputStyle : 'compressed' });

    return output.css.toString();
}

console.log();

export default async function handler(req, res) {
    let request = req.query.sass

    let responce = getCSS()
    responce ?  res.status(200).json(responce)
             :  res.status(404).json({message: 'Some Kind of Error Occured'})
  }