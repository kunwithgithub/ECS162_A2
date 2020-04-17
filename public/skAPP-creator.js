
let font_groups = [
    {
        font:"Indie_Flower",
        selected:true,
    },
    {
        font:"Dancing_Script",
        selected:false,
    },
    {
        font:"Long_Cang",
        selected:false,
    },
    {
        font:"Homemade_Apple",
        selected:false,
    }
];

let color_groups = [
    {
        color:"color_1",
        selected:true,
    },{
        color:"color_2",
        selected:false,
    },{
        color:"color_3",
        selected:false,
        handle: null
    },{
        color:"color_4",
        selected:false,
    },{
        color:"color_5",
        selected:false,
        handle: null
    },{
        color:"color_6",
        selected:false,
    },{
        color:"color_7",
        selected:false,
    },{
        color:"color_8",
        selected:false,
    },{
        color:"color_9",
        selected:false,
    } 
    
];


const change_font=(id)=>{

    font_groups.map((json)=>{
        if(json.font===id){
            json.selected=true;
            let string = document.getElementById(json.font).innerHTML.toString();
            string="&#10070;"+string.slice(1,string.length);
            document.getElementById(json.font).innerHTML = string;
            document.getElementById("sk_postcard_textarea").className = "textarea "+json.font;
            
        }else{
            json.selected=false;
            let string = document.getElementById(json.font).innerHTML.toString();
            string="&#9671;"+string.slice(1,string.length);
            document.getElementById(json.font).innerHTML=string;
        }

    });



};

const change_color=(id)=>{

    color_groups.map((json)=>{
        if(json.color===id){
            json.selected=true;
            document.getElementById(json.color).classList.add("selected_color");
            document.getElementById("sk_postcard_screen").className = "sk_postcard_screen "+json.color;

        }else{
            json.selected=false;
            document.getElementById(json.color).classList.remove("selected_color");
        }

    });

};

const submit=()=>{

    let message = document.getElementById("sk_postcard_textarea").value;
    let font = "";
    for(let i = 0; i<font_groups.length;i++){
        if(font_groups[i].selected){
            font=font_groups[i].font;
            break;
        }
    }

    let color = "";
    for(let i=0;i<color_groups.length;i++){
        if(color_groups[i].selected){
            color=color_groups[i].color;
            break;
        }
    }
    submission_json = {
        message: message,
        font: font,
        color: color
    };

    
    alert(JSON.stringify(submission_json));
};

const ajax = ()=>{
    let xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = ()=>{
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
            alert(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST",url);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send();
}


const init=()=>{
    const font_selector = document.getElementById("font_selector");
    const color_selector = document.getElementById("color_selector");
    font_groups.map((json)=>{
        let selected = json.selected?"&#10070;":"&#9671;";
        const child = document.createElement("li");
        child.id=json.font;
        child.className=json.font;
        child.innerHTML = selected+" "+json.font.replace("_"," ");
        font_selector.appendChild(child);
        child.addEventListener("click",()=>{
            change_font(child.id);
        });
    });

    color_groups.map((json)=>{
        let selected = json.selected?"selected_color":"";
        const child = document.createElement("div");
        child.id=json.color;
        child.className = "sk_painting_items "+json.color+" "+selected;
        color_selector.appendChild(child);
        let handle = document.getElementById(json.color);
        handle.addEventListener("click",()=>{
            change_color(child.id);
        });
    });

    document.getElementById("submit_button").addEventListener("click",submit);
};

init();