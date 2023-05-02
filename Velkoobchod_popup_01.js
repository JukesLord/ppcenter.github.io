
if (zakaznikId2 == 18){
    $("body").prepend('<div class="velkoobchod-popup"><p>Pro velkoobchodní odběratele jsme připravili nové rozhraní. Na tomto e-shopu už uvidíte pouze maloobchodní ceny.</p><p>Pro nákup se přihlaste na <a href="https://b2b.ppcentershop.cz/prihlaseni/">b2b.ppcentershop.cz.</a></p><p>*Při prvním přihlášení je z bezpečnostních důvodů zapotřebí vytvořit nové heslo. Stránka vás k tomuto kroku automaticky navede.</p><button class="prejitNaVelkoobchod">Přejít na B2B</button><button class="zavritPopup">Zavřít</button></div>');
    $(".velkoobchod-popup").show();
    $(".zavritPopup").on("click", function() {
      $(".velkoobchod-popup").hide();
      });
     $(".prejitNaVelkoobchod").click(function(){
      document.location.href="https://b2b.ppcentershop.cz/prihlaseni/";
    });
}
