// financial-calculator.js

class FinancialCalculator extends HTMLElement {
    constructor() {
        super();

        
        this.attachShadow({ mode: 'open' });

        this.amount = 0;
        this.interestRate = 0;
        this.term = 0;

        this.shadowRoot.innerHTML = `
            <form id="calculator-form">
                <label for="amount">Сумма кредита:</label>
                <input type="number" id="amount" name="amount" min="0" required><br>

                <label for="interest-rate">Процентная ставка:</label>
                <input type="number" id="interest-rate" name="interest-rate" min="0" required><br>

                <label for="term">Срок кредита (в месяцах):</label>
                <input type="number" id="term" name="term" min="0" required><br>

                <button type="submit">Рассчитать</button>
            </form>

            <div id="results">
                <p id="monthly-payment">Ежемесячный платеж: </p>
                <p id="total-payment">Общая сумма к оплате: </p>
                <p id="total-interest">Общий процент по кредиту: </p>
            </div>
        `;


        this.shadowRoot.querySelector('#calculator-form').addEventListener('submit', this.calculate.bind(this));
    }

    connectedCallback() {
        console.log('Компонент создан');
    }

    disconnectedCallback() {
        console.log('Компонент удален');
    }

    calculate(event) {
        event.preventDefault();

        const amount = parseFloat(this.shadowRoot.querySelector('#amount').value);
        const interestRate = parseFloat(this.shadowRoot.querySelector('#interest-rate').value);
        const term = parseInt(this.shadowRoot.querySelector('#term').value);


        if (isNaN(amount) || isNaN(interestRate) || isNaN(term)) {
            alert('Пожалуйста, введите корректные данные.');
            return;
        }


        const monthlyInterestRate = interestRate / 12 / 100;
        const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -term));
        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - amount;


        this.shadowRoot.querySelector('#monthly-payment').textContent = `Ежемесячный платеж: ${monthlyPayment.toFixed(2)} рублей`;
        this.shadowRoot.querySelector('#total-payment').textContent = `Общая сумма к оплате: ${totalPayment.toFixed(2)} рублей`;
        this.shadowRoot.querySelector('#total-interest').textContent = `Общий процент по кредиту: ${totalInterest.toFixed(2)} рублей`;

        console.log('Данные обновлены');
    }
}


customElements.define('financial-calculator', FinancialCalculator);
