$(function() {

    function redirect(){
        window.location = 'http://www.kitalimentacao.com.br/obrigado/';
    }

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events

        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM

            var nome = $("input#nome").val();
            var whatsapp = $("input#whatsapp").val();

            var firstName = nome; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = nome.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "../sources/php/processaCadastro.php",
                type: "POST",
                data: {
                    nome : nome,
                    whatsapp : whatsapp
                },
                cache: false,
                beforeSend: function(data){
                    console.log(data);

                    $('.load').show();
                    $('#cliqueCadastrar').fadeOut(300);
                },
                success: function(data) {
                    console.log(data);

                    //alert('ok');

                    window.setTimeout(redirect, 1000);

                    //clear all fields
                    //$('#contactForm').trigger("reset");
                    
                },
                error: function(data) {
                    console.log(data);
                    // Fail message
                    
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Desculpe " + firstName + ", tivemos algum problema :( tente novamente!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    //$('#contactForm').trigger("reset");
                    
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
