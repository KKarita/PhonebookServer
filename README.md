Liitteenä on lähtötilanne eli puhelinluettelo sovellus koostuu serveristä ja clientista. Serveri pitää asentaa ja käynnistää ohjeiden mukaiseti (ohjeet server -hakemistossa). Sen jälkeen tarkastele tiedostoa lomake.html Live serverissä (tai laajennuksessa Visual Studio Codessa).

Tehtäväsi on lisätä muokkaus -ominaisuus taulukkoon eli lisää sarake muokkaus ja sinne painikkeet joka tietueeseen josta ko. henkilön puhelinnumeroa voidaan muokata. Muokattu puhelinnumero tallennetaan serveriin eli joudut luomaan fetch kutsun jossa käytät http -metodia PUT.

Käyttöliittymän voit kehittää itse (ts. voit päättää mitä kontrolleja käytät). Kuitenkin taulukko, jossa on listattu kaikki puhelinluettelon henkilöt, sisältäisi sarakkeen jossa on painike muokkausta varten eli katso alla oleva kuva:

Kun klikkaa valitun henkilön rivin kohdalta Muokkaa -painiketta, pitää johonkin avata tieto ko. henkilön puhelinnumerosta ja sen jälkeen on pystyttävä muokkaamaan ko. puhelinnumeroa kirjoittamalla uusi puhelinnumero ja esim. painiketta klikkaamalla tallentaa puhelinnumero serverin tietokantaan (db.json -tiedostoon).
