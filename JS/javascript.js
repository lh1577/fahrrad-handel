var y = 0;
var x;
var cart = [];
var cache = {};
var quizda = 0;
var richtigfrage = [];
var quizes = []
function sendRequest(url, callback) {
    if (cache[url] == null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                cache[url] = xhttp.responseText;
                callback(xhttp.responseText);
            }
        };
        xhttp.open("GET", url, "True");
        xhttp.send();
    }
    else {
        callback(cache[url]);
    }
}
loadanypage(5);
function onFahrraederLoaded(fahrraeder) {
    for (var i = 0; i < fahrraeder.length; i++) {
        var head_f = document.createElement("h1")
        var inhead_f = document.createTextNode(fahrraeder[i].name);
        head_f.appendChild(inhead_f);
        var unorli = document.createElement("ul");
        unorli.classList.add("unorli_")
        var listi1 = document.createElement("li");
        var listitem1 = document.createTextNode(fahrraeder[i].beschreibung);
        listi1.appendChild(listitem1);
        listi1.classList.add("li_")
        var listi2 = document.createElement("li");
        var listitem2 = document.createTextNode(fahrraeder[i].preis)
        listi2.appendChild(listitem2);
        listi2.classList.add("li_")
        var listi3 = document.createElement("li");
        var listitem3 = document.createTextNode(fahrraeder[i].artikelNr);
        listi3.appendChild(listitem3);
        listi3.classList.add("li_")
        var but = document.createElement("button");
        var val = document.createTextNode("Angucken");
        but.appendChild(val);
        but.classList.add("button_main")
        but.artikelNr = fahrraeder[i].artikelNr;
        but.onclick = buttonclick;
        var but1 = document.createElement("button")
        but1.classList.add("button_main")
        var but1in = document.createTextNode("Hinzufügen")
        but1.appendChild(but1in);
        but1.onclick = warehin;
        but1.artikelNr = fahrraeder[i].artikelNr;
        var fiv = document.createElement("div")
        fiv.classList.add("fiv")
        fiv.appendChild(but);
        fiv.appendChild(but1);



        var img = document.createElement("img");
        img.src = fahrraeder[i].imageUrl;
        var para = document.createElement("p");
        para.appendChild(img);
        para.classList.add("para_")
        var element = document.getElementById("fahrradList");
        var divi = document.createElement("div");
        divi.classList.add("fivi")


        element.appendChild(divi);
        divi.appendChild(para)
        para.appendChild(head_f);
        para.appendChild(unorli);
        unorli.appendChild(listi1);
        unorli.appendChild(listi2);
        unorli.appendChild(listi3);
        para.appendChild(fiv)



    }
}
function onfahrraederdetailloaded(fd) {
    var h = document.getElementById("fdh1").innerHTML = fd.name;
    var p = document.getElementById("para").innerHTML = fd.beschreibung;
    var im = document.getElementById("imag").src = fd.imageUrl;
    var hu = document.getElementById("fdh11").innerHTML = fd.name;
    var l1 = document.getElementById("li1").innerHTML = "ArtikelNr = " + fd.artikelNr;
    var l2 = document.getElementById("li2").innerHTML = "Preis = " + fd.preis;
    var l3 = document.getElementById("li3").innerHTML = "Größe = " + fd.groesse;
    var l4 = document.getElementById("li4").innerHTML = "Gewicht = " + fd.gewicht;
    var l5 = document.getElementById("li5").innerHTML = "Hersteller = " + fd.hersteller;
}
function loadanypage(a, mouseEvent) {
    sendRequest("data/site.json", function (data) {
        var urlInfos = JSON.parse(data);
        mainsiteload(urlInfos)
    })
    function mainsiteload(urlInfos) {
        sendRequest("html/" + urlInfos[a].url, function (data) {
            var sitehtml = data;
            document.getElementById("mainsite").innerHTML = sitehtml;
            if (a === 5) {
                loadfahrraederlist();
            }
            if (a === 6) {
                warenkorb(mouseEvent);
            }
        })
    }
}
function buttonclick(mouseEvent) {
    sendRequest("html/fahrraddetail.html", function (data) {
        var loadhtml = data;
        document.getElementById("mainsite").innerHTML = loadhtml;
        detailloaded(mouseEvent);
    })
}
function quizload() {
    sendRequest("data/quizfrage.json", function (data) {
        var loadquestion = JSON.parse(data)
        document.getElementById("quizsite").innerHTML = "";
        quizes.push(loadquestion)

        quizshow(loadquestion)


    })

}
function quizshow(a) {

    var lastQuestion = null;
    for (var i = y; i < a.length; i++) {
        lastQuestion = createQuestion(a[i]);
    }

   

    function createQuestion(a) {
        var elem = document.getElementById("quizsite");
        var fr = document.createElement("h1")
        var frin = document.createTextNode(a.F)
        var diva = document.createElement("div")
        diva.classList.add("diva_")
        var dil = document.createElement("div")
        dil.classList.add("dil")
        var a1 = document.createElement("button");
        var a1in = document.createTextNode(a.A1)
        a1.classList.add("buttonmain")

        a1.onclick = function (event) {
            antwert(event, a, a.A1);
        };
        var a2 = document.createElement("button");
        var a2in = document.createTextNode(a.A2)
        a2.classList.add("buttonmain")
        a2.onclick = function (event) {
            antwert(event, a, a.A2);
        };
        var a3 = document.createElement("button");
        var a3in = document.createTextNode(a.A3)
        a3.classList.add("buttonmain")
        // a3.onclick=antwert(a[i].FA3)

        a3.onclick = function (event) {
            antwert(event, a, a.A3);
        };
        a1.appendChild(a1in)
        a2.appendChild(a2in)
        a3.appendChild(a3in)
        diva.appendChild(a1)
        diva.appendChild(a2)
        diva.appendChild(a3)



        fr.appendChild(frin);
        dil.appendChild(fr);
        dil.appendChild(diva)



        elem.appendChild(dil)
        return elem;
    }
}

function antwert(event, frage, selectedAnswer) {
    var eleme = document.getElementById("quiz")
    if (frage.correctAnswer == selectedAnswer) {
        var ph1in = document.createTextNode("RICHTIG!!!")
        var ph1 = document.createElement("h1")
        ph1.classList.add("ph1_correct")
        richtigfrage.push(1);


    }
    else {
        var ph1in = document.createTextNode("FALSCH!!!")
        var ph1 = document.createElement("h1");
        ph1.classList.add("ph1_wrong")

    }
    var pop = document.createElement("div")
    pop.classList.add("pop")
    var bim = document.createElement("div")
    bim.classList.add("bim")
    var pbut = document.createElement("button")
    var pbutin = document.createTextNode("Schließen")
    var bes = document.createElement("p")
    var besin = document.createTextNode(frage.B)
    bes.classList.add("bes")
    var pim = document.createElement("img")
    pim.src = frage.U
    var p1im = document.createElement("img")
    p1im.src = frage.U1
    bes.appendChild(besin)
    pbut.onclick = closeantwert;
    pbut.classList.add("pbut")
    pbut.appendChild(pbutin)
    ph1.appendChild(ph1in)
    bim.appendChild(bes)
    bim.appendChild(pim)
    bim.appendChild(p1im)


    pop.appendChild(ph1)
    pop.appendChild(pbut)
    pop.appendChild(bim)

    eleme.appendChild(pop);

}
function closeantwert() {
    y++
    document.getElementById("quiz").innerHTML = "";
    document.getElementsByClassName("dil").innerHTML = "";
    quizload()
    
}
function showresult() {

    var elemem = document.getElementById("quiz");
    var divhole = document.createElement("div");
    divhole.classList.add("q");


    var dic = document.createElement("div")
    dic.classList.add("diiic")
    diic = document.createElement("div")
    dic.classList.add("d_")
    var head1 = document.createElement("h1");
    head1.classList.add("heedi")
    var head1in = document.createTextNode("Das Resultat")

    var but = document.createElement("button");
    but.classList.add("buuut")
    var butin = document.createTextNode("Startseite")
    but.appendChild(butin)
    but.onclick = function () {
        y = 0;    
        loadanypage(5);
    }
    

    var p = document.createElement("p");
    p.classList.add("respa")
    head1.appendChild(head1in);
    dic.appendChild(head1);
    if (richtigfrage.length == 0) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  sind sie besonders schlecht. Sie sollten ihr Allgemeinwissen auffrischen!!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 1) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie nicht im Durschnitt. Sie sollten ihr Allgemeinwissen auffrischen!!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 2) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie nicht im Durschnitt. Sie sollten ihr Allgemeinwissen auffrischen!!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 3) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie nicht im Durschnitt. Sie sollten ihr Allgemeinwissen auffrischen!!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 4) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie fast Durschnitt. Sie können stolz sein!!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 5) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie im Durschnitt. Sie können stolz sein !!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 6) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie knapp über dem Durschnitt.Sie haben ein gutes Allgemeinwissen !!") 
        p.appendChild(pin);
    }
    if (richtigfrage.length == 7) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie etwas über dem Durschnitt.Sie heben sich von den anderen ab .!!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 8) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie deutlich über dem Durschnitt. Respekt ihre Punktzahle erreichen nur sehr wenige Personen.!!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 9) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie deutlich über dem Durschnitt. Da kennt sich aber jemand sehr gut aus.!!")
        p.appendChild(pin);
    }
    if (richtigfrage.length == 10) {
        var pin = document.createTextNode("Wow sie haben " + richtigfrage.length + " Fragen Richtig beantwortet. Mit einer Punktzahle von " + richtigfrage.length + "  liegen sie deutlich über dem Durschnitt. Vor dem Computer sitzt wohl ein Fahrradexperte (oder eine Person mit viel Glück).!!")
        p.appendChild(pin);
    }

    diic.appendChild(p);
    dic.appendChild(diic);
    dic.appendChild(but);
    dic.appendChild(divhole)
    elemem.appendChild(dic);
    


}
function detailloaded(mouseEvent) {
    sendRequest("fahrraeder/artikelNr" + mouseEvent.target.artikelNr + ".json", function (data) {
        var loadartikel = JSON.parse(data);
        onfahrraederdetailloaded(loadartikel);
    })
}

function loadfahrraederlist() {
    sendRequest("data/fahrraeder-list.json", function (data) {
        var pagel = JSON.parse(data);
        onFahrraederLoaded(pagel)
    })
}
function warehin(mouseEvent) {
    loadanypage(6, mouseEvent)
}

function warenkorb(mouseEvent) {
    sendRequest("fahrraeder/artikelNr" + mouseEvent.target.artikelNr + ".json", function (data) {
        var inf = JSON.parse(data);
        createacart(inf)
    })

    function createacart(inf) {
        var dw = document.createElement("dic")
        var hw = document.createElement("h1")
        var hwin = document.createTextNode("Warenkorb")
        var tab = document.createElement("table")
        tab.classList.add("tab_")
        var trw = document.createElement("tr")
        trw.classList.add("tr")
        var thw1 = document.createElement("th")
        thw1.classList.add("thw")
        var thw1in = document.createTextNode("Produkt")
        var thw2 = document.createElement("th")
        thw2.classList.add("thw")
        var thw4 = document.createElement("th")
        var thw4in = document.createTextNode("Image")
        var thw2in = document.createTextNode("Beschreibung")
        var thw3 = document.createElement("th")
        thw3.classList.add("thw")
        var thw3in = document.createTextNode("Preis")

        if (inf && !cart.includes(inf)) {
            cart.push(inf)
        }
        elem = document.getElementById("warenkorb")
        hw.appendChild(hwin);
        dw.appendChild(hw);
        thw1.appendChild(thw1in)
        thw2.appendChild(thw2in)
        thw4.appendChild(thw4in)
        thw3.appendChild(thw3in)
        trw.appendChild(thw1)
        trw.appendChild(thw2)
        trw.appendChild(thw4)
        trw.appendChild(thw3)

        tab.appendChild(trw)
        elem.appendChild(dw)
        elem.appendChild(tab)

        for (i = 0; i < cart.length; i++) {

            var trw1 = document.createElement("tr")
            var tdw1 = document.createElement("td")
            var tdw1in = document.createTextNode(cart[i].name)
            var tdw2 = document.createElement("td")
            var butin = document.createElement("button")
            var butinin = document.createTextNode("  Entfernen")
            butin.appendChild(butinin)
            butin.classList.add("butin")
            butin.classList.add("fas", "fa-trash-alt")
            var a = i ;
            butin.onclick = function () {
                deletoneit(a);
            }
            var butin1 = document.createElement("button")
            var butinin1 = document.createTextNode("  Hinzufügen")
            butin1.appendChild(butinin1)
            butin1.classList.add("butin")
            butin1.classList.add("fas", "fa-plus")
            butin1.onclick = function () {
                loadanypage(5);
            }
            var tdw2in = document.createTextNode(cart[i].beschreibung)
            var tdw4 = document.createElement("td")
            var tdw4in = document.createElement("img")
            tdw4in.src = cart[i].imageUrl
            var tdw3 = document.createElement("td")

            var tdw3in = document.createTextNode(cart[i].preis)

            tdw1.appendChild(tdw1in)
            tdw1.appendChild(butin)
            tdw1.appendChild(butin1)
            tdw2.appendChild(tdw2in)
            tdw3.appendChild(tdw3in)
            tdw4.appendChild(tdw4in)
            trw1.appendChild(tdw1)
            trw1.appendChild(tdw2)
            trw1.appendChild(tdw4)
            trw1.appendChild(tdw3)
            tab.appendChild(trw1)





        }
        
        















    }




}


//         <i class="fas fa-angle-double-down"></i>
