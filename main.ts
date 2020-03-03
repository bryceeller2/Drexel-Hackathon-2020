'use strict';

import * as http from "http";
import express from "express";

function main()
{
    const app : any = express();
    const port     : number = 3000;

    app.use(express.static("app"));
    app.get('/', (req : any, res : any) => res.sendFile("index.html"));

    app.listen(port, () => console.log(`Listening on port ${port}`));
    /*
    const server   : http.Server = http.createServer((req : any, res : any) =>
	{
	    if(req.url == "/index.html" || req.url == "/")
	    {
                fs.readFile("./app/index.html", (err, data) => 
		    {
			res.writeHead(200, {"Content-Type": "text/html"})
		        res.write(data);
			if(err)
              		{
			    throw err;
			}
		    });
	    }
	});

    server.listen(port, hostname, () => 
        {
	    console.log(`Server started on https://${hostname}:${port}/`);
	});
   */
}

main();
