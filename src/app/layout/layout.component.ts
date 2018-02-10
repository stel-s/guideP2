import {
    Component,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    ViewChild,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Store } from "@ngrx/store";
// import { State } from "../state-management/main-state";
// import { INCREMENT, DECREMENT, RESET } from '../state-management/main-reducer';
// import { State, getShowSidenav } from "../../app/app.reducers";
// import { OpenSidenavAction } from "../../app/shared/shared.actions";
import * as io from 'socket.io-client';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    @ViewChild('chart') public chartEl: ElementRef;
    data:any;
    options: any;
    options2: any;
    client: any;
    chart : any;
    chart2: any;
    public current;
    constructor(public router: Router) {
        this.options = {
            name: "factory data",
            chart: { type: 'spline' },
            title : { text : 'M0 PLC-1 chart' },
            legend: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',

            },
            tooltip: {
                formatter: function () {
                    return '<b>' + 'Factory Data' + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,

                    color: '#808080'
                }]
            },
            series: [{
                name: 'Factory Data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }()),
            }]
        };

        this.options2 = {
            chart: {
                type: 'solidgauge'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {

                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#DF5353'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,

                labels: {
                    y: 16
                },
                min: 0,
                max: 20000,
                title: {
                    text: 'RPM'
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },


            credits: {
                enabled: false
            },

            series: [{
                name: 'RPM',
                data: [80],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' + 'black' + '">{y:.1f}</span><br/>' +
                    '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
                },
                tooltip: {
                    valueSuffix: '  revolutions/min'
                }
            }]

        };


        console.log(this.options.series)
        this.client = io('http://ec2-54-175-204-225.compute-1.amazonaws.com:5000');



         // store.select(getShowSidenav).subscribe( (data )=> {
         //     this.data = 'data is' + data;
         //     console.log("sdsds,",data)
         // });;
        // this.store.dispatch(new OpenSidenavAction());

        // store.select('counterReducer')
        //     .subscribe( (data )=> {
        //         this.data = 'data is' + data;
        //         console.log(data)
        //     });
    }
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
    saveInstance2(chartInstance) {
        this.chart2 = chartInstance;
    }
    ngOnInit() {
        // setTimeout(() => {
        //     this.options = {
        //         title : { text : 'simple chart' },
        //         series: [{
        //             data: [29.9, 71.5, 106.4, 129.2,129.9, 171.5, 1106.4, 1129.2],
        //         }]
        //     }
        // })
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
        this.client.on('connect', ()=>{
            console.log("cnonect")
            this.client.emit('subscribe', {topic: 'OT'});
        })
        let arr = []
        this.client.on('mqtt', (event) => {
            console.log(JSON.parse(event))
            let arr2 = [];
            let data = JSON.parse(event);
            arr2 = arr.concat(data);
            console.log(event)
            // this.options = {
            //     title : { text : 'simple chart' },
            //     series: [{
            //         data: [29.9, 71.5, 106.4, 129.2,129.9, 171.5, 1106.4, 1129.2],
            //     }]
            // }{
            console.log(new Date(data.timestamp).toLocaleString());
            //this.chart.setSize(800, 500);
            this.chart.series[0].addPoint({x: data.timestamp , y: data.value})
            this.chart2.series[0].points[0].update(data.value/10000)
            //this.options2.series[0].data.push(data.value)
            this.current = data.value;
            //  this.options.series[0].data.push(data.value)
            // this.options = Object.assign({},this.options)
            // console.log(this.options);
            // event.topic
            // event.message
        })
        // this.store.dispatch({ type: INCREMENT });
    }

}
