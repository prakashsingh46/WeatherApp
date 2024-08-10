const cityName=document.getElementById("cityName")
const submitBtn = document.getElementById("submitBtn");
const outputCity= document.getElementById("output_city");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const datahide=document.querySelector(".middle_layer");

const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const getCurrentDay = ()=>{
    var wDay= new Array(7);
    wDay[0]="Sunday";
    wDay[1]="Monday";
    wDay[2]="Tuesday";
    wDay[3]="Wednesday";
    wDay[4]="Thursday";
    wDay[5]="Friday";
    wDay[6]="Saturday";
    
    let date=new Date();
    return wDay[date.getDay()];
}

const getCurrentTime = () => {
    var month=[
        "Jan","Fab","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct","Nov","Dec"
    ]
    var date=new Date();
    var mm=month[date.getMonth()];
    var dd=date.getDate();

    let hours= date.getHours();
    let mins= date.getMinutes();

    let period="AM";
    if(hours > 11){
        period="PM";
        if(hours>12) hours-= 12;
    }
    if(mins<10){
        mins="0" + mins;
    } 
    return `${mm} ${dd} | ${hours}:${mins}${period}`
}

day.innerText=getCurrentDay();
today_date.innerText=getCurrentTime();

const getInfo = async(event)=>{
    event.preventDefault();
    let city=cityName.value;
    if(city===""){
        outputCity.innerText="Please enter a city name!";
        datahide.classList.add("data_hide");
    }
    else{
        
        try{
            let url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36f8aeb68bc5c0f05eca95ba872fbd49`;
            const data = await fetch(url);
            const objData =await data.json();
            const arrData= [objData];
            console.log(objData);
            
            outputCity.innerText=`${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText=(arrData[0].main.temp-273).toFixed(2);
            temp_status.innerText=arrData[0].weather[0].main;

            let tempMood=arrData[0].weather[0].main;
            // condition to check weather status
            if(tempMood=="Clear"){
                temp_status.innerHTML="<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            else if(tempMood=="Clouds"){
                temp_status.innerHTML="<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            }
            else if(tempMood=="Rain"){
                temp_status.innerHTML="<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }
            else{
                temp_status.innerHTML="<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            }
            datahide.classList.remove("data_hide");

        }catch(error){
            outputCity.innerText="Please enter a proper city name!";
            datahide.classList.add("data_hide");
            console.log(error);
        }


        
    }
}
submitBtn.addEventListener('click' , getInfo);