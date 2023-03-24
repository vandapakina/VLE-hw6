(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let plVõiEl = h >= 12 ? 'PL' : 'EL'; // Kell 24 ehk 00:00 võib olla tegelikult nii PL kui ka EL.

            if (h == 24) {
                h  = 12;
            }
            else if (h > 12) {
                h = h % 12;
            }
            if (m < 10) {
                m = "0" + m;
            }
            if (s < 10) {
                s = "0" + s;
            }
            c.innerHTML = h + ":" + m + ":" + s + " " + plVõiEl;
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let firstName = document.getElementById("fname");
        let lastName = document.getElementById("lname");

        let sum = 0;
        document.getElementById("v1").price = 5;
        document.getElementById("v2").price = 1;
        
        linn[1].price = 0;
        linn[2].price = 2.5;
        linn[3].price = 2.5;
        linn[4].price = 3;

        let numbers = [0-9]
        
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        }
        // Sisendi kontroll: Tekstiväljad ei tohi olla tühjad
        if (firstName.value === "" || lastName.value === "") {
            alert("Palun täitke kõik tekstiväljad");
            linn.focus();
            return;
        } 
        // Sisendi kontroll: Tekstiväljad ei tohi sisaldada numbreid
        if (/\d/.test(firstName.value) || /\d/.test(lastName.value)) {
            alert("Tekstiväljad ei tohi sisaldada numbreid");
            linn.focus();
            return;
        } 
        // Sisendi kontroll: Üks raadionuppudest peab olema valitud
        if (document.getElementById("jrgPaev").checked == false 
        && document.getElementById("ndlJooksul").checked == false 
        && document.getElementById("kuuJooksul").checked == false) {
            alert("Palun valige kättesaamise aeg");
            linn.focus();
            return;
        } 
        else {
            let cityIndex = document.getElementById("linn").options.selectedIndex;
            sum += document.getElementById("linn").options[cityIndex].price;

            document.getElementsByClassName("box")[0].children[0].checked;
            
            if (document.getElementById("v1").checked == true) {
                    sum += document.getElementById("v1").price;
            }
            if (document.getElementById("v2").checked == true) {
                sum += document.getElementById("v2").price;
        }
            e.innerHTML = sum + " &euro;";
            
        }        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";
let mapAPIKey2 = "Ahwm-mty4HcLz_OAeLxE75dgC1nh0M6QjfSp5phjqbb_RJLX32uMUbFo4vG5aXwf";

let map;

function GetMap() {
    
    "use strict";

    let point1 = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );


    let point2 = new Microsoft.Maps.Location(
            58.3872604, 
            24.4973526
        );

    let centerPoint = new Microsoft.Maps.Location(
            58.3676529, 
            25.595335
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(point1, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    let pushpin2 = new Microsoft.Maps.Pushpin(point2, {
            title: 'TÜ Pärnu Kolledž'
        });

    //Infobox
    var infobox = new Microsoft.Maps.Infobox(point1, {
        visible: false
    });

    var infobox2 = new Microsoft.Maps.Infobox(point2, {
        visible: false
    });

    pushpin.metadata = {
        title: 'Tartu Ülikooli peahoone',
        description: 'Aadress: Ülikooli 18, 50090 Tartu'
    };

    pushpin2.metadata = {
        title: 'Tartu Ülikooli Pärnu Kolledž',
        description: 'Ringi 35, Pärnu, 80012 Pärnu maakond'
    };

    infobox.setMap(map);
    infobox2.setMap(map);

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    function pushpinClicked(e) {
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

