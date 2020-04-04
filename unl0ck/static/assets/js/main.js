$(document).ready(function() {
	
    /* ===== Stickyfill ===== */
    /* Ref: https://github.com/wilddeer/stickyfill */
    // Add browser support to position: sticky
    var elements = $('.sticky');
    Stickyfill.add(elements);


    /* Activate scrollspy menu */
    $('body').scrollspy({target: '#doc-menu', offset: 100});
    
    /* Smooth scrolling */
	$('a.scrollto').on('click', function(e){
        //store hash
        var target = this.hash;    
        e.preventDefault();
		$('body').scrollTo(target, 800, {offset: 0, 'axis':'y'});
		
	});
     
    /* Bootstrap lightbox */
    /* Ref: http://ashleydw.github.io/lightbox/ */

    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });    

    $('#displayText').hide()
    $('#loader').hide()

    
    $('#userCode').on('keyup', e => {
      if(e.keyCode === 13){
        processData()
      }
    })
    

    $('#searchBtn').click(() => {
      processData()
    })


    const processData = () => {
      let userCode = $('#userCode').val().trim()
      if (userCode.length !== 4){
        swal('Invalid Code Length', '', 'warning')
        return
      }

      // validating user input
      let re = /^(([a-fA-F0-9]))+$/;
      

      if (!re.test(String(userCode).toLowerCase())){
        swal('Invalid Input', '', 'warning')
        return
      }

      userCode = userCode.toUpperCase()

      $('#loader').show()
      $('#searchBtn').hide()
      $('#searchBtn').attr('disabled', 'disabled')
      $.get('/unlock', { 'userCode': userCode }, data => {
        if(data && data.status){
          $('#displayText').show()
          $('#displayText').html(data.message)
        }else{
          swal('Error', data.message, 'error')
        }
        $('#loader').hide()
        $('#searchBtn').show()
        $('#searchBtn').removeAttr('disabled')
      })
    }
});
