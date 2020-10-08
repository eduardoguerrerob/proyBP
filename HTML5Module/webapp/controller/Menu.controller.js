sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
    function (Controller, MessageToast) {
        "use strict";

        var PageController = Controller.extend("egb.HTML5Module.controller.Menu", {
            onPressConsulta: function (evt) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteConsultaBP");
            },
            onPressRegistro: function (evt) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteRegistroBP");
            }
        });

        return PageController;
    });