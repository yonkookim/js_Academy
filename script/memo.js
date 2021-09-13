//데이터 베이스 서버와 통신해서 9월 10일 할일 목록을 받았고.(전제) 출력하기를 해보자!!!

const d_09_10=["aaa", "bbb", "ccc", "ddd", "eee"];
schedulePrint(); //함수 실행의 호이스팅
function schedulePrint(){ //이렇게 함수로 묶어주니 앞으로 써먹기 편해지는것이지
let scheduleLiHtml="";
d_09_10.forEach((v,i)=>{
    scheduleLiHtml+=`<li>${i}:${v}</li>`
    console.log(scheduleLiHtml);
});
const ulSchedule=document.querySelector("#memo ul.schedule")
ulSchedule.innerHTML=scheduleLiHtml  //html 유용하네... ㄷㄷ
}

// document.querySelectorAll(".insert_schedule input")[0] //이것도 되고~~~~~~~~~~~~~~!!!!!!!!!
let addIndex= document.forms.insertSchedule.index.value;
let addText= document.forms.insertSchedule.text.value;
console.log(addText);

let listLength=document.querySelector(".schedule").getElementsByTagName("li").length;
let scheduleList=document.querySelectorAll(".schedule li");
let li_node=document.createElement("li");
li_node.style.color="red";

function addSchedule(){
    if(listLength==0){
        li_node.innerHTML=`${addIndex}:${addText}`;
        console.log(li_node);
        document.querySelector(".schedule").innerHTML="<li><b style='color:red'>"+addText+"</b><button onclick='this.parentNode.remove()'>X</button></li>";
    }
    else if(listLength>=1){
        li_node.innerHTML=`${addIndex}:${addText}`;
        console.log(li_node);
        li_node.innerHTML="<b>"+addText+"</b><button onclick='this.parentNode.remove()'>X</button>";  //태그가 적용되게 넣을 수도 있구나
        scheduleList[addIndex-1].after(li_node);
        }
        
    
    
    
    
    }
    
    
    // document.querySelectorAll(".schedule li")[0].after(li_node);
// li_node.innerHTML="<b>"+inputValArr[0]+"</b><button onclick='this.parentNode.remove()'>X</button>"; //왜있었지?




//스케줄 추가버튼을 누르면 데이터베이스 서버에 insert를 하고 다시 insert된 리스트를 출력받는다.
//기존의 리스트에 값을 추가한것을 대신한다.
//삭제버튼도 구현(삭제도 비슷한 과정)












