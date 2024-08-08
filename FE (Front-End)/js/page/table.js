$(document).ready(function() {
    $("#m-checkboxfirts").on('change',function(){
        $(".m-sub-checkbox").prop('checked', this.checked);
    })
    $("#btn-page").on('click',function(){
        $("#m-comboboxValues").toggle();

    })
    $("#m-comboboxValues a").click(function(event) {
        event.preventDefault();
        let seletedValue = $(this).find('p').text();
        $("#btn-page p").text(seletedValue)
        $("#m-comboboxValues a").removeClass("active");
        $(this).addClass("active");
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest("#m-comboboxValues, #btn-page").length) {
            $("#m-comboboxValues").hide();
        }
    });

  
    $(document).on('mouseenter', '.m-table tbody tr', function() {
        $(this).find('.row-btn').css('display', 'flex'); 
    });
    $(document).on('mouseleave', '.m-table tbody tr', function() {
        $(this).find('.row-btn').css('display', 'none');
    });
    
})