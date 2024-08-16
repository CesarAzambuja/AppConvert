//Criar cotação do dia 
const USD = 4.87
const EUR = 5.12
const GBP = 6.08



//Obtendo os elementos da DOM para trabalhar
const form = document.querySelector('form')
const footer = document.querySelector('footer')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')
const description = document.getElementById('description')
const result = document.getElementById('result')

//Manipulando o input para receber somente números
amount.addEventListener('input', (event) => {
    const hasCharactersRegex = /\D+/g

    amount.value = amount.value.replace(hasCharactersRegex, '')


})

//Capturando o submit 
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, 'US$')
            break
        case "EUR":
            convertCurrency(amount.value, EUR, '€')
            break
        case "GBP":
            convertCurrency(amount.value, GBP, '£')
    }
}

//Formar valor no padrão de Moeda Brasileira
function formatCurrencyBRL(value) {
    return Number(value)
        .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
}

//Função para convert a moeda
function convertCurrency(amount, price, symbol) {

    try {
        let total = amount * price
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        result.textContent = `${formatCurrencyBRL(total).replace('R$', '')} Reais`
        footer.classList.add('show-result')


    } catch (error) {
        footer.classList.remove('show-result')
        console.log(error);
        alert('Não foi possível converter, tente novamente mais tarde!')
    }





}