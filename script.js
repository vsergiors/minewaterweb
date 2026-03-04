const SERVER_IP = "minewater.noctier.net:25583";

function copiarIP(){
    navigator.clipboard.writeText(SERVER_IP);
    alert("IP copiada");
}

async function updateServer(){
    try{
        const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP`);
        const data = await res.json();

        if(data.online){

            document.getElementById("status").innerText = "Online";
            document.getElementById("mini-status").innerText = "Online";

            document.getElementById("players").innerText = data.players.online;
            document.getElementById("mini-players").innerText = data.players.online;

            document.getElementById("max").innerText = data.players.max;
            document.getElementById("version").innerText = data.version;

            const list = document.getElementById("player-list");
            list.innerHTML = "";

            if(data.players.list){
                data.players.list.forEach(p=>{
                    const li = document.createElement("li");
                    li.innerText = p;
                    list.appendChild(li);
                });
            }

        }else{
            document.getElementById("status").innerText = "Offline";
            document.getElementById("mini-status").innerText = "Offline";
        }

    }catch(e){
        console.error(e);
    }
}

updateServer();

setInterval(updateServer,15000);
