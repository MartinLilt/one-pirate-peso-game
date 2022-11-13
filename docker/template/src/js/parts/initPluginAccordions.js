import { $wnd } from './_utility';

/* Bootstrap Accordions */
function initPluginAccordions() {
    const self = this;
    $wnd.on('shown.bs.collapse', () => {
        self.debounceResize();
    });
}

export { initPluginAccordions };
