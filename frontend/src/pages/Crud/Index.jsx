import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Dashboard from '../../components/template/Dashboard';
import { AuthContext } from '../../provider/auth';
import axios from 'axios';
import { Card, Divider, message } from 'antd';

import Create from './Create';
import ReadDelete from './ReadDelete';

export default function Crud() {

    const { user, setUser } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        axios({
            url: 'http://localhost:8081/logged',
            method: 'post',
            headers: {
                Authorization: "Bearer "+user.token
            }
        }).then(resp => {
            if (resp.data.success) {
                console.log('Ok');
            } else {
                setUser({
                    name: '',
                    token: ''
                });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                history.push('/');
            }
        }).catch(err => {
            console.log(err);
            message.error('Falha na autenticação');
            setUser({
                name: '',
                token: ''
            });
            localStorage.removeItem('token');
            history.push('/');
        });
    }, [user, setUser, history]);

    

    return (
        <Dashboard>
            <Card
                title="Crud de tarefas"
            >
                <Create />
                <Divider />
                <ReadDelete />
            </Card>
        </Dashboard>
    );
}
