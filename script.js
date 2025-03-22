const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector('aside header p span')
const totalAmountOfExpenses = document.querySelector("aside header h2")

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

form.onsubmit = event => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `./img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        const expenseInfo = document.createElement('div')
        expenseInfo.classList.add('expense-info')

        const expenseName = document.createElement('strong')
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name

        expenseInfo.append(expenseName, expenseCategory)

        const expenseAmount = document.createElement('span')
        expenseAmount.classList.add('expense-amount')
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace('R$', '')
            .replace(/\s+/g, '')
            }`

        const removeIcon = document.createElement('img')
        removeIcon.classList.add('remove-icon')
        removeIcon.setAttribute('src', './img/remove.svg')
        removeIcon.setAttribute('alt', 'Remover despesa')

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        expenseList.append(expenseItem)

        clearForm()
        updateTotals()
    } catch (error) {
        console.log(error)
    }
}

function updateTotals() {
    try {
        const items = expenseList.children
        expensesQuantity.textContent = `${items.length} ${items.length == 1 ? "despesa" : "despesas"}`

        let totalAmount = 0
        for (let i = 0; i < items.length; i++) {
            totalAmount += parseFloat(items[i].querySelector('.expense-amount')
                .textContent.replace('R$', '')
                .replace('.', '')
                .replace(',', '.'))
        }

        totalAmount = parseFloat(totalAmount.toFixed(2))
        totalAmount = formatCurrencyBRL(totalAmount)

        totalAmountOfExpenses.innerHTML = `<small>R$</small>${totalAmount
            .toUpperCase()
            .replace('R$', '')
            .replace(/\s+/g, '')
            }`

    } catch (error) {
        console.log(error)
    }
}

expenseList.addEventListener('click', event => {
    if (event.target.classList.contains("remove-icon")) {
        event.target.closest(".expense").remove()
    }

    updateTotals()
})

function clearForm() {
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus()
}