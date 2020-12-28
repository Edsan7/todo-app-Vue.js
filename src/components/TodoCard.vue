<template>
  <div :class="[todo.isCompleted ? 'isCompleted' : '']" class="todo-card">
    <h4><strong>{{ todo.title }}</strong></h4>
    <p>{{ todo.description }}</p>
  </div>
</template>

<script>
export default {
  name: "TodoCard",
  props: {
    todo: {
      title: String,
      description: String,
      isCompleted: Boolean
    },
  },
};
</script>

<style scoped>
.todo-card {
  margin: 10px 0;
  border-radius: 5px;
  background-color: rgb(236, 236, 236);
  padding: 15px;
  text-align: left;
}

.todo-card:hover {
  cursor: pointer;
  background-color: rgb(209, 209, 209);
}
.isCompleted {
  text-decoration: line-through;
}
</style>>
