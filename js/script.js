const BANK={
web:{name:"Web Development",easy:[
["What does HTML stand for?",["Hyper Text Markup Language","High Transfer Machine Language","Hyperlink Text Management Language","Home Tool Markup Language"],0],
["Which language is used to style web pages?",["Python","CSS","SQL","Java"],1],
["Which tag creates a hyperlink?",["<link>","<a>","<href>","<url>"],1],
["Which HTML tag is the largest heading?",["<h6>","<head>","<h1>","<title>"],2],
["What does CSS primarily control?",["Database data","Page presentation","Server security","File storage"],1]],
medium:[
["Which CSS property changes text color?",["font-color","text-color","color","foreground"],2],
["What does responsive design mean?",["A site adapts to screen sizes","A site loads only on phones","A site uses no CSS","A site has a database"],0],
["Which CSS layout system is one-dimensional?",["Grid","Flexbox","Float","Position"],1],
["Which attribute provides alternative text for an image?",["title","src","alt","href"],2],
["Which HTTP method commonly retrieves data?",["POST","PATCH","GET","DELETE"],2],
["Which selector targets id='main'?",[".main","#main","main","*main"],1],
["What does DOM stand for?",["Document Object Model","Data Object Manager","Document Order Method","Digital Object Map"],0],
["Which status code means Not Found?",["200","301","404","500"],2]],
hard:[
["Which CSS property controls stacking order?",["z-index","font-size","line-height","border"],0],
["What is event bubbling?",["Event moving from target toward ancestors","Event moving only to children","Browser refresh","CSS animation"],0],
["Which HTTP status indicates successful creation?",["200","201","204","304"],1],
["What is semantic HTML intended to improve?",["Meaning and structure","Image quality","Database speed","Encryption"],0],
["Which API makes network requests without page navigation?",["Fetch API","Canvas API","History API","Clipboard API"],0]]},
javascript:{name:"JavaScript",easy:[
["Which keyword declares a reassignable block-scoped variable?",["var","let","const","static"],1],
["Which symbol starts a single-line comment?",["<!--","//","##","**"],1],
["What does === check?",["Value only","Type only","Value and type","Reference only"],2],
["Which method adds an item to the end of an array?",["push()","pop()","shift()","join()"],0],
["Which value represents intentional absence?",["undefined","null","false","0"],1]],
medium:[
["What does JSON.parse() do?",["Object to JSON","JSON string to JavaScript value","Encrypt JSON","Validate HTML"],1],
["Which method transforms every array element?",["filter()","map()","reduce()","forEach()"],1],
["What does a Promise represent?",["A future asynchronous result","A CSS rule","A DOM element","A loop"],0],
["Which method selects the first matching DOM element?",["querySelector()","queryAll()","getFirst()","selectOne()"],0],
["What is a closure?",["Function with access to its lexical environment","A closed browser tab","A loop condition","A CSS container"],0],
["Which keyword pauses an async function for a Promise?",["wait","pause","await","yield"],2],
["What does localStorage store?",["Server files","Key-value data in the browser","Passwords only","CSS rules"],1],
["Which operator provides a fallback for null or undefined?",["||","??","&&","=>"],1]],
hard:[
["What is the temporal dead zone associated with?",["let/const before initialization","Promises only","CSS variables","HTML parsing"],0],
["Which queue handles Promise callbacks?",["Microtask queue","Render queue","File queue","CSS queue"],0],
["What does Object.freeze() do?",["Prevents direct object mutations","Deletes an object","Converts to JSON","Clones deeply"],0],
["What is currying?",["Transforming a multi-argument function into chained single-argument functions","Sorting arrays","Caching DOM nodes","Creating classes"],0],
["What does event delegation rely on?",["Bubbling","Recursion","Promises","Web Workers"],0]]},
general:{name:"General Technology",easy:[
["What does CPU stand for?",["Central Processing Unit","Computer Primary Utility","Central Program User","Core Processing Utility"],0],
["Which device is permanent storage?",["RAM","SSD","Cache","Register"],1],
["What does URL stand for?",["Uniform Resource Locator","Universal Routing Link","User Resource List","Uniform Response Layer"],0],
["Which protocol is secure web browsing?",["HTTP","FTP","HTTPS","SMTP"],2],
["Which company created Android?",["Microsoft","Google","IBM","Intel"],1]],
medium:[
["Which data structure follows FIFO?",["Stack","Queue","Tree","Graph"],1],
["What is Git primarily used for?",["Version control","Video editing","Database hosting","Image compression"],0],
["Which port is commonly HTTPS?",["21","22","80","443"],3],
["What does API stand for?",["Application Programming Interface","Advanced Program Internet","Application Process Integration","Automated Programming Input"],0],
["Which database type stores tables?",["Relational","Graph-only","Document-only","Keyless"],0],
["What does RAM provide?",["Temporary working memory","Permanent storage","Network routing","Power conversion"],0],
["Which is open-source?",["Linux","iOS","Windows","macOS"],0],
["What is a compiler used for?",["Translating source code","Designing websites","Managing passwords","Creating Wi-Fi"],0]],
hard:[
["Which sorting algorithm averages O(n log n)?",["Merge sort","Linear search","Bubble sort always","Hash lookup"],0],
["What does ACID describe?",["Database transaction properties","Network cables","UI design","CPU architecture"],0],
["Which approach uses public/private keys?",["Asymmetric cryptography","Only hashing","Symmetric-only encryption","Plaintext"],0],
["What is virtualization?",["Running isolated virtual environments on shared resources","Deleting hardware","Compressing images","Writing CSS"],0],
["Which OSI layer handles routing?",["Network","Transport","Session","Presentation"],0]]}};

let questions=[],current=0,correct=0,selected=null,timerId=null,timeLeft=15;
const $=s=>document.querySelector(s);
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const show=id=>["startScreen","quizScreen","resultScreen"].forEach(x=>$("#"+x).classList.toggle("hidden",x!==id));
const esc=v=>{const d=document.createElement("div");d.textContent=v;return d.innerHTML};

function startQuiz(){const c=$("#category").value,d=$("#difficulty").value,n=+$("#questionCount").value;questions=shuffle(BANK[c][d]).slice(0,Math.min(n,BANK[c][d].length));current=0;correct=0;show("quizScreen");render()}
function render(){clearInterval(timerId);selected=null;const q=questions[current];$("#quizMeta").textContent=`${BANK[$("#category").value].name.toUpperCase()} • ${$("#difficulty").value.toUpperCase()}`;$("#questionNumber").textContent=`Question ${current+1} of ${questions.length}`;$("#questionText").textContent=q[0];$("#progressBar").style.width=`${current/questions.length*100}%`;$("#answeredText").textContent="Choose an answer";$("#nextBtn").disabled=true;$("#nextBtn").textContent=current===questions.length-1?"Finish ✓":"Next →";$("#answers").innerHTML=shuffle(q[1].map((text,index)=>({text,index}))).map(a=>`<button class="answer" data-index="${a.index}">${esc(a.text)}</button>`).join("");timeLeft=15;tick();timerId=setInterval(()=>{timeLeft--;tick();if(timeLeft<=0){clearInterval(timerId);reveal(true)}},1000)}
function tick(){$("#timer").textContent=`00:${String(timeLeft).padStart(2,"0")}`;$("#timer").classList.toggle("warning",timeLeft<=10)}
function reveal(timeout=false){if(selected!==null&&!timeout)return;const q=questions[current];if(timeout)selected=-1;[...$("#answers").children].forEach(b=>{const i=+b.dataset.index;if(i===q[2])b.classList.add("correct");if(i===selected&&i!==q[2])b.classList.add("wrong");b.disabled=true});if(selected===q[2]){correct++;$("#answeredText").textContent="Correct! 🎉"}else $("#answeredText").textContent=timeout?"Time's up! ⏰":"Incorrect.";$("#nextBtn").disabled=false}
function finish(){clearInterval(timerId);const pct=Math.round(correct/questions.length*100),key=`quizBest_${$("#category").value}_${$("#difficulty").value}`,best=Math.max(pct,+localStorage.getItem(key)||0);localStorage.setItem(key,best);$("#score").textContent=pct+"%";$("#correctCount").textContent=correct;$("#wrongCount").textContent=questions.length-correct;$("#bestScore").textContent=best+"%";$("#resultTitle").textContent=pct>=80?"Excellent! 🏆":pct>=60?"Great work! 🎯":pct>=40?"Keep practicing! 💪":"Good try! 🚀";$("#resultMessage").textContent=`You answered ${correct} out of ${questions.length} questions correctly.`;show("resultScreen")}
$("#startBtn").onclick=startQuiz;
$("#answers").onclick=e=>{const b=e.target.closest(".answer");if(!b||selected!==null)return;selected=+b.dataset.index;[...$("#answers").children].forEach(x=>x.classList.remove("selected"));b.classList.add("selected");reveal()};
$("#nextBtn").onclick=()=>{if(selected===null)return;if(current<questions.length-1){current++;render()}else finish()};
$("#restartBtn").onclick=startQuiz;$("#homeBtn").onclick=()=>{clearInterval(timerId);show("startScreen")};
function theme(){const dark=localStorage.getItem("quizTheme")==="dark";document.body.classList.toggle("dark",dark);$("#themeBtn").textContent=dark?"☀️":"🌙"}$("#themeBtn").onclick=()=>{localStorage.setItem("quizTheme",document.body.classList.contains("dark")?"light":"dark");theme()};theme();