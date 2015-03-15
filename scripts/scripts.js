"use strict";angular.module("gdscalculatorApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/calculator.html",controller:"CalculatorCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/citydata",{templateUrl:"views/citydata.html",controller:"CitydataCtrl"}).otherwise({redirectTo:"/"})}]).controller("AppCtrl",["$scope",function(a){a.system={version:"test",serviceDomain:"http://cityswitch-omnicalculators.rhcloud.com"}}]),angular.module("gdscalculatorApp").controller("HeaderCtrl",["$scope",function(a){a.selectedPageInd={value:0},a.pages=[{href:"#/",text:"计算器"},{href:"#/citydata",text:"完善数据"},{href:"#/contact",text:"联系我们"},{href:"#/about",text:"关于我们"}]}]),angular.module("gdscalculatorApp").filter("customCurrency",["$filter",function(a){return function(b,c){var d=a("currency");return 0>b?d(b,c).replace("(","-").replace(")",""):d(b,c)}}]).directive("modal",function(){return{template:'<div class="modal fade" visible="showShareTipModal"><div class="modal-body" ng-transclude><img width="100%" height="100%" src="images/wechat_share_tip.gif"></img></div></div>',restrict:"E",transclude:!0,replace:!0,scope:!0,link:function(a,b,c){a.$watch(c.visible,function(a){$(b).modal(a===!0?"show":"hide")}),$(b).on("shown.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!0})}),$(b).on("hidden.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!1})})}}}).controller("CalculatorCtrl",["$scope","$http",function(a,b){function c(){var c="misc/citylist.json";b.get(c).success(function(b){a.cities=b}).error(function(a,b,c,d){console.log("error: "),console.log("data: "+a),console.log("status: "+b),console.log("headers: "+c),console.log("config: "+d)})}a.showResult=!1,a.showShareTipModal=!1,a.toggleModal=function(){a.showShareTipModal=!a.showShareTipModal},a.cities={},c(),a.sourceCountry={},a.targetCountry={},a.sourceCity={},a.targetCity={},a.sourceCitySalary=0,a.sourceCityExpense=0,a.sourceCityStatus="",a.targetCitySalary=0,a.targetCityExpense=0,a.targetCityStatus="",a.showResult=!1,a.calculate=function(){var c=a.$parent.system.serviceDomain+"/rest/switchcity/simplepath/"+a.sourceCountry.countryNameEn+"/"+a.sourceCity.cityNameEn+"/"+a.sourceCitySalary+"/"+a.sourceCityExpense+"/"+a.targetCountry.countryNameEn+"/"+a.targetCity.cityNameEn;a.showResult=!1,b.get(c).success(function(b){console.log(b),a.targetCitySalary=b.targetCitySalary,a.targetCityExpense=b.targetCityExpense,a.targetCityStatus=b.targetCityStatus,a.sourceCityStatus=b.sourceCityStatus,a.showResult=!0}).error(function(b,d,e,f){a.requestLink=c,console.log("error: "),console.log("data: "+b),console.log("status: "+d),console.log("headers: "+e),console.log("config: "+f)})}}]),angular.module("gdscalculatorApp").controller("ContactCtrl",["$scope","$window",function(a,b){a.sendContact=function(){b.alert("contact send button clicked")}}]),angular.module("gdscalculatorApp").controller("AboutCtrl",["$scope",function(a){a.references=[{name:"Expatistan Cost of Living Index",url:"http://www.expatistan.com/cost-of-living/index"},{name:"Mercer's 2014 Cost of Living Rankings",url:"http://www.mercer.com/content/mercer/global/all/en/newsroom/cost-of-living-survey.html"},{name:"EIU Worldwide Cost of Living",url:"http://www.worldwidecostofliving.com/"},{name:"National Bureau of Statistic of the People's Republic of China",url:"http://www.stats.gov.cn/tjsj/"}]}]),angular.module("gdscalculatorApp").controller("CitydataCtrl",["$scope","$window",function(a,b){a.sendData=function(){b.alert("send button clicked")}}]);