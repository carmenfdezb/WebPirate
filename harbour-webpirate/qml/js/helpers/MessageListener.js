var __wp_messagedispatcher__  = {
    "textfield_override": function() { __wp_systemtextfield__.overrideEnabled = true; },
    "nightmode_enable": function() { __wp_nightmode__.switchMode(true); },
    "nightmode_disable": function() { __wp_nightmode__.switchMode(false); },
    "notification_granted": function() { window.Notification.permission = window.Notification.__WP_PERMISSION_GRANTED__; },
    "notification_denied": function() { window.Notification.permission = window.Notification.__WP_PERMISSION_DENIED__; },
    "notification_default": function() { window.Notification.permission = window.Notification.__WP_PERMISSION_DEFAULT__; } };

navigator.qt.onmessage = function(message) {
    var messagehandler = __wp_messagedispatcher__[message.data];

    if(messagehandler) {
        messagehandler();
        return;
    }

    try {
        var obj = JSON.parse(message.data);

        if(obj.type === "textfield_sendedit")
            __wp_systemtextfield__.sendEdit(obj.id, obj.text, obj.selectionstart, obj.selectionend);
        else if(obj.type === "textfield_canceledit")
            __wp_systemtextfield__.cancelEdit(obj.id);
        else if(obj.type === "apply_blacklist")
            __wp_ajaxoverrider__.applyBlackList(obj.blacklist);
    }
    catch(e) { // Catch SyntaxError
        return;
    }
}
