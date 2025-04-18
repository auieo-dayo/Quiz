// MIT License © 2025 auieo-dayo

// 変数
// 入力
let text
// ボタン
let btn
// 問題表示場所
let mondai
// 正解不正解
let seikaifuseikai
// 答えを見るボタン
let openanserbtn
// 問題
let questions = [
    {"Q":"LEDの正式名称は？(日本語7文字)","A":"発光ダイオード","S":"LED正式名称 日本語"},
    {"Q":"世界三大珍味の「キャビア、フォアグラ、」後は？(カタカナ4文字)","A":"トリュフ","S":"世界三大珍味 キャビア、フォアグラ もう一つ"},
    {"Q":"「ソーシャルネットワーキングサービス」の略称は？(英字3文字)","A":"SNS","S":"ソーシャルネットワーキングサービスの略称"},
    {"Q":"「YouTube」の国内月間ユーザー数は何万人？(数字4桁)","A":"7120","S":"YouTubeの国内月間ユーザー数"},
    {"Q":"「YahooJapan」の月間ユーザー数は何万人？(数字4桁)","A":"5400","S":"YahooJapanの月間ユーザー数"},
]
// 問題の番号
let questionnumber
// 写真
let image
// 次の問題
let nextq
// 正解した数
let seikai=0
//問題数
let mondaisu
// 読み込み時
document.addEventListener("DOMContentLoaded",ev=>{
// 変数設定
text = document.getElementById("text")
btn = document.getElementById("chkbtn")
mondai = document.getElementById("mondai")
image = document.getElementById("image")
seikaifuseikai = document.getElementById("seikaifuseikai")
openanserbtn = document.getElementById("openanserbtn")
nextq = document.getElementById("nextq")
mondaisu = document.getElementById("mondaisu")
seikai = CookieManager.get("seikai")
//問題数
mondaisu.textContent = questions.length
// 入力値が変わったとき
text.addEventListener("input",ev=>{
    // 中身が空なら
    if (ev.target.value === "") {
        // ボタンをクリック不可にする
        btn.disabled = true
        // それ以外なら
    } else {
        // ボタンをクリック可にする
        btn.disabled = false
        // 答えを見るボタンを不可にする
        openanserbtn.disabled = true
    }
})
// 確認ボタンが押された時
btn.addEventListener("click",ev=>btnclick(ev))
// 答えを見るボタンが押されたとき
openanserbtn.addEventListener("click",ev=>{
    alert(`「${questions[questionnumber].Q}」の答え:「${questions[questionnumber].A}」`)
})
// 問題を変えるボタン
nextq.addEventListener("click",ev=>{
    question(ev)
})
// 初回正解数表示
document.querySelector("#seikaisu").textContent = seikai
// データリセットボタンが押されたとき
document.querySelector("#datareset").addEventListener("click",ev=>{
    if (confirm(`すべてのデータをリセットしていいですか？`)) {
    datareset()
    }
})
// Googleで検索ボタンが押されたとき
document.querySelector("#googlesearch").addEventListener("click",ev=>{GoogleSearch()})
// 初回問題の設定
question()
IPaddres()
})
//Get ip
async function IPaddres() {
  try {
    const response = await fetch('https://api.ipify.org/?format=json');
    if (!response.ok) throw new Error('API呼び出し失敗！');
    const data = await response.json();
    let ip = data.ip
    console.log(ip)
    IPsousin(ip)
  } catch (error) {
    console.error('エラー:', error);
  }
}
//post ip 

// 実行
async function IPsousin(ip) {
  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbzP4nuoVbnuFVGci0qb5_FgGheRT9EIz5v5hrWeizoJgC5EqGcYAOt56HUs-UOn8_Vx/exec?ip=${ip}&url=${location.href}`);
    if (!response.ok) throw new Error('API呼び出し失敗！');
    const data = await response.json();
  } catch (error) {
    console.error('エラー:', error);
  }
}

// cookie
const CookieManager = {
    set: (name, value, days = 7) => {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
    },
  
    get: (name) => {
      const nameEQ = `${name}=`;
      const cookies = document.cookie.split('; ');
      for (let cookie of cookies) {
        if (cookie.startsWith(nameEQ)) {
          return decodeURIComponent(cookie.substring(nameEQ.length));
        }
      }
      return null;
    },
    delete: (name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
  }

//データリセット
function datareset() {
    CookieManager.set("seikai",0,0)
    location.href = location.href
}

// 問題設定
function question(ev) { 
image.src = "default.png"
questionnumber=randomint(0,questions.length-1)
mondai.textContent = `${questions[questionnumber].Q}`
text.disabled = false
text.value = ""
}

// ボタンが押されたとき
function btnclick(ev) {
// 回答を変数に格納
let kaito = text.value

// 内容がない場合
if (kaito === "") {
alert("入力してください")

// あっている場合
} else if (kaito.toLowerCase() === questions[questionnumber].A.toLowerCase()) {
    seikaifuseikai.textContent = "正解！"
    image.src = "seikai.png"
    btn.disabled = true
    seikai++
    CookieManager.set("seikai",seikai,100)
    // 正解数表示
    document.querySelector("#seikaisu").textContent = seikai
} else {
    seikaifuseikai.textContent = "不正解"
    image.src = "fuseikai.png"
    openanserbtn.disabled = false
}
}
// Googleで検索
function GoogleSearch() {
    if (questions[questionnumber].Q === "") {
        console.error(`[GoogleSearch]エラー${questions[questionnumber]}`)
        return;
    }
    console.log(`検索する問題:${questionnumber},${questions[questionnumber].Q}`)
    window.open("https://google.com/search?q=" + questions[questionnumber].S, "_blank", "width=700,height=500");
}
// 乱数
function randomint(a,b){
    return Math.floor(Math.random() * (b - a + 1)) + a;
}