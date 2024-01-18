var h=Object.defineProperty;var m=(e,t,n)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var o=(e,t,n)=>(m(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))u(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&u(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const d=e=>{throw new Error(`Element with selector: ${e} not found`)},l=(e,t=document)=>{const n=t.querySelector(e);return n||d(e),n},c=(e,t=document)=>{const n=t.querySelectorAll(e);return n.length===0&&d(e),n},f=e=>e===""?0:Math.trunc(parseInt(e)),p=e=>Array.from(e).reduce((t,n)=>t+f(n.value),0),r=(e,t)=>`${e} ${t}`;class b{constructor(t){o(this,"el");o(this,"incomeInputFields");o(this,"expensesInputFields");o(this,"outputContainer");o(this,"personButton");o(this,"submitButton");this.el=t,this.incomeInputFields=c('input[name="income"]'),this.expensesInputFields=c('input[name="expenses"]',this.el),this.outputContainer=l("[data-calculator-output]",this.el),this.submitButton=l("[data-calculator-submit]",this.el),this.personButton=l(".person-button",this.el),this.addPersonInputField=this.addPersonInputField.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.init()}addPersonInputField(){const t=Array.from(this.incomeInputFields).filter(i=>i.id.startsWith("person")),n=t[t.length-1],u=parseInt(n.id.slice(-1))+1,s=`
      <input id="person${u}" type="number" name="income" placeholder="Person ${u}"/>
    `;this.personButton.insertAdjacentHTML("beforebegin",s),this.incomeInputFields=c('input[name="income"]')}totalIncome(){return p(this.incomeInputFields)}totalExpenses(){return p(this.expensesInputFields)}totalGain(){return this.totalIncome()-this.totalExpenses()}showOutputContainer(){this.outputContainer.classList.add("fadeIn")}hideOutputContainer(){this.outputContainer.classList.remove("fadeIn")}setupCloseButton(){l(".close-button",this.el).addEventListener("click",()=>{this.hideOutputContainer()})}calculatorOutput(){const t=`
    <button class="button close-button" type="button">&times;</button>
    <ul>
      <li>
        <p>Monatliche Einnahmen gesamt:</p>
        <p>${r(this.totalIncome(),"€")}</p>
      </li>
      <li>
        <p>Monatliche Ausgaben gesamt:</p>
        <p>${r(this.totalExpenses(),"€")}</p>
      </li>
      <li>
        <p>Monatlicher Gewinn gesamt:</p>
        <p>${r(this.totalGain(),"€")}</p>
      </li>
      <li>
        <p>Jährliche Einnahmen gesamt:</p>
        <p>${r(this.totalIncome()*12,"€")}</p>
      </li>
      <li>
        <p>Jährliche Ausgaben gesamt:</p>
        <p>${r(this.totalExpenses()*12,"€")}</p>
      </li>
      <li>
        <p>Jährlicher Gewinn gesamt:</p>
        <p>${r(this.totalGain()*12,"€")}</p>
      </li>
    </ul>
  `;this.outputContainer.children[0].innerHTML=t,this.setupCloseButton(),this.showOutputContainer()}handleSubmit(){this.calculatorOutput()}registerEventListeners(){this.personButton.addEventListener("click",this.addPersonInputField),this.submitButton.addEventListener("click",this.handleSubmit)}removeEventListeners(){this.personButton.removeEventListener("click",this.addPersonInputField),this.submitButton.removeEventListener("click",this.handleSubmit)}init(){this.registerEventListeners()}destroy(){this.removeEventListeners()}}const I=()=>new b(l("[data-calculator]"));document.addEventListener("DOMContentLoaded",I);
