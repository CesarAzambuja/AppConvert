//CONSUMINDO API DE MOEDAS
const url = 'https://economia.awesomeapi.com.br/last/'
const coins = 'USD-BRL,EUR-BRL,BTC-BRL'



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

fetch(url + coins)
    .then(function (response) {
        return response.json()

    })
    .then((data) => {
        console.log(data);
        const USD = data.USDBRL.low
        const USDDATE = new Date(data.USDBRL.create_date)
        const EUR = data.EURBRL.low
        const EURDATE = new Date(data.EURBRL.create_date)
        const BTC = data.BTCBRL.low
        const BTCDATE = new Date(data.BTCBRL.create_date
        )
        //Capturando o submit 
        form.onsubmit = (event) => {
            event.preventDefault()

            switch (currency.value) {
                case "USD":
                    convertCurrency(amount.value, USD, 'US$', USDDATE.toLocaleString())
                    break
                case "EUR":
                    convertCurrency(amount.value, EUR, '€', EURDATE.toLocaleString())
                    break
                case "BTC":
                    convertCurrency(amount.value, BTC, '₿', BTCDATE.toLocaleString())
            }
        }

    })





//Formar valor no padrão de Moeda Brasileira
function formatCurrencyBRL(value) {
    return Number(value)
        .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
}

//Função para convert a moeda
function convertCurrency(amount, price, symbol, date) {

    try {
        let total = amount * price
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)} em ${date}`
        result.textContent = `${formatCurrencyBRL(total).replace('R$', '')} Reais`
        footer.classList.add('show-result')


    } catch (error) {
        footer.classList.remove('show-result')
        console.log(error);
        alert('Não foi possível converter, tente novamente mais tarde!')
    }
}