import React, { useState, useContext } from "react";
import { TaskContext } from "../../provider/task";
import { Form, Button, Input, message } from 'antd';
import axios from "axios";
import { AuthContext } from "../../provider/auth";

export default function Update() {
  const { task, setTask } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const [idTask] = useState(task.id);
  const [dscTask, setDscTask] = useState(task.dscTask);

  function toDoUpdate() {
    if(!idTask && dscTask) {
        message.warning('Ocorreu um erro, feche e tente novamente');
    } else if(task.dscTask === dscTask){
        message.warning('Faça alguma alteração para processar');
    } else {
        axios({
            url: 'http://localhost:8081/task',
            method: 'put',
            headers: {
                Authorization: "Bearer "+user.token
            },
            data: {
                id: idTask,
                description: dscTask,
                oldDescription: task.dscTask
            }
        }).then(resp => {
            if (resp.data.success) {
                message.success('Tarefa alterada com sucesso');
                window.location.reload();
                setTask({
                    id: '',
                    dscTask: ''
                })
            } else {
                message.error('Ocorreu um erro'+resp.data.error);
            }
        }).catch(err => {
            console.log(err);
            message.error('> '+err);
        });
    }
  }

  return (
    <Form name="newTask">
      <Form.Item label="Id tarefa" htmlFor="id">
        <Input
          type="text"
          name="id"
          id="id"
          value={idTask}
          disabled
        />
      </Form.Item>
      <Form.Item label="Descrição" htmlFor="dsc">
          <Input 
            type="text"
            name="dsc"
            id="dsc"
            value={dscTask}
            onChange={e => setDscTask(e.target.value)}
          />
      </Form.Item>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button 
            type="ghost"
            onClick={toDoUpdate}
        >
          Alterar
        </Button>
      </div>
    </Form>
  );
}
