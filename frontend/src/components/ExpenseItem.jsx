import { useDispatch } from "react-redux"
import { deleteExpense } from "../features/expenses/expenseSlice"
import { FaTrash} from "react-icons/fa"
function ExpenseItem({ expense }) {
    const dispatch = useDispatch()
    return(
        <div className="expense">
            <div>
                {new Date(expense.createdAt).toLocaleString
                ("fi-FI")}
            </div>
            <h2>
                {expense.text}
            </h2>
            <p className="category">
                <strong>Category:</strong> {expense.category}
            </p>
            <h3>
                {expense.amount.toLocaleString("fi-FI", {
                    style: "currency",
                    currency: "EUR",
                })}
            </h3>
            <button onClick={() => dispatch(deleteExpense(expense._id))} className="close"><FaTrash /></button>
        </div>
    )}

export default ExpenseItem