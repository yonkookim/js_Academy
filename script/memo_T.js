//데이터 베이스 서버와 통신해서 9월 10일 할일 목록을 받았고.(전제) 출력하기를 해보자!!!

const d_09_10=["aaa", "bbb", "ccc", "ddd", "eee"];
schedulePrint(); //함수 실행의 호이스팅
function schedulePrint(){ //이렇게 함수로 묶어주니 앞으로 써먹기 편해지는것이지
let scheduleLiHtml="";

const del_val={index:0}; //그저 인덱스로 저장했던 delete버튼의 value값을 JSON형식 연습할겸 바꿔보는 작업

d_09_10.forEach((v,i)=>{ //아 한줄에 다 안적고 이런식으로 층층이 나눠서 하니까 직관적으로 표기하기 편하긴 하네..
    del_val.index=i;
    scheduleLiHtml+=`<li>`;
    scheduleLiHtml+=`${v}`;
    scheduleLiHtml+=`<button class='delete' value='${JSON.stringify(del_val)}'`; //여기서 벌써 삭제가 작동을 하네?
    scheduleLiHtml+=`onclick='deleteSchedule(event)'>x</button>`; //여기가 키포인트
    scheduleLiHtml+=`</li>`;
    // console.log(scheduleLiHtml);
    // 우리의 목표는 삭제를 누르면 배열에서 그 값을 삭제하여 다시 출력하는 것이 목표
});
const ulSchedule=document.querySelector("#memo ul.schedule") //문법 ㅇㅋㅇㅋ
ulSchedule.innerHTML=scheduleLiHtml  //html 유용하네... ㄷㄷ
}

// document.querySelectorAll(".insert_schedule input")[0] //이것도 되고~~~~~~~~~~~~~~!!!!!!!!!
const scheduleForm=document.forms["insertSchedule"];
const regist=document.forms["insertSchedule"]["regist"]; //오호.. 이런식으로 찾을 수 있군

let textNode=scheduleForm["text"]; //이때의 textNode는 이름이 text인 input'요소 자체'를 참조한다.
let testValue=scheduleForm["text"].value; //이때의 testValue 는 선언시의 벨류(의주소)를 계속 가리키는 것(참조하는 것)이지 
// 새로 바뀌는 벨류를 최신화하여 가리키는 것이 X
console.log(testValue); // 즉 이건 최초의 벨류값이 공백이라면 계속 null이 뜰것. 즉 변화를 감측할때 이건 쓸수 x
//하지만 선언 자체를 변화에 실행되는 '함수 안에서' 선언해주면 사용가능하겠지


console.log(scheduleForm["text"].value); //반면 이건 늘 현재의 value를 제대로 잡을 수 있겠지 (비교되는구만 오........)


//노드 객체 자체(존재는 변치x)를 참조하는 변수는 상수로 참조
//노드 객체의 속성 값(지지고 볶는 녀석들)은 let변수로 참조
regist.addEventListener("click",()=>{
    // console.log(regist);
    // console.log(scheduleForm);
    let insert_index=Number(scheduleForm["index"].value); //value는 언제나 문자열
    let insert_text=scheduleForm["text"].value;
    d_09_10.splice(insert_index,0,insert_text);
    console.log(d_09_10);
    schedulePrint(); //이것이 함수를 만드는 의미, 바로 간단히 스케줄 출력 굳 ㅇㅋㅇㅋ 
    //아 이런식을 배열을 바꿔서 대입하면 리스트가 없어질때를 걱정 안해도 되겠구나
})

function deleteSchedule(e){
    console.log(e); //event 일어난 것 확인 ㅇㅋ
    let deleteIndexObject=JSON.parse(e.target.value); //delete 버튼의 벨류를 object(단일JSON)로 받아오는구나
    console.log(deleteIndexObject);
    //왜 이렇게 받아와? 문자열로 받은 JSON의 정보에서는 그 index값을 대상화 하기 힘든데..
    //이렇게 JSON의 object로 받아오면 그 정보(index, 등등)는 다음과 같이 쉽게 받아올 수 있기 때문이지  
    d_09_10.splice(deleteIndexObject.index,1); //받아온 object(단일 JSON)의  index를 읽어서 제거.. 와우;;;; ㅇㅋㅇㅋ
    schedulePrint(); //그리고 또 출력
}







