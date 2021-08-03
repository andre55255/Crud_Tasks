import React, { useState, useContext } from "react";
import { message, Form, Input, Button } from "antd";
import axios from "axios";
import { AuthContext } from '../../provider/auth';

export default function Create(props) {

  const [task, setTask] = useState("");
  const { user } = useContext(AuthContext);

  function newTask() {
    const form = document.forms.newTask;

    if (!task) {
      return message.warning("Preencha a tarefa");
    } else {
      axios({
        url: "http://localhost:8081/task",
        method: "post",
        headers: {
          Authorization: "Bearer "+user.token
        },
        data: {
          description: task
        },
      })
        .then((resp) => {
          if (resp.data.success) {
            message.success("Tarefa cadastrada com sucesso");
            form.reset();
          } else {
            message.error("Erro!");
          }
        })
        .catch((err) => {
          message.error(">"+ err);
        });
    }
  }

  return (
    <Form name="newTask">
      <Form.Item label="Nova tarefa" htmlFor="task">
        <Input
          type="text"
          name="task"
          id="task"
          placeholder="Digite a tarefa a ser inserida"
          onChange={(e) => setTask(e.target.value)}
        />
      </Form.Item>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Button type="ghost" onClick={newTask}>
          Inserir
        </Button>
      </div>
    </Form>
  );
}
