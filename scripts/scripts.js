"use strict";angular.module("gdscalculatorApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/calculator.html",controller:"CalculatorCtrl"}).when("/contact",{templateUrl:"views/contact.html"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("gdscalculatorApp").controller("HeaderCtrl",["$scope",function(a){a.selectedPageInd={value:0},a.pages=[{href:"#/",text:"计算器"},{href:"#/contact",text:"联系我们"},{href:"#/about",text:"关于我们"}]}]),angular.module("gdscalculatorApp").filter("getCityByContryID",function(){return function(a,b){var c;for(c=0;c<a.length;c++){var d=a[c];if(d.countryID===b)return d.cities}return[]}}).controller("CalculatorCtrl",["$scope","$http",function(a,b){var c="http://cityswitch-omnicalculators.rhcloud.com/rest/switchcity/";a.showResult=!1,a.cities=[{countryID:"CHN",countryNameZh:"中国",countryNameEn:"China",currency:"¥",cities:[{cityID:"a",cityNameEn:"Cheng Du",cityNameZh:"成都"},{cityID:"b",cityNameEn:"Shang Hai",cityNameZh:"上海"}]},{countryID:"GBR",countryNameZh:"英国",countryNameEn:"United Kingdom",currency:"£",cities:[{cityID:"c",cityNameEn:"London",cityNameZh:"伦敦"},{cityID:"d",cityNameEn:"Edinburgh",cityNameZh:"爱丁堡"}]},{countryID:"USA",countryNameZh:"美国",countryNameEn:"United States",currency:"$",cities:[{cityID:"e",cityNameEn:"New York",cityNameZh:"纽约"},{cityID:"f",cityNameEn:"Washington, D.C.",cityNameZh:"华盛顿特区"}]}],a.sourceCity={},a.targetCity={},a.sourceCitySalary=0,a.targetCityStatus={},a.canCompute=!0,a.showResult=!1,a.inputChanged=function(){a.canCompute=!0,a.showResult=!1},a.calculate=function(){var d=c+"simplepath/"+a.sourceCity.cityID+"/"+a.sourceCitySalary+"/"+a.targetCity.cityID;a.showResult=!1,b.get(d).success(function(b){a.targetCitySalary=b.salary,a.targetCityStatus="屌丝",a.sourceCityStatus="高富帅",a.showResult=!0,a.canCompute=!1}).error(function(a,b,c,d){console.log(a),console.log(b),console.log(c),console.log(d)})}}]),angular.module("gdscalculatorApp").controller("AboutCtrl",["$scope",function(a){a.references=[{name:"Expatistan Cost of Living Index",url:"http://www.expatistan.com/cost-of-living/index"},{name:"Mercer's 2014 Cost of Living Rankings",url:"http://www.mercer.com/content/mercer/global/all/en/newsroom/cost-of-living-survey.html"},{name:"EIU Worldwide Cost of Living",url:"http://www.worldwidecostofliving.com/"},{name:"National Bureau of Statistic of the People's Republic of China",url:"http://www.stats.gov.cn/tjsj/"}]}]);