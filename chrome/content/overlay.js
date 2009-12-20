Components.utils.import("resource://app/modules/gloda/public.js"); 
Components.utils.import("resource://app/modules/gloda/log4moz.js");
//Components.utils.import("chrome://alternateview/content/date.js");
//var logger = Log4Moz.repository.getLogger('alternateview');
//logger.info('start');

var alternateview = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("alternateview-strings");
    /*url = "chrome://alternateview/content/alternateview.xul";
    tabmail = document.getElementById("tabmail");
    if (!tabmail) {
      // Try opening new tabs in an existing 3pane window
      mail3PaneWindow = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                                      .getService(Components.interfaces.nsIWindowMediator)
                                      .getMostRecentWindow("mail:3pane");
      if (mail3PaneWindow) {
        tabmail = mail3PaneWindow.document.getElementById("tabmail");
        mail3PaneWindow.focus();
      }
    }

    if (tabmail)
      tabmail.openTab("contentTab", {contentPage: url});
    else
      window.openDialog("chrome://messenger/content/", "_blank",
                        "chrome,dialog=no,all", null,
                        { tabType: "contentTab",
                          tabParams: {contentPage: url} });*/
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
                                
    //First take an email address and turn it into an identity object
      
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    alternateview.onMenuItemCommand(e);    
  },
  
  glodaAction: function(dateArr, dataHandlerFunc) {
      /*id_q=Gloda.newQuery(Gloda.NOUN_IDENTITY);
      id_q.kind("email");
      id_q.value("akhmad.fathonih@mojopia.com");*/
      //logger.info('date', Date.parse('t - 7'));
      
      id_q=Gloda.newQuery(Gloda.NOUN_MESSAGE).dateRange(dateArr);
      //alert(Date.parse('t - 7'));
      id_coll=id_q.getCollection({
          onItemsAdded: function _onItemsAdded(aItems, aCollection) {
          },
          onItemsModified: function _onItemsModified(aItems, aCollection) {
          },
          onItemsRemoved: function _onItemsRemoved(aItems, aCollection) {
          },
          onQueryCompleted: function _onQueryCompleted(id_coll) {
              //woops no identity
              //alert('Collection: ' + id_coll.items.length);
              if (id_coll.items.length <= 0) return;
              
              try {
                      while(msg=id_coll.items.pop()){
                          //do something with the messages here
                          //alert(msg.subject);
                          dataHandlerFunc(msg);
                      }
              } catch (e) {}
                  
              
          },
        })
    }
};

window.addEventListener("load", alternateview.onLoad, false);
