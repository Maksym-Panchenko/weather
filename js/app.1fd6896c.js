(function(){"use strict";var t={6603:function(t,e,a){var s=a(6369),r=function(){var t=this,e=t._self._c;return e("div",{class:{"dark-mode":t.$store.state.darkMode},attrs:{id:"app"}},[e("CustomLoader"),e("MainHeader"),e("MainContent"),e("SnackbarList")],1)},i=[],o=function(){var t=this,e=t._self._c;return e("header",{staticClass:"header"},[e("div",{staticClass:"header__content content"},[e("button",{staticClass:"button button_icon button_flat button_small header__mode-button",on:{click:function(e){return t.$store.commit("changeMode")}}},[t.$store.state.darkMode?e("img",{staticClass:"header__icon",attrs:{src:a(8848),alt:t.tr("altToLight")}}):e("img",{staticClass:"header__icon",attrs:{src:a(2661),alt:t.tr("altToDark")}})]),t._m(0),e("button",{staticClass:"button button_icon button_flat button_small header__lang-button",on:{click:function(e){return t.$store.dispatch("changeLang")}}},[t._v(" "+t._s(t.tr("lang"))+" ")])])])},n=[function(){var t=this,e=t._self._c;return e("a",{staticClass:"header__link",attrs:{href:"#"}},[e("img",{staticClass:"header__logo",attrs:{src:a(5522),alt:"Logo Open Weather"}})])}],c=(a(7658),a(3822));const l="62eed23c7dfe6e14e59e69936aea7330",d="metric";function u(t,e){const a=y.state.lang,s=`${t},${e}`,r=`https://api.openweathermap.org/data/2.5/weather?q=${s}&appid=${l}&lang=${a}&units=${d}`,i=`https://api.openweathermap.org/data/2.5/forecast?q=${s}&appid=${l}&lang=${a}&units=${d}`;return Promise.all([h(r),m(i)])}function h(t){return fetch(t).then((t=>t.json())).then((t=>({city:t.name,country:t.sys.country,temp:Math.round(t.main.temp),weather:t.weather[0].description,weatherIcon:t.weather[0].icon})))}function m(t){return fetch(t).then((t=>t.json())).then((t=>t.list.map((t=>({value:t.main.temp,label:new Date(+(t.dt+"100"))})))))}async function p(t){const e=`https://api.openweathermap.org/data/2.5/find?q=${t}&type=like&appid=${l}`,a=await fetch(e),s=await a.json();return s.list.map((t=>({cityName:t.name,countryName:t.sys.country})))}function v(t){const e=y.state.lang,a=t.coords.latitude,s=t.coords.longitude,r=`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${s}&appid=${l}&lang=${e}&units=${d}`;fetch(r).then((t=>t.json())).then((t=>{y.dispatch("addCityToSearched",{city:t.name,country:t.sys.country})})).catch((t=>{console.log("Error fetching weather data: ",t)}))}const f=new s.ZP;s.ZP.use(c.ZP);const C=new c.ZP.Store({state:{lang:"ua",darkMode:!1,favoriteCities:[],searchedCites:[],snackbars:[],isLoading:!1},mutations:{addSnackbar(t,e){t.snackbars.push({status:e.status,text:e.text,id:Math.floor(Math.random()*Date.now())})},removeSnackbar(t,e){t.snackbars=t.snackbars.filter((t=>t.id!==e))},showSnackbar(t){t.showSnackbar=!0},hideSnackbar(t){t.showSnackbar=!1},addToFavorite(t,e){t.favoriteCities.length<5?(t.favoriteCities.push(e),this.commit("addSnackbar",{status:"success",text:"snackbarSuccessAddCity"}),this.commit("saveFavorites")):this.commit("addSnackbar",{status:"error",text:"snackbarErrorAddCity"})},removeFromFavorite(t,e){const a=t.favoriteCities.findIndex((t=>t.city===e.city&&t.country===e.country));a>=0&&(t.favoriteCities.splice(a,1),this.commit("addSnackbar",{status:"success",text:"snackbarSuccessRemoveCity"}),this.commit("saveFavorites"))},addCityToSearched(t,e){t.searchedCites.push(e)},removeCityFromSearched(t,e){t.searchedCites.splice(e,1)},replaceCity(t,{city:e,index:a}){t.searchedCites.splice(a,1,e)},saveFavorites(t){t.favoriteCities.length?localStorage.setItem("favorite",JSON.stringify(t.favoriteCities.map((t=>({city:t.city,country:t.country}))))):localStorage.removeItem("favorite")},loadFavorites(t){const e=localStorage.getItem("favorite");e&&(t.favoriteCities=JSON.parse(e))},startLoad(t){t.isLoading=!0},endLoad(t){t.isLoading=!1},switchLang(t){t.lang="ua"===t.lang?"en":"ua",this.commit("saveSettings")},updateFavoriteList(t,e){t.favoriteCities=e},updateSearchedList(t,e){t.searchedCites=e},changeMode(t){t.darkMode=!t.darkMode,f.$emit("updateCardGraphColor"),this.commit("saveSettings")},saveSettings(t){localStorage.setItem("settings",JSON.stringify({lang:t.lang,darkMode:t.darkMode}))},loadSettings(t){const e=localStorage.getItem("settings");if(e){const a=JSON.parse(e);t.lang=a.lang,t.darkMode=a.darkMode}}},actions:{displaySnackbar({commit:t}){t("showSnackbar"),setTimeout((()=>{t("hideSnackbar")}),3e3)},async addCityToSearched({state:t,commit:e},a){if(t.searchedCites.length<5){const t=await u(a.city,a.country),s=Object.assign(t[0],{graph:t[1]});e("addCityToSearched",s)}else this.commit("addSnackbar",{status:"error",text:"snackbarErrorAddCityToSelected"})},async loadFavorites(t){if(t.commit("loadFavorites"),C.state.favoriteCities.length){t.commit("startLoad");const e=[];for(let t in C.state.favoriteCities){const a=C.state.favoriteCities[t].city,s=C.state.favoriteCities[t].country,r=await u(a,s);e.push(Object.assign(r[0],{graph:r[1]},{id:Date.now()+t.toString()}))}t.commit("updateFavoriteList",e),t.commit("endLoad")}},async loadSelected(t){if(C.state.searchedCites.length){t.commit("startLoad");const e=[];for(let t in C.state.searchedCites){const a=C.state.searchedCites[t].city,s=C.state.searchedCites[t].country,r=await u(a,s);e.push(Object.assign(r[0],{graph:r[1]},{id:Date.now()+t.toString()}))}t.commit("updateSearchedList",e),t.commit("endLoad")}},async changeLang(t){t.commit("switchLang"),t.dispatch("loadFavorites"),t.dispatch("loadSelected")}},getters:{inFavorites:t=>e=>t.favoriteCities.some((t=>t.city===e.city&&t.country===e.country))}});var y=C;function g(t){const e=y.state.lang;return _?.[t]?.[e]||"-"}const _={empty:{en:"",ua:""},lang:{en:"en",ua:"юа"},noItemsInList:{en:"There are no cities in this list yet",ua:"У цьому списку поки що немає міст"},enterCityName:{en:"Enter city name",ua:"Введіть назву міста"},temp:{en:"temperature",ua:"температура"},tabSearch:{en:"Search",ua:"Пошук"},tabFavorite:{en:"Favorite",ua:"Обране"},buttonToday:{en:"Today",ua:"Сьогодні"},button24Hours:{en:"24 hours",ua:"Доба"},button5Days:{en:"5 days",ua:"5 днів"},altRemoveFromFavorite:{en:"Remove from favorites",ua:"5 днів"},altAddToFavorite:{en:"Add to favorites",ua:"5 днів"},altWeather:{en:"Weather",ua:"5 днів"},altRemove:{en:"Remove",ua:"5 днів"},altToLight:{en:"To light theme",ua:"5 днів"},altToDark:{en:"To dark theme",ua:"5 днів"},modalButtonCancel:{en:"Cancel",ua:"Відміна"},modalButtonAgree:{en:"Ok",ua:"Так"},modalMessageDeleteCity:{en:"Remove the city?",ua:"Видалити місто?"},modalMessageDeleteFavoriteCity:{en:"Remove the favorite city?",ua:"Видалити обране місто?"},snackbarSuccessRemoveCity:{en:"The city is removed from the favorites",ua:"Місто видалене з обраних"},snackbarSuccessAddCity:{en:"The city is added to favorites",ua:"Місто додано до обраного"},snackbarErrorAddCity:{en:"The favorite list can contain no more than 5 cities",ua:"Список обраних може вміщувати не більше 5 міст"},snackbarErrorAddCityToSelected:{en:"The list can contain no more than 5 cities",ua:"Список може вміщувати не більше 5 міст"}};var b={data(){return{tr:g}}},k=b,S=a(1001),w=(0,S.Z)(k,o,n,!1,null,"7f21abd0",null),$=w.exports,F=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main"},[e("modal-confirm",{attrs:{isActive:t.showModal,messageOptions:t.messageOptions},on:{closeModal:function(e){t.showModal=!1}}}),e("div",{staticClass:"content"},[e("div",{staticClass:"content__tabs"},[e("button",{staticClass:"button",class:{button_active:"search"===t.selectedTab},on:{click:function(e){return t.selectTab("search")}}},[t._v(" "+t._s(t.tr("tabSearch"))+" ")]),e("button",{staticClass:"button",class:{button_active:"favorite"===t.selectedTab},on:{click:function(e){return t.selectTab("favorite")}}},[t._v(" "+t._s(t.tr("tabFavorite"))+" ")])]),e("div",{staticClass:"main__content",attrs:{id:"cards"}},["search"===t.selectedTab?[t._l(t.$store.state.searchedCites,(function(a,s){return e("WeatherCard",{key:a.city+a.country+s,attrs:{card:a},on:{removeCity:function(e){return t.removeCity(s)},replaceCity:function(e){return t.replaceCity(e,s)}}})})),0===t.$store.state.searchedCites.length?e("EmptyList"):t._e(),e("div",{staticClass:"main__action"},[e("button",{staticClass:"button button_icon",on:{click:t.addNewCity}},[e("img",{attrs:{src:a(4355),alt:t.tr("altAdd")}})])])]:[t._l(t.$store.state.favoriteCities,(function(a,s){return e("WeatherCard",{key:a.city+a.country+s,attrs:{mode:"favorite",card:a},on:{removeFavoriteCity:function(e){return t.removeFavoriteCity(a)}}})})),0===t.$store.state.favoriteCities.length?e("EmptyList"):t._e()]],2)])],1)},T=[],x=function(){var t=this,e=t._self._c;return e("div",{staticClass:"card"},[e("CardHeader",{attrs:{mode:t.mode,card:t.currentCard},on:{updateCity:t.updateCity,removeCity:function(e){return t.$emit("removeCity")},removeFavoriteCity:function(e){return t.$emit("removeFavoriteCity")}}}),e("div",{staticClass:"card__data"},[e("div",{staticClass:"card__column"},[e("div",{staticClass:"card__city"},[t._v(t._s(t.card.city)+" ("+t._s(t.card.country)+")")]),void 0!==t.card.temp?e("div",{staticClass:"card__temp"},[t._v(t._s(t.tr("temp"))+" "+t._s(t.card.temp)+"°C")]):t._e(),t.card.weather?e("div",{staticClass:"card__weather"},[t._v("("+t._s(t.card.weather)+")")]):t._e()]),this.currentCard.weatherIcon?e("div",{staticClass:"card__column"},[e("img",{staticClass:"card__image",attrs:{src:t.imgSrc,alt:t.tr("altWeather")}})]):t._e()]),e("div",{staticClass:"card__button-group"},t._l(t.options,(function(a,s){return e("custom-radio",{key:s,attrs:{value:a.value,label:t.tr(a.caption)},model:{value:t.selectedOption,callback:function(e){t.selectedOption=e},expression:"selectedOption"}})})),1),e("div",{staticClass:"card__graph"},[e("canvas",{ref:"chartCanvas"})])],1)},O=[],L=a(9646),M=function(){var t=this,e=t._self._c;return e("label",{staticClass:"button",class:{button_active:t.isChecked}},[e("input",{staticClass:"radio__input",attrs:{type:"radio"},domProps:{value:t.value,checked:t.isChecked},on:{change:t.handleChange}}),t._v(" "+t._s(t.label)+" ")])},D=[],A={model:{prop:"modelValue",event:"input"},props:{value:{type:String,required:!0},label:{type:String,default:""},modelValue:{default:""}},computed:{isChecked(){return this.value===this.modelValue}},methods:{handleChange(){this.$emit("input",this.value)}}},Z=A,j=(0,S.Z)(Z,M,D,!1,null,"36d3ce8f",null),N=j.exports,I=function(){var t=this,e=t._self._c;return e("div",{staticClass:"card__header",class:{card__header_reverse:"search"!==t.mode}},["search"===t.mode?[e("CustomAutocomplete",{on:{updateCity:function(e){return t.$emit("updateCity",e)}}}),e("div",{staticClass:"card__actions"},[t.inFavorites()?e("button",{staticClass:"button button_icon button_small button_flat",on:{click:function(e){return t.removeCityFromFavorite(!0)}}},[e("img",{attrs:{src:a(6338),alt:t.tr("altRemoveFromFavorite")}})]):t._e(),t.inFavorites()?t._e():e("button",{staticClass:"button button_icon button_small button_flat",on:{click:t.addCityToFavorite}},[e("img",{attrs:{src:a(1490),alt:t.tr("altAddToFavorite")}})]),e("button",{staticClass:"button button_icon button_small button_flat",on:{click:t.removeCityFromSearched}},[e("img",{attrs:{src:a(5480),alt:t.tr("altRemove")}})])])]:[e("div",{staticClass:"card__actions"},[e("button",{staticClass:"button button_icon button_small button_flat",on:{click:function(e){return t.removeCityFromFavorite(!1)}}},[e("img",{attrs:{src:a(5480),alt:t.tr("altRemove")}})])])]],2)},P=[],R=function(){var t=this,e=t._self._c;return e("label",{staticClass:"autocomplete"},[e("div",{staticClass:"autocomplete__text"},[t._v(t._s(t.tr("enterCityName")))]),e("div",{staticClass:"autocomplete__input-wrapper"},[e("input",{staticClass:"autocomplete__input",attrs:{type:"text",placeholder:"..."},on:{input:t.inputName,keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.clearItems.apply(null,arguments)}}}),e("ul",{staticClass:"autocomplete__list",class:{autocomplete__list_open:t.list.length},on:{click:t.clearItems}},t._l(t.list,(function(a){return e("li",{key:a.cityName+"."+a.countryName,staticClass:"autocomplete__list-item",on:{click:function(e){return t.selectCity(a)}}},[t._v(t._s(a.cityName)+" - "+t._s(a.countryName))])})),0)])])},E=[],W={data(){return{searchCities:p,list:[],tr:g}},methods:{async inputName(t){const e=t.target.value;e.length>2?this.list=await this.searchCities(e):this.list.splice(0)},clearItems(){this.list.splice(0)},selectCity(t){this.clearItems(),this.$emit("updateCity",t)}}},q=W,G=(0,S.Z)(q,R,E,!1,null,"75e63604",null),H=G.exports,B={components:{CustomAutocomplete:H},props:{mode:{type:String,required:!0},card:{type:Object,required:!0}},data(){return{tr:g}},methods:{inFavorites(){return this.$store.getters.inFavorites({city:this.card.city,country:this.card.country})},addCityToFavorite(){this.$store.commit("addToFavorite",this.card)},removeCityFromFavorite(t){t?this.$store.commit("removeFromFavorite",{city:this.card.city,country:this.card.country}):this.$emit("removeFavoriteCity")},removeCityFromSearched(){this.$emit("removeCity")}}},V=B,J=(0,S.Z)(V,I,P,!1,null,"a3cd9b18",null),z=J.exports;L.kL.register(L.jn,L.od,L.ST,L.uw,L.f$);var K={components:{CustomRadio:N,CardHeader:z},props:{card:{type:Object,required:!0},mode:{type:String,default:"search"}},data(){return{tr:g,currentCard:this.card,options:[{value:"day",caption:"buttonToday"},{value:"full_day",caption:"button24Hours"},{value:"week",caption:"button5Days"}],selectedOption:"full_day",chartData:{labels:[],datasets:[{data:[],backgroundColor:"#fff",borderColor:"#6fbad3",borderWidth:1,lineTension:.4}]}}},computed:{imgSrc(){return this.currentCard.weatherIcon?`https://openweathermap.org/img/w/${this.currentCard.weatherIcon}.png`:""}},watch:{selectedOption(){this.updateGraphData(),this.chart.update()}},methods:{updateCity(t){this.$store.commit("startLoad"),u(t.cityName,t.countryName).then((t=>{this.currentCard=Object.assign(t[0],{graph:t[1]}),this.$emit("replaceCity",this.currentCard),this.updateGraphData(),this.chart.update(),this.$store.commit("endLoad")}))},updateGraphData(){let t=[];if(this.currentCard.graph?.length)switch(this.selectedOption){case"day":t=this.currentCard.graph.filter((t=>t.label.toDateString()===(new Date).toDateString()));break;case"full_day":t=this.currentCard.graph.filter(((t,e)=>e<8));break;case"week":t=[...this.currentCard.graph]}let e=[],a=[];for(let s of t)e.push(Math.round(s.value)),a.push(s.label.getHours()+":00");this.chartData.datasets[0].data=[...e],this.chartData.labels=[...a],this.chartData.datasets[0].backgroundColor=getComputedStyle(this.$el).getPropertyValue("--color-primary"),this.chartData.datasets[0].borderColor=getComputedStyle(this.$el).getPropertyValue("--color-primary")},renderChart(){if(!this.currentCard.graph)return;const t=this.$refs.chartCanvas.getContext("2d");this.chart=new L.kL(t,{type:"line",data:this.chartData,options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{ticks:{beginAtZero:!0}}}}})}},mounted(){this.updateGraphData(),this.renderChart(),f.$on("updateCardGraphColor",(()=>{s.ZP.nextTick((()=>{this.updateGraphData(),this.chart.update()}))}))}},Q=K,U=(0,S.Z)(Q,x,O,!1,null,"f05a0032",null),X=U.exports,Y=function(){var t=this,e=t._self._c;return t.isActive?e("div",{staticClass:"modal"},[e("div",{staticClass:"modal-content"},[e("p",[t._v(t._s(t.message))]),e("div",{staticClass:"modal-buttons"},[e("button",{staticClass:"button",on:{click:function(e){return t.$emit("closeModal")}}},[t._v(t._s(t.tr("modalButtonCancel")))]),e("button",{staticClass:"button",on:{click:function(e){return t.messageOptions.confirm()}}},[t._v(t._s(t.tr("modalButtonAgree")))])])])]):t._e()},tt=[],et={props:{isActive:Boolean,messageOptions:Object},data(){return{tr:g}},computed:{message(){return this.messageOptions.message?this.tr(this.messageOptions.message):""}}},at=et,st=(0,S.Z)(at,Y,tt,!1,null,"1ef22b20",null),rt=st.exports,it=function(){var t=this,e=t._self._c;return e("div",{staticClass:"empty-block"},[t._v(" "+t._s(t.tr("noItemsInList"))+" ")])},ot=[],nt={data(){return{tr:g}}},ct=nt,lt=(0,S.Z)(ct,it,ot,!1,null,"0c683008",null),dt=lt.exports,ut={components:{EmptyList:dt,ModalConfirm:rt,WeatherCard:X},data(){return{tr:g,defaultCity:{city:"london",country:"uk"},messageOptions:{},showModal:!1,selectedTab:"search"}},methods:{async start(){await this.addNewCity(),await this.$store.dispatch("loadFavorites")},async addNewCity(){navigator.geolocation?await navigator.geolocation.getCurrentPosition((t=>v(t)),(()=>this.$store.dispatch("addCityToSearched",this.defaultCity))):(console.log("Geolocation is not supported by this browser."),await this.$store.dispatch("addCityToSearched",this.defaultCity))},removeCity(t){this.messageOptions={message:"modalMessageDeleteCity",confirm:()=>{this.$store.commit("removeCityFromSearched",t),this.showModal=!1}},this.showModal=!0},removeFavoriteCity(t){this.messageOptions={message:"modalMessageDeleteFavoriteCity",confirm:()=>{this.$store.commit("removeFromFavorite",t),this.showModal=!1}},this.showModal=!0},selectTab(t){t!==this.selectedTab&&(this.selectedTab=t)},replaceCity(t,e){this.$store.commit("replaceCity",{city:t,index:e})}},created(){this.start()}},ht=ut,mt=(0,S.Z)(ht,F,T,!1,null,null,null),pt=mt.exports,vt=function(){var t=this,e=t._self._c;return t.$store.state.isLoading?e("div",{staticClass:"loader-container"},[e("div",{staticClass:"loader"})]):t._e()},ft=[],Ct={},yt=Ct,gt=(0,S.Z)(yt,vt,ft,!1,null,"cf8d1ae8",null),_t=gt.exports,bt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"list"},t._l(t.$store.state.snackbars,(function(t){return e("CustomSnackbar",{key:t.id,attrs:{param:t}})})),1)},kt=[],St=function(){var t=this,e=t._self._c;return e("div",{staticClass:"snackbar",class:{snackbar_success:"success"===t.param.status,snackbar_error:"error"===t.param.status,snackbar_hide:t.hidden}},[e("div",{staticClass:"snackbar__text"},[t._v(t._s(t.tr(t.param.text)))]),e("button",{staticClass:"snackbar__button"},[e("img",{staticClass:"snackbar__image",attrs:{src:a(5289),alt:t.tr("altWeather")},on:{click:t.closeSnackbar}})])])},wt=[],$t={props:{param:{required:!0,type:Object}},data(){return{tr:g,hidden:!1}},computed:{...(0,c.rn)(["showSnackbar","textSnackbar","statusSnackbar"])},methods:{closeSnackbar(){this.hidden=!0,setTimeout((()=>this.$store.commit("removeSnackbar",this.param.id)),300)}},mounted(){setTimeout((()=>{this.closeSnackbar()}),3e3)}},Ft=$t,Tt=(0,S.Z)(Ft,St,wt,!1,null,"23884f36",null),xt=Tt.exports,Ot={components:{CustomSnackbar:xt}},Lt=Ot,Mt=(0,S.Z)(Lt,bt,kt,!1,null,"b48b4cfe",null),Dt=Mt.exports,At={name:"App",components:{CustomLoader:_t,SnackbarList:Dt,MainHeader:$,MainContent:pt},created(){this.$store.commit("loadSettings")}},Zt=At,jt=(0,S.Z)(Zt,r,i,!1,null,"680b88d2",null),Nt=jt.exports;s.ZP.config.productionTip=!1,new s.ZP({store:y,render:t=>t(Nt)}).$mount("#app")},5480:function(t,e,a){t.exports=a.p+"img/close-black.022babc1.svg"},5289:function(t,e,a){t.exports=a.p+"img/close.f623e75c.svg"},5522:function(t,e,a){t.exports=a.p+"img/logo.d18747d0.svg"},8848:function(t,e,a){t.exports=a.p+"img/moon.6393471e.svg"},4355:function(t,e,a){t.exports=a.p+"img/plus.7f8cd44d.svg"},1490:function(t,e,a){t.exports=a.p+"img/star-outline.c184db37.svg"},6338:function(t,e,a){t.exports=a.p+"img/star.e955acfd.svg"},2661:function(t,e,a){t.exports=a.p+"img/sun.4f9afc87.svg"}},e={};function a(s){var r=e[s];if(void 0!==r)return r.exports;var i=e[s]={exports:{}};return t[s](i,i.exports,a),i.exports}a.m=t,function(){var t=[];a.O=function(e,s,r,i){if(!s){var o=1/0;for(d=0;d<t.length;d++){s=t[d][0],r=t[d][1],i=t[d][2];for(var n=!0,c=0;c<s.length;c++)(!1&i||o>=i)&&Object.keys(a.O).every((function(t){return a.O[t](s[c])}))?s.splice(c--,1):(n=!1,i<o&&(o=i));if(n){t.splice(d--,1);var l=r();void 0!==l&&(e=l)}}return e}i=i||0;for(var d=t.length;d>0&&t[d-1][2]>i;d--)t[d]=t[d-1];t[d]=[s,r,i]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var s in e)a.o(e,s)&&!a.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.p=""}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,s){var r,i,o=s[0],n=s[1],c=s[2],l=0;if(o.some((function(e){return 0!==t[e]}))){for(r in n)a.o(n,r)&&(a.m[r]=n[r]);if(c)var d=c(a)}for(e&&e(s);l<o.length;l++)i=o[l],a.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return a.O(d)},s=self["webpackChunkweather"]=self["webpackChunkweather"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=a.O(void 0,[998],(function(){return a(6603)}));s=a.O(s)})();
//# sourceMappingURL=app.1fd6896c.js.map