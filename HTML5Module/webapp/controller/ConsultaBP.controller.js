sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/Device',
    'sap/ui/model/Filter',
    'sap/ui/model/Sorter',
    'sap/m/Menu',
    'sap/m/MenuItem',
    "sap/ui/core/routing/History"
],
    /**
         * @param{typeof sap.ui.core.mvc.Controller}Controller
         */
    function (Controller, JSONModel, Device, Filter, Sorter, Menu, MenuItem, History) {
        "use strict";

        return Controller.extend("egb.HTML5Module.controller.ConsultaBP", {
            onInit: function () {
                var data = null,
                    that = this;

                this.mGroupFunctions = {
                    CreatedByUser: function (oContext) {
                        var name = oContext.getProperty("CreatedByUser");
                        return {
                            key: name,
                            text: name
                        };
                    }

                };
                this._mViewSettingsDialogs = {};
                // set data model on view
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = false;

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {
                        var json = JSON.parse(this.response);
                        that.oModel = new JSONModel(json);
                        that.getView().setModel(that.oModel);
                    }
                });

                //setting request method
                //API endpoint for API sandbox 
                xhr.open("get", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner");

                //API endpoint with optional query parameters
                //xhr.open("get", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner?$top=integer&$skip=integer");
                //To view the complete list of query parameters, see its API definition.

                //Available API Endpoints
                //https://{host}:{port}/sap/opu/odata/sap/API_BUSINESS_PARTNER

                //adding request headers
                xhr.setRequestHeader("Accept", "application/json");
                //API Key for API Sandbox
                xhr.setRequestHeader("APIKey", "hIA7bcR8Df8lrosm97qNeIuY3JeqacMN");

                //Available Security Schemes for productive API Endpoints
                //Basic Authentication

                //Basic Auth : provide username:password in Base64 encoded in Authorization header
                //xhr.setRequestHeader("Authorization", "Basic <Base64 encoded value>");

                //sending request
                xhr.send(data);

            },
            createViewSettingsDialog: function (sDialogFragmentName) {
                var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];

                if (!oDialog) {
                    oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
                    this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

                    if (Device.system.desktop) {
                        oDialog.addStyleClass("sapUiSizeCompact");
                    }
                }
                return oDialog;
            },
            handleSortButtonPressed: function () {
                this.createViewSettingsDialog("egb.HTML5Module.fragment.SortDialog").open();
            },
            handleSortDialogConfirm: function (oEvent) {
                var oTable = this.byId("idConsultaBP"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    bDescending,
                    aSorters = [];

                sPath = mParams.sortItem.getKey();
                bDescending = mParams.sortDescending;
                aSorters.push(new Sorter(sPath, bDescending));

                // apply the selected sort and group settings
                oBinding.sort(aSorters);
            },

            handleFilterButtonPressed: function () {
                this.createViewSettingsDialog("egb.HTML5Module.fragment.FilterDialog").open();
            },

            handleGroupButtonPressed: function () {
                this.createViewSettingsDialog("egb.HTML5Module.fragment.GroupDialog").open();
            },

            handleFilterDialogConfirm: function (oEvent) {
                var oTable = this.byId("idConsultaBP"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    aFilters = [];

                //   sap.ui.getCore().byId("ApprovalInput"); 
                //  var 1 = (this.FilterDialog = sap.ui.xmlfragment("frgSearchHelpDialog", "Demo.view.SearchHelpDialog",this);) 
                // sap.ui.core.Fragment.byId("frgSearchHelpDialog", "ApprovalInput");

                var user = sap.ui.core.fragment.byId("fr1", "__field2-I");

                var prueba = this.getView().byId("vsdFilterLabel").getValue();

                mParams.filterItems.forEach(function (oItem) {
                    var aSplit = oItem.getKey().split("___"),
                        sPath = aSplit[0],
                        sOperator = aSplit[1],
                        sValue1 = aSplit[2],
                        sValue2 = aSplit[3],
                        oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
                    aFilters.push(oFilter);
                });

                // apply filter settings
                oBinding.filter(aFilters);

                // update filter bar
                this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
                this.byId("vsdFilterLabel").setText(mParams.filterString);
            },

            handleGroupDialogConfirm: function (oEvent) {
                var oTable = this.byId("idConsultaBP"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    bDescending,
                    vGroup,
                    aGroups = [];

                if (mParams.groupItem) {
                    sPath = mParams.groupItem.getKey();
                    bDescending = mParams.groupDescending;
                    vGroup = this.mGroupFunctions[sPath];
                    aGroups.push(new Sorter(sPath, bDescending, vGroup));
                    // apply the selected group settings
                    oBinding.sort(aGroups);
                }
            },

            OnDetail: function (oEvent) {
                // Obtiene el valor seleccionado de la tabla 
                var BPartner = oEvent.getSource().getBindingContext().getProperty("BusinessPartner"); 
                
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteDetailBP",{
                        BPartner: BPartner
                     });
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

        });
    });