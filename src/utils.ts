const throwSelectorError = (selector: string): never => {
  throw new Error(`Element with selector: ${selector} not found`);
};

const getElementBySelector = <E extends Element>(
  selector: string,
  el: Element | Document = document
): E => {
  const field = el.querySelector(selector);
  if (!field) {
    throwSelectorError(selector);
  }

  return field as E;
};

const getElementsBySelectorAll = <E extends Element>(
  selector: string,
  el: Element | Document = document
): NodeListOf<E> => {
  const fields = el.querySelectorAll(selector);

  if (fields.length === 0) {
    throwSelectorError(selector);
  }

  return fields as NodeListOf<E>;
};

const parseInputValues = (value: string): number => {
  return value === '' ? 0 : Math.trunc(parseInt(value));
};

const sumInputValues = (inputs: NodeListOf<HTMLInputElement>): number => {
  return Array.from(inputs).reduce(
    (total, input) => total + parseInputValues(input.value),
    0
  );
};

const formatCurrency = (amount: number, currency: string): string => {
  return `${amount} ${currency}`;
};

export {
  throwSelectorError,
  getElementBySelector,
  getElementsBySelectorAll,
  sumInputValues,
  formatCurrency,
};
