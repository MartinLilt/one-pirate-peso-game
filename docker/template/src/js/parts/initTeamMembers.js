import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/
function initTeamMembers() {
    const $teamMembers = $('.nk-team-member');

    // add hover classname
    $teamMembers.on('mouseover', '.nk-team-member-photo, .nk-team-member-info', function onTeamMembersMouseOver() {
        $(this).parents('.nk-team-member:eq(0)').addClass('hover');
    }).on('mouseleave', '.nk-team-member-photo, .nk-team-member-info', function onTeamMembersMouseLeave() {
        $(this).parents('.nk-team-member:eq(0)').removeClass('hover');
    });
}

export { initTeamMembers };
