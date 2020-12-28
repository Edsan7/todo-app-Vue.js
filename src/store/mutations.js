export default {

    appendTodoData: (state, todo) => {
        state.todoData.unshift(todo)
    },
    updateTodo: (state, { index, todo }) => {
        state.todoData[index] = todo
    },
    removeTodoData: (state, index) => {
        state.todoData.splice(index, 1);
    }

}