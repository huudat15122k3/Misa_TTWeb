$(document).ready(function() {
    $("#m-checkboxfirts").on('change',function(){
        $(".m-sub-checkbox").prop('checked', this.checked);
    })
    $("#btn-page").on('click',function(){
        $("#m-comboboxValues").show();
    })
    $(document).on('click', function(event) {
        if (!$(event.target).closest("#m-comboboxValues, #btn-page").length) {
            $("#m-comboboxValues").hide();
        }
    });
    // $(".m-table tbody tr").on('click',function(){
    //     $("#overlay").fadeIn(300);
    // })
  
    $(document).on('mouseenter', '.m-table tbody tr', function() {
        $(this).find('.row-btn').css('display', 'flex'); 
    });
    $(document).on('mouseleave', '.m-table tbody tr', function() {
        $(this).find('.row-btn').css('display', 'none');
    });
    
})