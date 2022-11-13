import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/
function initBlog() {
    const $blogList = $('.nk-blog-list');

    // add hover classname
    $blogList.on('mouseover', '.nk-blog-post .nk-post-thumb, .nk-blog-post .nk-post-content', function onBlogListMouseOver() {
        $(this).parents('.nk-blog-post:eq(0)').addClass('hover');
    }).on('mouseleave', '.nk-blog-post .nk-post-thumb, .nk-blog-post .nk-post-content', function onBlogListMouseLeave() {
        $(this).parents('.nk-blog-post:eq(0)').removeClass('hover');
    });
}

export { initBlog };
