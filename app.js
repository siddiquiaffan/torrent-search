
function find() {
    let result = document.getElementById("result");
    let submit = document.querySelector('#submit');
    let loading = document.querySelector('#loading');
    let query_name = document.querySelector('#query_name');
    result.style.display = 'none';

    let query = document.querySelector('#query').value;
        if(query == ''){
            alert('Please enter a valid query');
        }else{
            loading.style.display = 'block';
        }
        fetch('https://api.sumanjay.cf/torrent/?query='+query).then((apidata) => {
            return apidata.json();
        }).then((actualdata) => {
            query.disabled = true;
            query.disabled = false;
            result.style.display = "block";
            if(actualdata[0] == undefined) {
                swal("Sorry!","Sorry , we couldn't find torrent related to your query. \n Please try with some other query.","error");
                result.style.display = "none";
            }else { 
                query_name.textContent ="You searched for " + `'${query}'` ;
                document.querySelector('#magnet1').disabled = true;
                document.querySelector('#title1').textContent = "Title : "+ actualdata[0].name;
                document.querySelector('#leechers1').textContent = "Leechers : " + actualdata[0].leecher;
                document.querySelector('#seeders1').textContent = "Seeders : " + actualdata[0].seeder;
                document.querySelector('#size1').textContent = "Size  : " + actualdata[0].size;
                document.querySelector('#magnet1').value = actualdata[0].magnet;
            }

            if(actualdata[1] == undefined) {
                document.querySelector('.res2').style.display = "none"
            }else{
                document.querySelector('#magnet2').disabled = true;
                document.querySelector('#title2').textContent = "Title : "+ actualdata[1].name;
                document.querySelector('#leechers2').textContent = "Leechers : " + actualdata[1].leecher;
                document.querySelector('#seeders2').textContent = "Seeders : " + actualdata[1].seeder;
                document.querySelector('#size2').textContent = "Size  : " + actualdata[1].size;
                document.querySelector('#magnet2').value = actualdata[1].magnet;
            }

            if(actualdata[2] == undefined) {
                document.querySelector('.res3').style.display = "none"
            }else{
                document.querySelector('#magnet3').disabled = true;
                document.querySelector('#title3').textContent = "Title : "+ actualdata[2].name;
                document.querySelector('#leechers3').textContent = "Leechers : " + actualdata[2].leecher;
                document.querySelector('#seeders3').textContent = "Seeders : " + actualdata[2].seeder;
                document.querySelector('#size3').textContent = "Size  : " + actualdata[2].size;
                document.querySelector('#magnet3').value = actualdata[2].magnet;
            }

            if(actualdata[3] == undefined) {
                document.querySelector('.res4').style.display = "none"
            }else{
                document.querySelector('#magnet4').disabled = true;
                document.querySelector('#title4').innerHTML = "Title : "+ actualdata[3].name;
                document.querySelector('#leechers4').textContent = "Leechers : " + actualdata[3].leecher;
                document.querySelector('#seeders4').textContent = "Seeders : " + actualdata[3].seeder;
                document.querySelector('#size4').textContent = "Size  : " + actualdata[3].size;
                document.querySelector('#magnet4').value = actualdata[3].magnet;
            }

            if(actualdata[4] == undefined) {
                document.querySelector('.res5').style.display = "none"
            }else{
                document.querySelector('#magnet5').disabled = true;
                document.querySelector('#title5').textContent = "Title : "+ actualdata[4].name;
                document.querySelector('#leechers5').textContent = "Leechers : " + actualdata[4].leecher;
                document.querySelector('#seeders5').textContent = "Seeders : " + actualdata[4].seeder;
                document.querySelector('#size5').textContent = "Size  : " + actualdata[4].size;
                document.querySelector('#magnet5').value = actualdata[4].magnet;
            }
            loading.style.display = 'none';
        })
        };

        function copy(id){
            let text = document.querySelector(`#${id}`); 
        navigator.clipboard.writeText(text.value).then(()=>{
            swal("Success","Magnet URL copied to to clipboard!","success");
        }).catch((error)=>{
            swal("An error has been occurred while copying magnet , Please copy it manually",error, "error");
        });
    }

    var isLight = false;

    function toLight() {
        isLight = true;
        document.querySelector(".fa-sun").style.animation = "rotateRight .2s linear";
        document.querySelector(".fa-sun").classList.replace("far","fas")
        document.body.style.background = "var(--main-bg-light)";
        document.body.style.color = "var(--text-light)";
        document.querySelector("#loading").style.borderLeft = "2px solid #000";
        document.querySelector(".center").style.background = "var(--center-bg-light)";
        document.querySelector("h1").classList.replace("text-white", "text-dark");
        document.querySelector("h2").classList.replace("text-white","text-dark");
        document.querySelector("hr").style.background = "#000";
        document.querySelector("#footer").style.background = "var(--main-bg-light)";
        document.querySelector("#footer").style.color = "var(--text-light)";
    }

    function toDark(){
        isLight = false;
        document.querySelector(".fa-sun").style.animation = "rotateLeft .2s linear";
        document.querySelector(".fa-sun").classList.replace("fas","far");
        document.body.style.background = "var(--main-bg-dark)";
        document.body.style.color = "var(--text-dark)";
        document.querySelector("#loading").style.borderLeft = "2px solid rgb(156, 169, 209)";
        document.querySelector(".center").style.background = "var(--center-bg-dark)";
        document.querySelector("h1").classList.replace("text-dark", "text-white");
        document.querySelector("h2").classList.replace("text-dark","text-white");
        document.querySelector("hr").style.background = "#fff";
        document.querySelector("#footer").style.background = "var(--main-bg-dark)";
        document.querySelector("#footer").style.color = "var(--text-dark)";
    }

    function changeTheme(){
        if(isLight == false){
            toLight();
        }else{
            toDark();
        }
    }
