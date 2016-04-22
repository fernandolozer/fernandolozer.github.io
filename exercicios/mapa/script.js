var map = L.map('map');
var servicoDirecoesGoogle = new google.maps.DirectionsService();
var uvvlat = [-20.35431, -40.29953];
map.setView(uvvlat, 15);

var camadaImagem = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
camadaImagem.addTo(map);

var marcador = L.marker(uvvlat, {
    draggable: true
});
marcador.addTo(map);

marcador.on("dragend", function() {
    marcador.bindPopup("Procurando Rua...").openPopup();
    var request = {
        origin: marcador.getLatLng(),
        destination: marcador.getLatLng(),
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    // usando a api do google maps para obter o nome da rua.
    servicoDirecoesGoogle.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            marcador.bindPopup('Endereço Encontrato: <br>' + response.routes[0].summary).openPopup();
        }
    });

});