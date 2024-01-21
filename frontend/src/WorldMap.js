import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
//import L from 'Leaflet';


function WorldMap() {
//    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
//        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
 //       maxZoom: 16
  //  });
    const position = [51.505, -0.09]
    return (
        <MapContainer center={position} zoom={13} maxZoom={5} scrollWheelZoom={true} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                attribution='&copy;'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png"
            />
        </MapContainer>
    );
}

export default WorldMap;