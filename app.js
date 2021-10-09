window.onload = function() {
    let term = document.querySelector('#query')
    term.focus();
    const params = new URLSearchParams(window.location.search);
    if(params.has('query')){
        term.value = params.get('query');
        find(params.get('query'));
    }
}
const setHeaders = {
    headers: {
        Accept: 'application/json',
    }
}
// document.querySelector('#submit').onclick = (e) => {
//     find(document.querySelector('#query').value);
// }

// document.querySelector('#form').addEventListener('onsubmit', (e) => {
//     find(document.querySelector('#query').value);
// })

async function find(search) {
    let result = document.getElementById("result");
    let result_div = document.getElementById("result_div");
    let submit = document.querySelector('#submit');
    let loading = document.querySelector('#loading');
    let query_name = document.querySelector('#query_name');
    result.style.display = 'none';

        if(search == ''){
            alert('Please enter a valid query');
        }else{
            loading.style.display = 'block';
            query.disabled = true;
            query.disabled = false;

            try{
                var apidata = await fetch('https://api.sumanjay.cf/torrent/?query='+search , setHeaders);
                var actualdata = await apidata.json();
                
                if(actualdata[0] == undefined){
                    result.style.display = 'none';
                }else{
                    result_div.innerHTML = "";
                    result.style.display = 'block';
                    loading.style.display = 'none';
                    query_name.innerHTML = `<span>Search Results For <i>'${search}'</i>.</span>`;
                        for(let i=0; i < 10; i++) {
                            var htmlData =`
                            <div class='card mb-3'>
                                <h5 class="name">${actualdata[i].name.substring(0, 80)}</h5>
                                <h6 class="ls">Leechers : ${actualdata[i].leecher} | Seeders : ${actualdata[i].seeder}</h6>
                                <div class="btns">
                                    <span title='Copy to magnet to clipboard' onclick="copy('${actualdata[i].magnet}')"> <i class="fas fa-copy icon"></i> </span>
                                    <span title='Open magnet URI' onclick="openMagnet('${actualdata[i].magnet}')"> <i class="fas fa-external-link-alt icon"></i> </span>
                                    <span title='Share magnet URI' onclick="share('${actualdata[i].magnet}')"> <i class="fas fa-share icon"></i> </span>
                                </div>
                            <div>
                            `; 
                            result_div.innerHTML += htmlData;
                        }
                    query.placeholder = "Enter Your query";

                    }
                
            }catch(e){
                        swal("Sorry!","Sorry , we couldn't find torrent related to your query. Please try with some other query.","error");
                        loading.style.display= "none";
                        query.value = "";
                        query.placeholder = "Please try with some other keyword";
                        query.disabled = false;
                }
        }
    }
        // FUnuction to copy magnet to clipboard
    function copy(magnet){
            navigator.clipboard.writeText(magnet).then(()=>{
            swal("Success","Magnet URL copied to to clipboard!","success");
        }).catch((error)=>{
            swal("An error has been occurred while copying magnet , Please copy it manually","error");
        });
    }

    function openMagnet(magnet) {
        window.open(magnet);
    }

    function share(magnet) {
        if (navigator.share) {
            navigator.share({
                title: 'Torrent Search',
                text: magnet,
                url: ''
            })
        } else {
            swal("Sorry!","Your browser doesn't support this feature","error");
        }
    }

    // Code for changing Theme
    var isLight = false;

    function toLight() {
        isLight = true;
        document.querySelector(".theme").style.animation = "rotateRight .2s linear";
        document.querySelector(".theme").setAttribute("src", "assets/night-mode.svg");
        document.body.style.background = "var(--main-bg-light)";
        document.body.style.color = "var(--text-light)";
        document.querySelector(".center").style.background = "var(--center-bg-light)";
        document.querySelector("#loading").style.borderLeft = "2px solid #000";
        document.querySelector("body > h2").classList.toggle('text-white');
        document.querySelector("#query_name").style.textShadow = "0 0 5px rgba(27, 96, 185, 0.3)";
        document.querySelectorAll(".card").forEach(card => {
            card.style.boxShadow = "0px 0px 20px rgba(27, 96, 185, 0.2)";
            card.style.background = "rgba(27, 96, 185, 0.2)"
        })
        document.querySelector("#footer").style.background = "var(--main-bg-light)";
        document.querySelector("#footer").style.color = "var(--text-light)";
        document.querySelector(".theme").style.border = "2px dashed #ff0095";
    }

    function toDark(){
        isLight = false;
        document.querySelector(".theme").style.animation = "rotateLeft .2s linear";
        document.querySelector(".theme").setAttribute("src", "assets/brightness.svg");
        document.body.style.background = "var(--main-bg-dark)";
        document.body.style.color = "var(--text-dark)";
        document.querySelector("#loading").style.borderLeft = "2px solid rgb(156, 169, 209)";
        document.querySelector(".center").style.background = "var(--center-bg-dark)";
        document.querySelector("body > h2").classList.toggle('text-white');
        document.querySelector("#query_name").style.textShadow = "0 0 15px rgba(0,0,0)";
        document.querySelectorAll(".card").forEach(card => {
            card.style.boxShadow = "0px 0px 10px rgb(0,0,0,0.1)";
            card.style.background = "var(--center-bg-light)"
        })
        document.querySelector("#footer").style.background = "var(--main-bg-dark)";
        document.querySelector("#footer").style.color = "var(--text-dark)";
        document.querySelector(".theme").style.border = "2px dashed #00ffe5 ";
    }
 
    function changeTheme(){
        if(isLight == false){
            toLight();
        }else{
            toDark();
        }
    }