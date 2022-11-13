/* FastClick */
function initPluginFastClick() {
    if (typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
    }
}

export { initPluginFastClick };
