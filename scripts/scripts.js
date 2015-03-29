"use strict";angular.module("gdscalculatorApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/calculator.html",controller:"CalculatorCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/citydata",{templateUrl:"views/citydata.html",controller:"CitydataCtrl"}).otherwise({redirectTo:"/"})}]).controller("AppCtrl",["$scope",function(a){a.system={version:"test",serviceDomain:"http://cityswitch-omnicalculators.rhcloud.com"}}]),angular.module("gdscalculatorApp").controller("HeaderCtrl",["$scope",function(a){a.selectedPageInd={value:0},a.pages=[{href:"#/",text:"计算器"},{href:"#/citydata",text:"完善数据"},{href:"#/contact",text:"联系我们"},{href:"#/about",text:"关于我们"}]}]),angular.module("gdscalculatorApp").filter("customCurrency",["$filter",function(a){return function(b,c){var d=a("currency");return 0>b?d(b,c).replace("(","-").replace(")",""):d(b,c)}}]).directive("modal",function(){return{template:'<div class="modal fade" visible="showShareTipModal"><div class="modal-body" ng-transclude><img width="100%" src="images/wechat_share_tip.gif"></img></div></div>',restrict:"E",transclude:!0,replace:!0,scope:!0,link:function(a,b,c){a.$watch(c.visible,function(a){$(b).modal(a===!0?"show":"hide")}),$(b).on("shown.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!0})}),$(b).on("hidden.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!1})})}}}).directive("spinner",function(){return{template:'<div class="modal fade" visible="showSpinnerModal"><div class="modal-body" ng-transclude></div></div>',restrict:"E",backdrop:!1,transclude:!0,replace:!0,scope:!0,link:function(a,b,c){a.$watch(c.visible,function(a){$(b).modal(a===!0?"show":"hide")}),$(b).on("shown.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!0})})}}}).controller("CalculatorCtrl",["$scope","$http","$timeout",function(a,b,c){function d(){var c="misc/citylist.json";b.get(c).success(function(b){a.cities=b}).error(function(a,b,c,d){console.log("error: "),console.log("data: "+a),console.log("status: "+b),console.log("headers: "+c),console.log("config: "+d)})}a.showResult=!1,a.showShareTipModal=!1,a.showSpinnerModal=!1,a.console=console,a.timeout=c,a.toggleModal=function(){a.showShareTipModal=!a.showShareTipModal},a.cities={},d(),a.sourceCountry={},a.targetCountry={},a.sourceCity={},a.targetCity={},a.sourceCitySalary=0,a.sourceCityExpense=0,a.sourceCityStatus="",a.targetCitySalary=0,a.targetCityExpense=0,a.targetCityStatus="",a.showResult=!1,a.calculate=function(){var c=a.$parent.system.serviceDomain+"/rest/switchcity/simplepath/"+a.sourceCountry.countryNameEn+"/"+a.sourceCity.cityNameEn+"/"+a.sourceCitySalary+"/"+a.sourceCityExpense+"/"+a.targetCountry.countryNameEn+"/"+a.targetCity.cityNameEn;a.showResult=!1,a.showSpinnerModal=!0,setTimeout(function(){b.get(c).success(function(b){a.targetCitySalary=b.targetCitySalary,a.targetCityExpense=b.targetCityExpense,a.targetCityStatus=b.targetCityStatus,a.sourceCityStatus=b.sourceCityStatus,a.showResult=!0,a.showSpinnerModal=!1}).error(function(b,d,e,f){a.showSpinnerModal=!1,a.requestLink=c,console.log("error: "),console.log("data: "+b),console.log("status: "+d),console.log("headers: "+e),console.log("config: "+f)})},1e3)}}]),angular.module("gdscalculatorApp").controller("ContactCtrl",["$scope","$http","$window",function(a,b,c){a.sendContact=function(){c.alert("contact send button clicked");var d=a.$parent.system.serviceDomain+"/rest/feedback/";b({method:"POST",url:d,headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:function(a){var b=[];for(var c in a)b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")},data:{email:"email@example.com",content:"sample shit content"}}).success(function(a){console.log(a),c.alert("Thanks")}).error(function(a,b,d,e){console.log(a),console.log(b),console.log(d),console.log(e),c.alert("Error: "+a)})}}]),angular.module("gdscalculatorApp").controller("AboutCtrl",["$scope",function(a){a.references=[{name:"Expatistan Cost of Living Index",url:"http://www.expatistan.com/cost-of-living/index"},{name:"Mercer's 2014 Cost of Living Rankings",url:"http://www.mercer.com/content/mercer/global/all/en/newsroom/cost-of-living-survey.html"},{name:"EIU Worldwide Cost of Living",url:"http://www.worldwidecostofliving.com/"},{name:"National Bureau of Statistic of the People's Republic of China",url:"http://www.stats.gov.cn/tjsj/"}]}]),angular.module("gdscalculatorApp").controller("CitydataCtrl",["$scope","$window",function(a,b){a.sendData=function(){b.alert("send button clicked")}}]);