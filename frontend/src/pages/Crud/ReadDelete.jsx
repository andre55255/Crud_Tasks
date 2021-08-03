import React, { useState, useEffect, useContext } from 'react';
import './ReadDelete.css';
import axios from 'axios';
import { AuthContext } from '../../provider/auth';
import { TaskContext } from '../../provider/task';
import { message, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Update from './Update';

export default function Read(props) {

    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);
    const { setTask } = useContext(TaskContext);

    useEffect(() => {
        axios({
            url: 'http://localhost:8081/task',
            method: 'get',
            headers: {
                Authorization: "Bearer "+user.token
            }
        }).then(resp => {
            if (resp.data.success) {
                setTasks(resp.data.data);
            } else {
                message.error('Erro ao carregar lista');
            }
        }).catch(err => {
            console.log(err);
            message.error('Erro ao carregar lista');
        });
    }, [user]);

    const columns = [{
        title: 'ID',
        dataIndex: 'key',
        key: 'key'
    },{
        title: 'Tarefa',
        dataIndex: 'task',
        key: 'task'
    }, {
        title: 'Ações',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
            <>
                <DeleteOutlined className="ico ico-delete" onClick={e => deleteTask(e)}/>
                <EditOutlined className="ico ico-update" onClick={e => showModal(e)}/>
            </>
        )
    }]

    function deleteTask(e) {
        const idItem = e.target.parentNode.parentNode.parentNode.children[0].innerHTML;
        const dscItem = e.target.parentNode.parentNode.parentNode.children[1].innerHTML;

        axios({
            url: 'http://localhost:8081/task',
            method: 'delete',
            headers: {
                Authorization: "Bearer "+user.token
            },
            data: {
                id: idItem,
                description: dscItem
            }
        }).then(resp => {
            if (resp.data.success) {
                message.success('Tarefa excluída com sucesso');
                window.location.reload();
            } else {
                console.log(resp.data.error);
                message.error('Erro ao excluir tarefa');
            }
        }).catch(err => {
            console.log(err);
            message.error('> '+err);
        });
    }

    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);

    const showModal = (e) => {
        const id = e.target.parentNode.parentNode.parentNode.children[0].innerHTML;
        const dscTask = e.target.parentNode.parentNode.parentNode.children[1].innerHTML;

        setTask({
            id, dscTask
        })

        setModalUpdateVisible(true);
    };
    
    const handleOk = () => {
        setModalUpdateVisible(false);
    };
    
    const handleCancel = () => {
        setModalUpdateVisible(false);
    };

    return (
        <>
            <Table 
                dataSource={tasks}
                columns={columns}
            />
            <Modal 
                title="Altera Produto"
                visible={modalUpdateVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Update />
            </Modal>
        </>
    );
}
