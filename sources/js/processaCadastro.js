$(function() {

    function redirect(url){
        window.location = url;
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
            var email = $("input#email").val();
            var empresa = $("input#empresa").val();
            var cidade = $("input#cidade").val();
            var telefone = $("input#telefone").val();
            var whatsapp = $("input#whatsapp").val();
            var tipo = $("input#tipo").val();

            var firstName = nome; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = nome.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "../assets/php/processaCadastro.php",
                type: "POST",
                data: {
                    nome : nome,
                    email : email,
                    empresa : empresa,
                    cidade : cidade,
                    telefone : telefone,
                    whatsapp : whatsapp,
                    tipo : tipo
                },
                cache: false,
                beforeSend: function(){
                    //console.log(data);

                    $('.load').show();
                    //$('#cadastro').fadeOut(300);
                },
                success: function(data) {
                    console.log(data);
                    if(tipo == 'empresas'){
                        var url = 'http://www.kitalimentacao.com.br/obrigado-empresas/';
                    } else if (tipo == 'revenda') {
                        var url = 'http://www.kitalimentacao.com.br/obrigado-revenda/';
                    }
                    window.setTimeout(redirect(url), 10000);
                },
                error: function(e) {
                    console.log(e);
                    // Fail message
                    window.alert('Ocorreu um Erro! Tente novamente.');                    
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
