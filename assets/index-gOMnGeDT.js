var h=Object.defineProperty;var m=(e,t,n)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var o=(e,t,n)=>(m(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const d=e=>{throw new Error(`Element with selector: ${e} not found`)},u=(e,t=document)=>{const n=t.querySelector(e);return n||d(e),n},c=(e,t=document)=>{const n=t.querySelectorAll(e);return n.length===0&&d(e),n},f=e=>e===""?0:Math.trunc(parseInt(e)),p=e=>Array.from(e).reduce((t,n)=>t+f(n.value),0),r=(e,t)=>`${e} ${t}`;class b{constructor(t){o(this,"el");o(this,"incomeInputFields");o(this,"expensesInputFields");o(this,"outputContainer");o(this,"personButton");o(this,"submitButton");o(this,"personCounter",3);this.el=t,this.incomeInputFields=c('input[name="income"]'),this.expensesInputFields=c('input[name="expenses"]',this.el),this.outputContainer=u("[data-calculator-output]"),this.submitButton=u("[data-calculator-submit]",this.el),this.personButton=u(".person-button",this.el),this.addPersonInputField=this.addPersonInputField.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.init()}addPersonInputField(){const t=this.personCounter++,n=`
      <input id="person${t}" type="number" name="income" placeholder="Person ${t}"/>
    `;this.personButton.insertAdjacentHTML("beforebegin",n),this.incomeInputFields=c('input[name="income"]')}totalIncome(){return p(this.incomeInputFields)}totalExpenses(){return p(this.expensesInputFields)}totalSurplus(){return this.totalIncome()-this.totalExpenses()}setupCloseButton(){u(".close-button",this.el).addEventListener("click",()=>{this.hideOutputContainer()})}showOutputContainer(){this.outputContainer.classList.add("fadeIn")}hideOutputContainer(){this.outputContainer.classList.remove("fadeIn")}calculatorOutput(){const t=`
    <button class="button close-button" type="button">&times;</button>
    <ul>
      <li>
        <p>Monatliche Einnahmen gesamt:</p>
        <p>${r(this.totalIncome()/12,"€")}</p>
      </li>
      <li>
        <p>Monatliche Ausgaben gesamt:</p>
        <p>${r(this.totalExpenses()/12,"€")}</p>
      </li>
      <li>
        <p>Monatlicher Gewinn gesamt:</p>
        <p>${r(this.totalSurplus()/12,"€")}</p>
      </li>
      <li>
        <p>Jährliche Einnahmen gesamt:</p>
        <p>${r(this.totalIncome(),"€")}</p>
      </li>
      <li>
        <p>Jährliche Ausgaben gesamt:</p>
        <p>${r(this.totalExpenses(),"€")}</p>
      </li>
      <li>
        <p>Jährlicher Gewinn gesamt:</p>
        <p>${r(this.totalSurplus(),"€")}</p>
      </li>
    </ul>
  `;this.outputContainer.children[0].innerHTML=t,this.setupCloseButton(),this.showOutputContainer()}handleSubmit(){this.calculatorOutput()}registerEventListeners(){this.personButton.addEventListener("click",this.addPersonInputField),this.submitButton.addEventListener("click",this.handleSubmit)}removeEventListeners(){this.personButton.removeEventListener("click",this.addPersonInputField),this.submitButton.removeEventListener("click",this.handleSubmit)}init(){this.registerEventListeners()}destroy(){this.removeEventListeners()}}const I=()=>new b(u("[data-calculator]"));document.addEventListener("DOMContentLoaded",I);
