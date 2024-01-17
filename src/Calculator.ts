import {
  formatCurrency,
  getElementBySelector,
  getElementsBySelectorAll,
  sumInputValues,
} from './utils';

export class Calculator {
  private el: HTMLElement;
  private incomeInputFields: NodeListOf<HTMLInputElement>;
  private expensesInputFields: NodeListOf<HTMLInputElement>;

  private outputContainer: HTMLElement;
  private personButton: HTMLButtonElement;
  private submitButton: HTMLButtonElement;
  private personCounter: number = 3;

  constructor(el: HTMLElement) {
    this.el = el;

    /* Income Fields */
    this.incomeInputFields = getElementsBySelectorAll('input[name="income"]');

    /* Expenses Fields */
    this.expensesInputFields = getElementsBySelectorAll(
      'input[name="expenses"]',
      this.el
    );

    /* Output Container */
    this.outputContainer = getElementBySelector('[data-calculator-output]');

    /* Buttons */
    this.submitButton = getElementBySelector<HTMLButtonElement>(
      '[data-calculator-submit]',
      this.el
    );
    this.personButton = getElementBySelector<HTMLButtonElement>(
      '.person-button',
      this.el
    );

    this.addPersonInputField = this.addPersonInputField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init();
  }

  private addPersonInputField(): void {
    const personNumber = this.personCounter++;
    const newInputFieldTemplate = `
      <input id="person${personNumber}" type="number" name="income" placeholder="Person ${personNumber}"/>
    `;
    this.personButton.insertAdjacentHTML('beforebegin', newInputFieldTemplate);

    // Update incomeInputFields with the new input field
    this.incomeInputFields = getElementsBySelectorAll('input[name="income"]');
  }

  private totalIncome(): number {
    return sumInputValues(this.incomeInputFields);
  }

  private totalExpenses(): number {
    return sumInputValues(this.expensesInputFields);
  }

  private totalSurplus(): number {
    return this.totalIncome() - this.totalExpenses();
  }

  /* Calculator output logic */

  private setupCloseButton(): void {
    const closeButton = getElementBySelector('.close-button', this.el);
    closeButton.addEventListener('click', () => {
      this.hideOutputContainer();
    });
  }

  private showOutputContainer(): void {
    this.outputContainer.classList.add('fadeIn');
  }

  private hideOutputContainer(): void {
    this.outputContainer.classList.remove('fadeIn');
  }

  private calculatorOutput(): void {
    const calculatorOutputTemplate = `
    <button class="button close-button" type="button">&times;</button>
    <ul>
      <li>
        <p>Monatliche Einnahmen gesamt:</p>
        <p>${formatCurrency(this.totalIncome() / 12, '€')}</p>
      </li>
      <li>
        <p>Monatliche Ausgaben gesamt:</p>
        <p>${formatCurrency(this.totalExpenses() / 12, '€')}</p>
      </li>
      <li>
        <p>Monatlicher Gewinn gesamt:</p>
        <p>${formatCurrency(this.totalSurplus() / 12, '€')}</p>
      </li>
      <li>
        <p>Jährliche Einnahmen gesamt:</p>
        <p>${formatCurrency(this.totalIncome(), '€')}</p>
      </li>
      <li>
        <p>Jährliche Ausgaben gesamt:</p>
        <p>${formatCurrency(this.totalExpenses(), '€')}</p>
      </li>
      <li>
        <p>Jährlicher Gewinn gesamt:</p>
        <p>${formatCurrency(this.totalSurplus(), '€')}</p>
      </li>
    </ul>
  `;

    this.outputContainer.children[0].innerHTML = calculatorOutputTemplate;
    this.setupCloseButton();
    this.showOutputContainer();
  }

  private handleSubmit(): void {
    this.calculatorOutput();
  }

  private registerEventListeners(): void {
    this.personButton.addEventListener('click', this.addPersonInputField);
    this.submitButton.addEventListener('click', this.handleSubmit);
  }

  private removeEventListeners(): void {
    this.personButton.removeEventListener('click', this.addPersonInputField);
    this.submitButton.removeEventListener('click', this.handleSubmit);
  }

  private init(): void {
    this.registerEventListeners();
  }

  public destroy(): void {
    this.removeEventListeners();
  }
}
