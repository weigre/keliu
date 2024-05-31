/* List 
1. Bar Chart
2. Date Range Picker
3. Date Table
4. CountTo
5. Area Chart
6. Polar Area Chart
7. Doughnut Chart
8. Radar Chart
9. Vectro Map
10. Real Time Chart
*/

$(document).ready(function(){
"use strict";

// ------------------- 2. Date Range Picker -------------------
$('#date').daterangepicker({
"ranges": {
    "Today": [
        moment("2016-09-09T11:06:15.319Z"),
        moment("2016-10-02T11:06:15.319Z")
    ],
    "Yesterday": [
        moment("2016-09-08T11:06:15.319Z"),
        moment("2016-10-01T11:06:15.319Z")
    ],
    "Last 7 Days": [
        moment("2016-09-02T11:06:15.319Z"),
        moment("2016-09-27T11:06:15.319Z")
    ],
    "Last 30 Days": [
        moment("2016-08-09T11:06:15.319Z"),
        moment("2016-09-02T11:06:15.319Z")
    ],
    "This Month": [
        moment("2016-09-01T19:00:00.000Z"),
        moment("2016-09-30T18:59:59.999Z")
    ],
    "Last Month": [
        moment("2016-08-01T19:00:00.000Z"),
        moment("2016-08-31T18:59:59.999Z")
    ]
},
    locale: {
    format: 'DD-MM-YYYY'
    },
    "startDate": "09-09-2016",
    "endDate": "03-10-2016",
    "minDate": "01-01-1970",
    "maxDate": "19-01-2038",
    "opens": "left",
    "applyClass": "btn btn-sm bg-green",
    "cancelClass": "btn btn-sm bg-red"
}, function(start, end, label) {
  console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
});

// ------------------- 3. Date Table -------------------
$('#orders-table').DataTable( {
    "paging":   false,
    "ordering": true,
    "info":     false,
    "searching": false,
    dom: 'Bfrtip',
            buttons: [
                { extend:'excel', className: 'btn-xs btn-table m-r-10'},
                { extend:'csv', className: 'btn-xs btn-table m-r-10'},
                { extend:'print', className: 'btn-xs btn-table'}
            ],

    columnDefs: [ {
        targets: [ 0 ],
        orderData: [ 0, 1 ]
    }, {
        targets: [ 1 ],
        orderData: [ 1, 0 ]
    }, {
        targets: [ 4 ],
        orderData: [ 4, 0 ]
    } ]
});

// ------------------- 4. CountTo -------------------
$('.statistics').countTo();





// ------------------- 9. Vectro Map -------------------
$('#vmap').vectorMap({
map: 'usa_en',
backgroundColor: '#ffffff',
borderColor: '#6320ee',
borderOpacity: 0.25,
borderWidth: 1,
color: '#f2f2f2',
enableZoom: true,
showTooltip: true,
selectedColor: null,
hoverColor: null,
colors: {
mo: '#663ab8',
fl: '#663ab8',
or: '#663ab8',
ak: '#663ab8',
ny: '#663ab8',
co: '#663ab8',
nd: '#663ab8',
},
    onRegionClick: function(event, code, region){
    event.preventDefault();
    }
});

// ------------------- 10. Real Time Chart -------------------
$(function() {

// We use an inline data source in the example, usually data would
// be fetched from a server

var data = [],
    totalPoints = 300;

function getRandomData() {

    if (data.length > 0)
        data = data.slice(1);

    // Do a random walk

    while (data.length < totalPoints) {

        var prev = data.length > 0 ? data[data.length - 1] : 50,
            y = prev + Math.random() * 10 - 5;

        if (y < 0) {
            y = 0;
        } else if (y > 100) {
            y = 100;
        }

        data.push(y);
    }

    // Zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
    }

    return res;
}

// Set up the control widget

var updateInterval = 30;
$("#updateInterval").val(updateInterval).change(function () {
    var v = $(this).val();
    if (v && !isNaN(+v)) {
        updateInterval = +v;
        if (updateInterval < 1) {
            updateInterval = 1;
        } else if (updateInterval > 2000) {
            updateInterval = 2000;
        }
        $(this).val("" + updateInterval);
    }
});

var plot = $.plot("#flot-server-usage", [ getRandomData() ], {
    series: {
        shadowSize: 0,   // Drawing is faster without shadows
        show: true,
        fill: true,
        fillColor: { colors: [{ opacity: 1 }] }
    },
    grid: {
    borderWidth:1,
    borderColor:"#cecece"
    },
    colors: ["#663ab8"], // Change Line Color
    yaxis: {
        min: 0,
        max: 100
    },
    xaxis: {
        show: false
    }
});

function update() {

    plot.setData([getRandomData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()

    plot.draw();
    setTimeout(update, updateInterval);
}

update();

});

});//end
