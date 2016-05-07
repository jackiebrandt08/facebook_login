var app = angular.module('app', []);

app.controller('dataController', function($scope, $http){
    $http.get("https://login-asg3-jackiebrandt08.c9users.io/").then(function(response){
        
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(function(){
            formatDataTable(response.data);
        });
    });
});

function formatDataTable(chartdata){
    var data = [];
    var header = ['Job Description', 'Job Count'];
    
    console.table(chartdata);
    
    data.push(header);
    
    for (var i=0; i < chartdata.length; i++) {
        var temp = [];
        temp.push(chartdata[i]._id);
        temp.push(chartdata[i].value);
        data.push(temp);
    }
    
    console.table(data);
    
    var g_data = google.visualization.arrayToDataTable(data);
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(g_data, getOptions());
}

function getOptions(){
    var options = {
        title: 'Small Business Enterprise in Maryland',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Number of Businesses',
            minValue: 0
        },
        vAxis: {
            title: 'Industry'
        }
    };
    
    return options;
}