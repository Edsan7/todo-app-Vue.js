export default {
    addTodo: ({ commit }, todo) => {
        commit('appendTodoData', todo)
    },
    updateTodo: ({ commit }, payload) => {
        commit('updateTodo', payload)
    },
    deleteTodo: ({ commit }, index) => {
        commit('removeTodoData', index)
    }
}