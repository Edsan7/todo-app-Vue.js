<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col md="12" lg="6">
          <b-container style="text-align: left; margin-top: 30px">
            <h2>Adicionar uma tarefa</h2>
            <hr />

            <b-form @submit.prevent="onSubmit">
              <b-form-group>
                <b-form-input
                  v-model="todoFields.title"
                  placeholder="Título..."
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-form-input
                  v-model="todoFields.description"
                  placeholder="Descrição..."
                ></b-form-input>
              </b-form-group>

              <span style="color: #dd2020"
                ><strong>{{ info }}</strong></span
              >

              <b-form-group v-show="todoIndex !== null">
                <b-form-checkbox-group>
                  <b-form-checkbox v-model="todoFields.isCompleted"
                    >Concluído?</b-form-checkbox
                  ></b-form-checkbox-group
                >
                <b-row>
                  <b-col>
                    <b-button
                      style="margin: 10px 0px"
                      type="reset"
                      block
                      variant="info"
                      @click="removeTodo"
                      ><strong>Remover</strong></b-button
                    >
                  </b-col>

                  <b-col>
                    <b-button
                      style="margin: 10px 0px"
                      block
                      type="reset"
                      variant="info"
                      @click="clearFields"
                      ><strong>Limpar</strong></b-button
                    >
                  </b-col>
                </b-row>
              </b-form-group>

              <b-button type="submit" block variant="primary"
                ><strong>{{
                  todoIndex === null ? "Enviar" : "Atualizar"
                }}</strong></b-button
              >
            </b-form>
          </b-container>
        </b-col>

        <b-col align-self="center">
          <b-container style="margin-top: 30px">
            <h2>Lista de tarefas</h2>
            <hr />

            <div
              v-for="(todo, index) in todoData"
              :key="index"
              @click="getTodo(index)"
            >
              <todo-card :todo="todo" />
            </div>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TodoCard from "../components/TodoCard.vue";

export default {
  components: { TodoCard },
  name: "Home",
  data() {
    return {
      info: "",
      todoIndex: null,
      todoFields: {
        title: "",
        description: "",
        isCompleted: null,
      },
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    ...mapActions(["updateTodo"]),
    ...mapActions(["deleteTodo"]),

    onSubmit() {
      const { title, description, isCompleted } = this.todoFields;

      if (title == "" || description == "")
        this.info = "Preencha todos os campos!!!";
      else {
        this.info = "";
        if (this.todoFields.isCompleted === null) {
          const todo = {
            title,
            description,
            isCompleted: false,
          };
          this.addTodo(todo);
        } else {
          const payload = {
            index: this.todoIndex,
            todo: {
              title,
              description,
              isCompleted,
            },
          };
          this.updateTodo(payload);
        }

        this.clearFields();
      }
    },
    getTodo(index) {
      this.info = "";
      this.todoIndex = index;
      const { title, description, isCompleted } = this.todoData[this.todoIndex];
      this.todoFields = {
        title,
        description,
        isCompleted,
      };
    },
    removeTodo() {
      const index = this.todoIndex;
      this.clearFields();
      this.deleteTodo(index);
    },
    clearFields() {
      this.todoIndex = null;
      this.todoFields = {
        title: "",
        description: "",
        isCompleted: null,
      };
    },
  },
  computed: {
    ...mapState(["todoData"]),
  },
};
</script>

<style scoped>
.btn-clear {
  display: flex;
  justify-content: space-between;
}
.home {
  padding: 50px 0;
  margin-top: 50px;
}
</style>
