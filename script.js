var carousel = $(".carousel"),
  currdeg = 0;

var pageNum = 1; // 현제 페이지 번호
var endPageNum = 15; // 마지막 페이지 번호 - 페이지수에 맞게 변경

$(".next").on(
  "click",
  {
    d: "n"
  },
  rotate
);

$(".prev").on(
  "click",
  {
    d: "p"
  },
  rotate
);

function rotate(e) {
  var pageCeil = Math.ceil(pageNum / 4) - pageNum / 4; // 1,2,3,4 면 구분

  if (e.data.d == "n") {
    if (pageNum == endPageNum) {
      //마지막 페이지일떄 1페이지로 이동
      if (pageCeil == 0.75) {
        //1면일떄 360도 회전
        currdeg = currdeg - 360;
        pageCeil = 0;
      } else if (pageCeil == 0.5) {
        //2면일떄 270도 회전
        currdeg = currdeg - 270;
        pageCeil = 0;
      } else if (pageCeil == 0.25) {
        //3면일떄 180도 회전
        currdeg = currdeg - 180;
        pageCeil = 0;
      } else if (pageCeil == 0) {
        //4면일때 90도 회전
        currdeg = currdeg - 90;
        pageCeil = 0;
      }
      pageNum = 1;
    } else {
      //그외 페이지 넘김,  페이지번호 +0
      currdeg = currdeg - 90;
      pageNum = pageNum + 1;
    }
  }

  if (e.data.d == "p") {
    if (pageNum == 1) {
      //첫번째 페이지 일때 마지막 페이지로 넘어가지 않음
      alert("첫번째 페이지 입니다.");
    } else {
      // 그외 페이지 이전으로 넘김 페이지 번호 -1
      currdeg = currdeg + 90;
      pageNum = pageNum - 1;
    }
  }

  var showPageNum = pageNum; // 보여줄 페이지 번호 = 현재 페이지

  if (pageCeil == 0) {
    //1면
    $(".page:nth-child(4n+1)").hide();
    $(".page:nth-child(4n+3)").hide();
    $(".page:nth-child(" + showPageNum + ")").show();
  } else if (pageCeil == 0.75) {
    //2면
    $(".page:nth-child(4n+0)").hide();
    $(".page:nth-child(4n+2)").hide();
    $(".page:nth-child(" + showPageNum + ")").show();
  } else if (pageCeil == 0.5) {
    //3면
    $(".page:nth-child(4n+1)").hide();
    $(".page:nth-child(4n+3)").hide();
    $(".page:nth-child(" + showPageNum + ")").show();
  } else if (pageCeil == 0.25) {
    //4면
    $(".page:nth-child(4n+0)").hide();
    $(".page:nth-child(4n+2)").hide();
    $(".page:nth-child(" + showPageNum + ")").show();
  }
  console.log(pageNum);
  $(".page").css("z-index", 1);
  $(".page:nth-child(" + pageNum + " )").css("z-index", 99);
  $(".page").removeClass("print");
  $(".page:nth-child(" + pageNum + " )").addClass("print");

  carousel.css({
    "-webkit-transform": "rotateY(" + currdeg + "deg)",
    "-moz-transform": "rotateY(" + currdeg + "deg)",
    "-o-transform": "rotateY(" + currdeg + "deg)",
    transform: "rotateY(" + currdeg + "deg)"
  });
}

function resizeAndPrint() {
  var _print = window.print;
  window.print = function() {
    $("textarea").each(function() {
      $(this).height($(this).prop("scrollHeight"));
    });
    _print();
  };
  window.print();
}
