sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/ui/core/routing/History"
],

    function (Controller, History) {
        "use strict";

        //variables globales
        var globalBP;
        var globalAddressID;

        return Controller.extend("egb.HTML5Module.controller.DetailBP", {


            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteDetailBP").attachMatched(this._onRouteMatched, this);

                globalBP = "";
                globalAddressID = "";
            },

            _onRouteMatched: function (oEvent) {
                //console.log(oEvent.getParameter("arguments").BPartner); // si que quita BPartner trae todo el JSON

                globalBP = oEvent.getParameter("arguments").BPartner;

                var data = null,
                    that = this,
                    objEmail,
                    oModelEmail;

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = false;

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {

                        var data = null;
                        var xhr = new XMLHttpRequest();

                        xhr.withCredentials = false;

                        //Resultado Emails
                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === this.DONE) {
                                //LLenar informacion email
                                oModelEmail = that.getView().getModel("ModelEmail"); //Modelo Json vacio creado en manifest
                                objEmail = JSON.parse(this.response);
                                oModelEmail.setProperty("/ModelEmail", objEmail);
                            }
                        });

                        //API endpoint for API sandbox 
                        var obj = JSON.parse(this.responseText);
                        var resultAddress = obj.d.results[0];   ////???????????????????????????????????????????????????????

                        xhr.open("get", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerAddress(BusinessPartner='" + resultAddress.BusinessPartner + "',AddressID='" + resultAddress.AddressID + "')/to_EmailAddress");

                        //llenar variables globales de BP y su addressID
                        globalBP = resultAddress.BusinessPartner;
                        globalAddressID = resultAddress.AddressID;

                        //adding request headers
                        xhr.setRequestHeader("Accept", "application/json");
                        //API Key for API Sandbox
                        xhr.setRequestHeader("APIKey", "UbOOxjbcQgpiq2VuBzUAHQCTOsbyD11d");

                        //sending request
                        xhr.send(data);
                    }
                });

                //setting request method
                //API endpoint for API sandbox 
                xhr.open("get", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('" + oEvent.getParameter("arguments").BPartner + "')/to_BusinessPartnerAddress");

                //adding request headers
                xhr.setRequestHeader("Accept", "application/json");
                //API Key for API Sandbox
                xhr.setRequestHeader("APIKey", "UbOOxjbcQgpiq2VuBzUAHQCTOsbyD11d");


                //sending request
                xhr.send(data);

            },

            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteMenu", true);
                }
            }
            ,

            onFilterDetail: function (oEvent) {
                var sKey = oEvent.getParameter("key");

                console.log(sKey);

                switch (sKey) {
                    case "keyMail":
                        console.log("opción Mail")
                        break;
                    case "keyAddress":
                        this.consultarAddressBP(globalBP, globalAddressID);
                        break;
                    case "keyPhone":
                        console.log("opción Phone")
                        break;
                }

            },

            //funcion para consultar direcciones del BP
            consultarAddressBP: function (inputBPartner, inputAddressID) {
                var data = null;
                var oModelAddress;
                var objAddress;
                var that = this;

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = false;

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {
                        oModelAddress = that.getView().getModel("ModelAddress"); //Modelo Json vacio creado en manifest
                        objAddress = JSON.parse(this.response);
                        oModelAddress.setProperty("/ModelAddress", objAddress);
                    }
                });


                xhr.open("get", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerAddress(BusinessPartner='" + inputBPartner + "',AddressID='" + inputAddressID + "')");

                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("APIKey", "hIA7bcR8Df8lrosm97qNeIuY3JeqacMN");

                xhr.send(data);
            }


        });


    });