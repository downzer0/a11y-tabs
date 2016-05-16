$(function() {
    var keys = {
        'left':     37,
        'right':    39,
        'down':     40,
        'up':       38
    };
    
    var Tabs = {
        
        init: function() {
            Tabs.resetTabs();
            
            $('.tabs .tab:first').addClass('is-active');
            $('.tab-panel:first').addClass('is-active');
            
            Tabs.keyListener();
            Tabs.clickListener();
        },
        
        resetTabs: function() {
            $('.tabs .tab').each(function(i, el) {
                var tab = $(el);
                
                $(tab).removeClass('is-active').attr({
                    'aria-selected': 'false',
                    'tabindex': '-1'
                });
            });
            
            Tabs.resetTabPanels();
        },
        
        resetTabPanels: function() {
            $('.tab-panel').each(function(i, el) {
                var panel = $(el);
                
                $(panel)
                    .removeClass('is-active')
                    .attr('tabindex', '-1');
            });
        },

        keyListener: function() {
            $('.tabs .tab').on('keydown', function(e) {
                var key = e.which,
                    focused = $(e.currentTarget).parent(),
                    index = $(e.currentTarget).parent().parent().find('.tab-item').index(focused),
                    total = $(e.currentTarget).parent().parent().find('.tab-item').size() - 1,
                    panel = $(focused).attr('aria-controls');
                
                switch (key) {
                    case keys.left:
                    case keys.up:
                        Tabs.previousTab(focused, index, total);
                        break;
                        
                    case keys.right:
                    case keys.down:
                        Tabs.nextTab(focused, index, total);
                        break;
                        
                    default:
                        return true;
                }
            });
        },
        
        clickListener: function() {
            $('.tabs .tab').on('click', function(e) {
                var tab = $(e.currentTarget),
                    panel = $(tab).attr('aria-controls');

                Tabs.resetTabs();
                Tabs.activateTab(tab, panel);
            });
        },
        
        previousTab: function(focused, index, total) {
            event.preventDefault();
            
            var tab, panel;

            if (event.altKey || event.shiftKey) {
                return true;
            }

            if (index === 0) {
                tab = $(focused).parent().parent().find('.tab-item').last().find('.tab');
                panel = $(tab).attr('aria-controls');
                
            } else {
                tab = $(focused).parent().parent().find('.tab-item:eq(' + index + ')').prev().find('.tab');
                panel = $(tab).attr('aria-controls');
            }
            
            tab.focus();
            Tabs.activateTab(tab, panel);

            return false;
        },
        
        nextTab: function(focused, index, total) {
            event.preventDefault();

            var tab, panel;

            if (event.altKey || event.shiftKey) {
                return true;
            }

            if (index === total) {
                tab = $(focused).parent().parent().find('.tab-item').first().find('.tab');
                panel = $(tab).attr('aria-controls');
                
            } else {
                tab = $(focused).parent().parent().find('.tab-item:eq(' + index + ')').next().find('.tab');
                panel = $(tab).attr('aria-controls');
            }
            
            tab.focus();
            Tabs.activateTab(tab, panel);
            
            return false;
        },
        
        activateTab: function(tab, panel) {
            Tabs.resetTabs();
            Tabs.activateTabPanel(panel);
            
            $(tab)
                .addClass('is-active')
                .attr({
                    'aria-selected': 'true',
                    'tabindex': '0'
                });
        },
        
        activateTabPanel: function(panel) {
            Tabs.resetTabPanels();
            $('#' + panel).addClass('is-active');
        }
    };
    
    Tabs.init();
});
