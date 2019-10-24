// Iterate over each select element
 


$('select').each(function () {
// Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;
    var fopt = $this.children('option').eq(0).text();

    // Hides the select element
    $this.addClass('s-hidden');

    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');

    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');

    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');

    // Show the first select option in the styled div
    //$styledSelect.text($this.children('option').eq(0).text());

    var not_selected_option = $this.children('option').eq(0).text();
    var selected_option = $($this.children('option:selected')).text();
    console.log(not_selected_option);
    //$styledSelect.text(selected_option);

    if($this.children('option').is('[selected]')){
        //console.log("hi");
        $styledSelect.text(selected_option);
    }
    else{

        //console.log("NO");
        $styledSelect.text(not_selected_option);
    }


  

   // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);

    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    // Cache the list items
    var $listItems = $list.children('li');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.styledSelect.active').each(function () {
            $(this).removeClass('active').next('ul.options').hide();
        });
        $(this).toggleClass('active').next('ul.options').toggle();



        // $(this).children('option').on('change', function () {
        //    console.log("hkg")
        // });

        if($(this).text()===not_selected_option){
            $(this).css({'color':'#9fa5a5'})
        }

    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        $styledSelect.css({'color':'black'});

        if($styledSelect.text()==fopt){
            $styledSelect.css({'color':'#9fa5a5'})
        }
        /* alert($this.val()); Uncomment this for demonstration! */
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});












