window.onload = function() {
    document.querySelector('#query').focus();
}
const setHeaders = {
    headers: {
        Accept: 'application/json',
    }
}

async function find() {
    let result = document.getElementById("result");
    let result_div = document.getElementById("result_div");
    let submit = document.querySelector('#submit');
    let loading = document.querySelector('#loading');
    let query_name = document.querySelector('#query_name');
    result.style.display = 'none';
    let query = document.querySelector('#query');

        if(query == ''){
            alert('Please enter a valid query');
        }else{
            loading.style.display = 'block';
            query.disabled = true;
            query.disabled = false;
        }

        try{
            var apidata = await fetch('https://api.sumanjay.cf/torrent/?query='+query.value , setHeaders);
            var actualdata = await apidata.json();

        if(actualdata[0] == undefined){
            result.style.display = 'none';
        }else{
            result_div.innerHTML = "";
            result.style.display = 'block';
            loading.style.display = 'none';
            query_name.innerHTML = `<span>You searched for <i>'${query.value}'</i>.</span>`;
                for(let i=0; i < 10; i++) {
                    var htmlData =`<div class="res${i+1}">
                    <h5 class="text-left mt-4">Title : ${actualdata[i].name}</h5>
                    <h5 class="text-left my-1">Leechers : ${actualdata[i].leecher}</h5>
                    <h5 class="text-left my-1">Seeders : ${actualdata[i].seeder}</h5>
                    <h5 class="text-left my-1">Size : ${actualdata[i].size}</h5>
                    <h6 class="text-left mt-3">Magnet Link :</h6>
                    <textarea class="text-left w-100 text-grey p-1 magnet" onclick="copy('magnet${i+1}')" style="color:grey!important;outline:none;" id="magnet${i+1}" readonly> ${actualdata[i].magnet}</textarea>
                    <button class="btn btn-primary text-center mx-auto" onclick="copy('magnet${i+1}')">COPY</button>
                    <hr class="mx-auto my-5" style="width:80%;text-align:center;background:#fff;">
                    </div> `; 
                    // result.insertAdjacentElement('beforeend',htmlData);
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

        };

        // FUnuction to copy magnet to clipboard
    function copy(id){
            let text = document.querySelector(`#${id}`); 
            navigator.clipboard.writeText(text.value).then(()=>{
            swal("Success","Magnet URL copied to to clipboard!","success");
        }).catch((error)=>{
            swal("An error has been occurred while copying magnet , Please copy it manually","error");
        });
    }

    // Code for changing Theme
    var isLight = false;

    function toLight() {
        isLight = true;
        document.querySelector(".theme").style.animation = "rotateRight .2s linear";
        document.querySelector(".theme").setAttribute("src", "assets/night-mode.svg");
        document.body.style.background = "var(--main-bg-light)";
        document.body.style.color = "var(--text-light)";
        document.querySelector("#loading").style.borderLeft = "2px solid #000";
        document.querySelector(".center").style.background = "var(--center-bg-light)";
        document.querySelector("h1").classList.replace("text-white", "text-dark");
        document.querySelector("h2").classList.replace("text-white","text-dark");
        document.querySelectorAll("HR").forEach(function(element) {
            element.style.background = "#000";
        });
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
        document.querySelector("h1").classList.replace("text-dark", "text-white");
        document.querySelector("h2").classList.replace("text-dark","text-white");
        document.querySelector("hr").style.background = "#fff";
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