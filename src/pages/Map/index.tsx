import {Scene, PointLayer, RasterLayer, PolygonLayer, LineLayer, Popup} from '@antv/l7';
import {Map, GaodeMap} from '@antv/l7-maps';
import {useEffect} from "react";
import {mapData} from "./static"

const MapPage = () => {

    useEffect(() => {
        const scene = new Scene({
            id: 'map',
            map: new GaodeMap({
                style: 'amap://styles/darkblue',
                center: [104.066301, 30.572961],
                zoom: 8,
                token: 'e5a2705d2cc6e7b8f0fcf34eab8d3c7a'
            }),
            antialias: true, // 启用抗锯齿

        });
        const tem = mapData.features.map((item, index) => ({...item, id: index + ''}))
        mapData.features = tem
        scene.on('loaded', () => {
            fetch('https://www.tzymap.com/geo/geoserver/TZY_Web_2023/ows?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=TZY_Web_2023:TZY_MapShow&viewparams=creator:1;mapId:1')
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.features.filter(item => !(item.geometry && item.geometry.type == 'Polygon')))
                    const tem = data.features.filter(item => item.geometry && item.geometry.type == 'Polygon')
                    data.features = tem
                    const color = [
                        '#eecdf0',
                        '#f9f89c',
                        '#f59942',
                        '#d73220',
                        '#a6d6ef',
                        '#f3e557',
                        '#999efc',
                        'rgb(12,44,132)',
                    ];
                    const layer = new PolygonLayer({})
                        .source(data)
                        .color('id', color)
                        .shape('fill')
                        // .active(true)
                        .style({
                            enable: true, // true - false
                            dir: 'in', // in - out
                        })
                    scene.addLayer(layer);
                    const filllayer = new PolygonLayer({
                        name: 'fill',
                        zIndex: 3,
                    })
                        .source(data)
                        .shape('fill')
                        .color('count', ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'])
                        .style({
                            opacity: 0.6,
                            opacityLinear: {
                                enable: true,
                                dir: 'out', // in - out
                            },
                        });
                    scene.addLayer(filllayer);
                    const layer2 = new LineLayer({
                        zIndex: 2,
                    })
                        .source(data)
                        .color('#fff')
                        .active(true)
                        .size(2)
                        .style({
                            // lineType: 'dash',
                            dashArray: [2, 2],
                        });
                    scene.addLayer(layer2);
                    const linelayer = new LineLayer({
                        zIndex: 5,
                        name: 'line2',
                    })
                        .source(data)
                        .shape('line')
                        .size(1)
                        .color('#fff')
                        .style({
                            opacity: 0.3,
                        });
                    scene.addLayer(linelayer);

                    const textlayer = new PolygonLayer({})
                        .source(data)
                        .color('blue')
                        .shape('name', 'text')
                        .size(8)
                        .style({
                            textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
                            textOffset: [0, 0], // 文本相对锚点的偏移量 [水平, 垂直]
                            spacing: 2, // 字符间距
                            // padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
                            stroke: '#ffffff', // 描边颜色
                            strokeWidth: 0.3, // 描边宽度
                            strokeOpacity: 1.0,
                        });
                    scene.addLayer(textlayer);

                });
        });

    }, [])
    return (
        <div className="map-china">
            <div
                id='map'
                style={{height: "100vh", width: "100vw", position: 'relative', justifyContent: 'center'}}
            >
            </div>
        </div>
    )
}
export default MapPage