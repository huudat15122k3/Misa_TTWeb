$(document).ready(function() {
    //Thu gọn sidebar
    function collapse() {
        const $sidebar = $('#m-sidebar');
        const $content = $('#m-main-content');
        const $btn = $('#m-back-btn-icon');
        
        $sidebar.toggleClass('collapsed');
        $content.toggleClass('collapsed');

        if ($sidebar.hasClass('collapsed')) {
            $btn.removeClass('left').addClass('right');
        } else {
            $btn.removeClass('right').addClass('left');
        }
    }
    $('#collapse-button').on('click', collapse);
})