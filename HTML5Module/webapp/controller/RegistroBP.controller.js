// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, History) {
        "use strict";
 
        return Controller.extend("egb.HTML5Module.controller.RegistroBP", {
            onInit: function () {
 
            },
 
            validate: function () {
                var email = this.getView().byId("txt_email").getValue();
                var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                if (!mailregex.test(email)) {
                    alert(email + " Email no valido");
                    this.getView().byId("txt_email").setValueState(sap.ui.core.ValueState.Error);
                }
            },
            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
 
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteLogin", true);
                }
            }
        });
    });