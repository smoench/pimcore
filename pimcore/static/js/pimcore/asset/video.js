/**
 * Pimcore
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2009-2010 elements.at New Media Solutions GmbH (http://www.elements.at)
 * @license    http://www.pimcore.org/license     New BSD License
 */

pimcore.registerNS("pimcore.asset.video");
pimcore.asset.video = Class.create(pimcore.asset.asset, {

    type: "video",

    initialize: function(id) {

        this.setType("video");

        pimcore.plugin.broker.fireEvent("preOpenAsset", this, "video");

        this.addLoadingPanel();
        this.id = parseInt(id);

        this.properties = new pimcore.settings.properties(this, "asset");
        this.versions = new pimcore.asset.versions(this);
        this.scheduler = new pimcore.settings.scheduler(this, "asset");
        this.permissions = new pimcore.asset.permissions(this);
        this.dependencies = new pimcore.settings.dependencies(this, "asset");

        this.getData();
    },

    getTabPanel: function () {
        var items = [];

        items.push(this.getEditPanel());

        if (this.isAllowed("properties")) {
            items.push(this.properties.getLayout());
        }
        if (this.isAllowed("versions")) {
            items.push(this.versions.getLayout());
        }
        if (this.isAllowed("settings")) {
            items.push(this.scheduler.getLayout());
        }
        if (this.isAllowed("permissions")) {
            items.push(this.permissions.getLayout());
        }
        items.push(this.dependencies.getLayout());

        this.tabbar = new Ext.TabPanel({
            tabPosition: "top",
            region:'center',
            deferredRender:true,
            enableTabScroll:true,
            border: false,
            items: items,
            activeTab: 0
        });

        return this.tabbar;
    },

    getEditPanel: function () {

        if (!this.editPanel) {

            this.editPanel = new Ext.Panel({
                title: t("preview"),
                html: '<iframe src="/admin/asset/get-preview-video/id/' + this.id + '/" frameborder="0" id="asset_video_edit_' + this.id + '"></iframe>',
                iconCls: "pimcore_icon_tab_edit"
            });
            this.editPanel.on("resize", function (el, width, height, rWidth, rHeight) {
                Ext.get("asset_video_edit_" + this.id).setStyle({
                    width: width + "px",
                    height: (height) + "px"
                });
            }.bind(this));
        }

        return this.editPanel;
    }
});

