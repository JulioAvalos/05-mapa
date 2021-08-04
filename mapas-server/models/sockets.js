const Marcadores = require("./marcadores");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.marcadores = new Marcadores();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            
            // TODO: marcadores-activos

            // TODO: marcador-nuevo

            // TODO: marcador-actualizado

        });
    }


}


module.exports = Sockets;