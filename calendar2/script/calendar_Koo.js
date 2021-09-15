const d_09=
  {
    13:{
      430:"기상",
      450:"에이콘아카데미 출근",
      1080: "퇴근",
      1170: "집 도착",
      1328: "취침"
    },
    14:{
      430:"기상",
      450:"에이콘아카데미 출근",
      1080: "퇴근",
      1170: "집 도착",
      1328: "취침"
    }
}
const tdList= document.querySelectorAll("#calendarTable td");
//new Date().getMonth() 현재 달의 -1을 반환한다.(0~11)
printCalendar(new Date().getMonth()+1);
let toDate=new Date();

printMemo(toDate.getMonth()+1,toDate.getYear()+1900,1)
function printCalendar(paraMonth,paraYear=(new Date().getYear()+1900)){
  let dateMonth=paraMonth-1; //Date()는 month 가 0~11까지다.
  //9월 마지막 일 구하기
  let lastDay=new Date(paraYear,dateMonth+1,0).getDate();
  //9월의 시작하는 요일 구하기
  let firstDay=new Date(paraYear,dateMonth,1).getDay();
  //전달의 마지막날 구하기
  let lastMonth=new Date(paraYear,dateMonth,0).getDate();
  //////////////////////////////////////////////////////////////////////


  function ButtonValue(month,year){
    this.month=month;
    this.year=year;
    this.text=`${this.year}년도 ${this.month}월`;
    this.value=`${this.year}-${this.month}`;
  }
  const nextB=(paraMonth+1==13)
                ?new ButtonValue(1,paraYear+1)
                :new ButtonValue(paraMonth+1,paraYear);

  const preB=(paraMonth-1==0)
                ?new ButtonValue(12,paraYear-1)
                :new ButtonValue(paraMonth-1,paraYear);

  document.getElementById("nextMonth").innerText=nextB.text;
  document.getElementById("nextMonth").value=nextB.value;

  document.getElementById("preMonth").innerText=preB.text;
  document.getElementById("preMonth").value=preB.value;

  document.getElementById("toDate").innerText=`${paraYear}. ${paraMonth}`;
  //document.getElementById("toDate").innerText=new Date(paraYear,dateMonth);


// 메모장에 날짜 받아가기
  function scheduleList(e){
    document.querySelector("#memo .title").innerText=`
    ${new Date().getFullYear()}년 ${new Date().getMonth()+1}월 ${e.currentTarget.querySelector(".day").innerText}일`;
  }


  //활성화된 해당 월 출력
  for(let i=firstDay,d=1; i<lastDay+firstDay; i++){
    tdList[i].addEventListener("click",scheduleList); //날짜 받아오기 위해서

    tdList[i].querySelector(".day").innerText=d;
    tdList[i].classList.add("active"); //활성화된 td 스타일 추가
    tdList[i].classList.remove("disabled"); //비활성화된 td 스타일 삭제

    let li_html="";
    for(key in d_09[d]){
      li_html+="<li>"
      li_html+="<b class='time'>"
      li_html+=(Number.parseInt(key/60)+"").padStart(2,0);
      li_html+=":"+(key%60+"").padStart(2,0);
      li_html+="</b>"
      li_html+="<span>"
      li_html+=d_09[d][key];
      li_html+="</span>"
      li_html+="</li>"
    }
    tdList[i].querySelector("ul.schedule").innerHTML=li_html;
    //////////////////////////////////////////////

    //누르면 메모장으로 리스트가 입력되도록하는 함수를 만들어보자
    tdList[i].onclick=function(event){
      console.log(event.path[0]); //이건 소용없었다..
      event.stopPropagation(); //자식요소에게까지 이벤트가 전달되는것(버블링)을 stop
      console.log(this) // stop주고나면 이렇게 가능
      console.log(event.currentTarget); //이것도 가능


      let targetDay=Number((event.currentTarget.querySelector(".day").innerText));
      console.log(Number((event.currentTarget.querySelector(".day").innerText)));
      console.log(d_09[targetDay]); // oh.. ok
      // 단수선택자를 다음과 같이 줄여서 작성가능 
      console.log(memo); //docuemnt.querySelector("#memo") or docuemnt.getElementById("memo")를 줄여서...?
      console.log(insertSchedule); //document.forms["insertSchedule"] or document.forms.insertSchedule
      // 단수선택자가(id) 없을 시 다음같이 선택자를 좀더 복잡하게(구체적으로) 사용하는 것을 권장
      // memo.querySelector("ul.schedule").innerHTML=JSON.stringify(d_09[targetDay]);
     
     printMemo(paraMonth,paraYear,targetDay);
    }
    d++;
  }

  //비활성화된 전달의 출력
  for(let i=firstDay-1; i>=0; i--){
    tdList[i].querySelector(".day").innerText=lastMonth--;
    tdList[i].classList.add("disabled");//비활성화된 td 스타일 추가
    tdList[i].classList.remove("active");//활성화된 td 스타일 삭제

  }
  //비활성화된 다음달 출력
  let nextMonth=firstDay+lastDay
  for(let i=nextMonth,num=1; i<=tdList.length-1; i++){
    tdList[i].querySelector(".day").innerText=num++;
    tdList[i].classList.add("disabled");//비활성화된 td 스타일 추가
    tdList[i].classList.remove("active");//활성화된 td 스타일 삭제
  }
}
//button인 달 바꾸기만 onclick이벤트 재정의
document.querySelectorAll(".changeMonth[type=button]").forEach((item) => {
//  item.onclick=function(){}
    item.addEventListener("click",(event)=>{
      let yearMonthArr=event.target.value.split("-");//"2021-8"->[2021,8]
      printCalendar(Number(yearMonthArr[1]),Number(yearMonthArr[0]));
    });
});


function deleteSchedule(e, month, year, date, time){ //저 위에다 함수 작성하면 함수가 실행이 안되던데 왜 이 맨 아래에선 되는거지??? 뭔차이지
  // console.log(e);
  // console.log(key);
  // console.log(time);
  delete d_09[date][time];
  printCalendar(month, year); //오... 이렇게 필요한 정보를 위에서 매개변수안에 넣음으로 함수로 가져올 수 있네 대박편리!!!!
  printMemo(month, year, date, time) //음 이런식으로.. ㅇㅋ
}

function printMemo(month, year, date, time, selector="#memo"){ //필요한것을 생각하고 매개변수 설정
  let li_html="";
  for(key in d_09[date]){
    li_html+="<li>"
    li_html+="<b class='time'>"
    li_html+=(Number.parseInt(key/60)+"").padStart(2,0);
    li_html+=":"+(key%60+"").padStart(2,0);
    li_html+="</b>"
    li_html+="<span>"
    li_html+=d_09[date][key];
    li_html+=`<button class='delete' onclick='deleteSchedule(event,${month},${year},${date},${key})'>`; //매개변수에 key,targetDay를 추가해서 함수에서 써먹을 수 있게 하는구나 이걸로 메모장 날짜도 넣을 수 있긴 하겠네ㄷㄷ
    li_html+=`🗑</button>`;
    li_html+="</span>"
    li_html+="</li>"
  }
  document.querySelector(selector+" ul.schedule").innerHTML=li_html;
  document.querySelector(selector+" .title").innerHTML=`${year}년 ${month}월 ${date}일`;
  document.forms.insertSchedule.regist.value=`${month},${year},${date}`; //삭제버튼에 필요한 데이타 받아오기?? 오 ㅎㅎ
}








function addSchedule(e){
  let addTime=document.forms.insertSchedule.registTime.value;
  let a_addTime=addTime.split(":");
  let keyTime=Number(a_addTime[0])*60+Number(a_addTime[1]);
  let addText=document.forms.insertSchedule.registText.value;
  
  let a_memoData=document.forms.insertSchedule.regist.value.split(",");
  // console.log(document.forms.insertSchedule.regist.value);
  // console.log(a_memoData);
  let memoDate=a_memoData[2];
  let memoMonth=a_memoData[0];
  let memoYear=a_memoData[1];
  console.log(memoDate);

  if(d_09[memoDate]==undefined){
  d_09[memoDate]={};

  d_09[memoDate][keyTime]=addText;
  // console.log(keyTime);
  // console.log(d_09);
  printCalendar(memoMonth,memoYear);
  printMemo(memoMonth,memoYear,memoDate);
}else{
  d_09[memoDate][keyTime]=addText;
  // console.log(keyTime);
  // console.log(d_09);
  printCalendar(memoMonth,memoYear);
  printMemo(memoMonth,memoYear,memoDate);
}
}
