"use strict";angular.module("gdscalculatorApp",["ngAnimate","ngCookies","ngDialog","ngResource","ngTouch","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("calculator",{url:"/",templateUrl:"views/calculator.html",controller:"CalculatorCtrl"}).state("about",{url:"/about",templateUrl:"views/about.html",controller:"AboutCtrl"}).state("contact",{url:"/contact",templateUrl:"views/contact.html",controller:"ContactCtrl"}).state("cityswitch_ref",{url:"/cityswitch_ref",templateUrl:"views/cityswitch_ref.html",controller:"CitySwitchRefCtrl"}).state("citydata",{url:"/citydata",templateUrl:"views/citydata.html",controller:"CitydataCtrl"})}]).controller("AppCtrl",["$scope",function(a){a.system={version:"test",serviceDomain:"http://cityswitch-omnicalculators.rhcloud.com"}}]),angular.module("gdscalculatorApp").controller("AboutCtrl",function(){}),angular.module("gdscalculatorApp").filter("customCurrency",["$filter",function(a){return function(b,c){var d=a("currency");return 0>b?d(b,c).replace("(","-").replace(")",""):d(b,c)}}]).directive("wholeNumber",function(){return{require:"ngModel",link:function(a,b,c,d){function e(a){var b="";b=""===a?"0":a.replace(/[^0-9]/g,""),b!==a&&(d.$setViewValue(b),d.$render());var c="0";return 0===b.indexOf("0")?(c=b.replace(/^0+/,""),""===c&&(c="0"),d.$setViewValue(c),d.$render()):c=b,c}d.$parsers.push(e)}}}).directive("modal",function(){return{template:'<div class="modal fade" visible="showShareTipModal"><div class="modal-body" ng-transclude><img width="100%" src="images/wechat_share_tip.gif"></img></div></div>',restrict:"E",transclude:!0,replace:!0,scope:!0,link:function(a,b,c){a.$watch(c.visible,function(a){$(b).modal(a===!0?"show":"hide")}),$(b).on("shown.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!0})}),$(b).on("hidden.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!1})})}}}).directive("spinner",function(){return{template:'<div class="modal fade" visible="showSpinnerModal"><div class="modal-body" ng-transclude></div></div>',restrict:"E",backdrop:!1,transclude:!0,replace:!0,scope:!0,link:function(a,b,c){a.$watch(c.visible,function(a){$(b).modal(a===!0?"show":"hide")}),$(b).on("shown.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!0})})}}}).controller("CalculatorCtrl",["$scope","$http","$timeout",function(a,b,c){function d(){var c="misc/citylist.json";b.get(c).success(function(b){a.cities=b}).error(function(a,b,c,d){console.log("error: "),console.log("data: "+a),console.log("status: "+b),console.log("headers: "+c),console.log("config: "+d)})}a.showResult=!1,a.showShareTipModal=!1,a.showSpinnerModal=!1,a.console=console,a.timeout=c,a.toggleModal=function(){a.showShareTipModal=!a.showShareTipModal},a.cities={},d(),a.sourceCountry={},a.targetCountry={},a.sourceCity={},a.targetCity={},a.sourceCitySalary="",a.sourceCityExpense="",a.sourceCityStatus="",a.targetCitySalary=0,a.targetCityExpense=0,a.targetCityStatus="",a.showResult=!1,a.calculate=function(){var c=a.$parent.system.serviceDomain+"/rest/switchcity/simplepath/"+a.sourceCountry.countryNameEn+"/"+a.sourceCity.cityNameEn+"/"+a.sourceCitySalary+"/"+a.sourceCityExpense+"/"+a.targetCountry.countryNameEn+"/"+a.targetCity.cityNameEn;a.showResult=!1,a.showSpinnerModal=!0,setTimeout(function(){b.get(c).success(function(b){a.targetCitySalary=b.targetCitySalary,a.targetCityExpense=b.targetCityExpense,a.targetCityStatus=b.targetCityStatus,a.sourceCityStatus=b.sourceCityStatus,a.showResult=!0,a.showSpinnerModal=!1}).error(function(b,d,e,f){a.showSpinnerModal=!1,a.requestLink=c,console.log("error: "),console.log("data: "+b),console.log("status: "+d),console.log("headers: "+e),console.log("config: "+f)})},1e3)}}]),angular.module("gdscalculatorApp").controller("CitydataCtrl",["$scope","$http","ngDialog",function(a,b,c){a.sendData=function(){var d={email:a.email||"",update:a.update?1:0,content:JSON.stringify({sourceCountry:a.sourceCountry||"",sourceCity:a.sourceCity||"",salary:a.salary||"",clothes:a.clothes||"",food:a.food||"",accommodation:a.accommodation||"",communication:a.communication||"",otherexpense:a.otherexpense||"",interestedCountry1:a.interestedCountry1||"",interestedCity1:a.interestedCity1||"",interestedCountry2:a.interestedCountry2||"",interestedCity2:a.interestedCity2||"",interestedCountry3:a.interestedCountry3||"",interestedCity3:a.interestedCity3||""})},e=a.$parent.system.serviceDomain+"/rest/extra/post";b({method:"POST",url:e,headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:function(a){var b=[];for(var c in a)b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")},data:d}).success(function(){c.open({template:"<p>谢谢您的反馈</p>",plain:!0})}).error(function(){c.open({template:"<p>链接错误，请稍后再试</p>",plain:!0})})}}]),angular.module("gdscalculatorApp").controller("CitySwitchRefCtrl",["$scope",function(a){a.references=[{name:"Expatistan Cost of Living Index",url:"http://www.expatistan.com/cost-of-living/index"},{name:"Mercer's 2014 Cost of Living Rankings",url:"http://www.mercer.com/content/mercer/global/all/en/newsroom/cost-of-living-survey.html"},{name:"EIU Worldwide Cost of Living",url:"http://www.worldwidecostofliving.com/"},{name:"National Bureau of Statistic of the People's Republic of China",url:"http://www.stats.gov.cn/tjsj/"}]}]),angular.module("gdscalculatorApp").controller("ContactCtrl",["$scope","$http","ngDialog",function(a,b,c){a.sendContact=function(){var d=a.$parent.system.serviceDomain+"/rest/feedback/post";b({method:"POST",url:d,headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:function(a){var b=[];for(var c in a)b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")},data:{email:a.email||"",content:a.content||""}}).success(function(){c.open({template:"<p>谢谢您的反馈</p>",plain:!0})}).error(function(){c.open({template:"<p>链接错误，请稍后再试</p>",plain:!0})})}}]),angular.module("gdscalculatorApp").controller("HeaderCtrl",["$scope",function(a){a.selectedPageInd={value:0},a.pages=[{sref:"calculator",text:"计算器"},{sref:"cityswitch_ref",text:"参考数据"},{sref:"citydata",text:"完善数据"},{sref:"contact",text:"联系我们"},{sref:"about",text:"关于我们"}]}]);
