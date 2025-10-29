import {useState} from "react"
import {useDispatch} from "react-redux"
import {createExpense} from "../features/expenses/expenseSlice"

function ExpenseForm() {
    const [text, setText] = useState("")
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("miscellaneous")
    const dispatch = useDispatch()
    const onSubmit = e => {
        e.preventDefault()
        dispatch(createExpense({text, amount, category}))
    }
    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Expense</label>
                    <input type="text" name="text" id="text" value={text} onChange={e => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount €</label>
                    <input type="number" name="amount" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="Miscellaneous">Miscellaneous</option>
                        <option value="Living Costs">Living Costs</option>
                        <option value="Amusements/Hobbies">Amusements/Hobbies</option>
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">Add Expense</button>
                </div>
            </form>
        </section>
    )
}

export default ExpenseForm