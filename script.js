const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category =

    amount.oninput = () => {
        let value = amount.value.replace(/\D/g, "")

        value = Number(value) / 100

        amount.value = formatCurrencyBRL(value)
    }

function formatCurrencyBRL(value) {
    value = value.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
    })

    return value
}

