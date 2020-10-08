sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("egb.HTML5Module.controller.Login", {
            onInit: function () {

            },
            onLogin: function () {
                //Ontener el valor de las cajas de texto   
                var txt_user = this.getView().byId("txt_user").getValue().toUpperCase();
                var txt_password = this.getView().byId("txt_password").getValue();

                const usuario = 'EGB',
                    password = '12345';

                if (txt_user == '' || txt_password == '') {
                    MessageBox.error("Ingrese Usuario y/o Password.");
                } else if (txt_user == usuario && txt_password == password) {
                    MessageBox.success("Bienvenido Gestión de Proveedores.");
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteMenuBP");

                } else {
                    MessageBox.error("Credenciales Invalidas.");
                }

            }
        });
    });