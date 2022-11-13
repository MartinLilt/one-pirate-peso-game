import { $wnd } from './_utility';

/* Bootstrap Tabs */
function initPluginTabs() {
    const self = this;
    $wnd.on('shown.bs.tab', () => {
        self.debounceResize();
    });
}

export { initPluginTabs };
