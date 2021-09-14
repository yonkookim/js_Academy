//데이터 베이스에서 받아온 데이타
//시간은 => 분, 07:10 => 60*7+10=430
const d_0913={
    430:"기상",
    450:"에이콘 아카데미 출근",
    1080:"에이콘 아카데미 퇴근",
    1170:"집도착",
    1320:"취침"
}
console.log(430 in d_0913); // '430 key' 가 존재하는지? 검사: true

let li_html="";



// 아래의 프린트 함수는 키를 이쁘게 받아 적기 전(직관적으로 쉬웠던 단계까지의 코드)
// printSchedule(d_0913);
// function printSchedule(xxx){
//     li_html=""; //초기화!!!!!!!!!!!!!!!!!!
// for(key in xxx){ //변화된 li_html을 반영하여 프린트 하려면 프린트 함수 안에 이 for구문이 들어가야 맞지 ㅇㅋㅇㅋ
//     console.log(key);
//     li_html+="<li>"
//     li_html+=key+":"+xxx[key];
//     li_html+="</li>"
//     li_html+=`<button class='delete' value='${key}'`; //여기서 벌써 삭제가 작동을 하네?
//     li_html+=`onclick='deleteSchedule(event)'>x</button>`;
//     console.log(li_html);
// }
//     document.querySelector('.schedule').innerHTML=li_html;
// }


//이제 시간을 이쁘게 받아적도록 프린트 함수를 다음과 같이 정정
printSchedule(d_0913); //범용이 가능할까 싶어서 매개변수 이용하고 d_0913 대입해봤는데 이런 결국.. 밑에도 계속 바꿔줘야해서 불편하네
function printSchedule(xxx){
    li_html=""; //초기화!!!!!!!!!!!!!!!!!!
    for(key in xxx){ //변화된 li_html을 반영하여 프린트 하려면 프린트 함수 안에 이 for구문이 들어가야 맞지 ㅇㅋㅇㅋ
        console.log(key);
        li_html+="<li>"

        // li_html+=(Number.parseInt(key/60)<10)?"0"+Number.parseInt(key/60):Number.parseInt(key/60);//일의자리 수 앞에 0 붙이는 센스
        // li_html+=":"+((key%60<10)?"0"+key%60:key%60); //parseInt: 정수를 받는것인가?  key%60은 60으로 나누었을때 나머지인가 마지막에 괄호 전체에 쳐줘야했네
        li_html+="<b class='time'>";
        li_html+=(Number.parseInt(key/60)+"").padStart(2,0); //oh.. 새로 추가된 함수 padStart 길이가 2가 되도록 최대한 0을 채워라
        li_html+=":"+(key%60+"").padStart(2,0); //이게 위에 긴 코드보다 훨씬 좋네 -_-;;;;;;;;;
        li_html+="</b>";
        li_html+=`<span onclick='copyDown(event)' title='${key}'>`;
        li_html+=" "+xxx[key];
        li_html+="</span>";
        li_html+=`<button class='delete' value='${key}'`; //여기서 벌써 삭제가 작동을 하네?
        li_html+=`onclick='deleteSchedule(event)'>x</button>`;
        li_html+="</li>";

        console.log(li_html);
    }
    document.querySelector('.schedule').innerHTML=li_html;
}


// delete d_0913[1080]; 기존의 키, 값 삭제하는 방법
// d_0913[key]=value; 없는 키, 값 추가하는 방법
// const d_0914={...d_0913} //이러면 JSON, d_0913을 d_0914에 그대로 복사
const d_0914={...d_0913, 1200:"저녁식사"} // json 복사법 ~!!!!!!!!!!!!


//삭제 키 생성

function deleteSchedule(e){
    delete d_0913[e.target.value];
    console.log(d_0913);
    console.log(li_html);
    // console.log(typeof (e.target.value));
    printSchedule(d_0913); 
}



// 리스트 추가 기능도 만들기

function makeArrNum(arr){
    arr.forEach((item, i)=>{
        arr[i]=Number(item);
    })
    return arr; // for구문 말고  functon에서 return을 줘야 배열의 값을 넘버로 얻지.
}


document.forms.insertSchedule.regist.onclick=function(event){ //이번엔 온클릭 태그에 주지 않고 이렇게도 해보자 문법!!!!
    console.log(event.target)
    let regist_form=event.target.form; //버튼이 눌리는 버튼의 부모태그  form을 이런식으로 찾을 수 잇다 문법!!!!!!

    let addTime=document.forms.insertSchedule.registTime.value;
    let addText=document.forms.insertSchedule.registText.value;
    console.log(addTime, addText); //아 이렇게 한번에도 확인 가능 하구나~ ㅇㅋㅇㅋ
    
    // 이제 9:10 -> 9*60+10 이렇게 바꾸기 위해 다음과 같이 go
    let a_time=addTime.split(":");
    console.log(Number(a_time[0])); //이렇게 안하고 다음의 계산을 간단히 해주려고 위에 makeArrNum을 갖고왔다.
    // let regist_time=Number(a_time[0]*60+a_time[1]); //이건 문자열의 합이 돼버리네 ㅠㅠ
    a_time=makeArrNum(a_time);
    console.log(a_time);
    let regist_time=a_time[0]*60+a_time[1];
    d_0913[regist_time]=addText; // 아 이런식으로만 적으면 추가 되는건가?
    console.log(d_0913);
    printSchedule(d_0913); 
}


//클릭하면 아래 복사되도록


function copyDown(xxx){
    console.log(xxx.target.title);
    let copyKey=xxx.target.title;
    let copyText=xxx.target.innerText;
    console.log(document.forms.insertSchedule.registTime.value);
    
    document.forms.insertSchedule.registTime.value=(Number.parseInt(copyKey/60)+"").padStart(2,0)+":"+(copyKey%60+"").padStart(2,0);
    document.forms.insertSchedule.registText.value=copyText;
};
// (Number.parseInt(copyKey/60)+"").padStart(2,0)+":"+(copyKey%60+"").padStart(2,0) 와... 이걸 복사해서 붙이니까 되네 신기하네 ㅋㅋㅋ
