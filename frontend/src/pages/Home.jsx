import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../provider/auth';
import Dashboard from '../components/template/Dashboard';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Card, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

export default function Home() {

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
        })
    }, [user, setUser, history]);

    return (
        <Dashboard>
            <Card
                title="Página Home"
            >
                <Title level={2}>
                    Olá,
                    <Text type="danger" style={{marginLeft: '0.6rem'}}>{user.name}</Text>
                </Title>
                <Title level={4}>
                    Uma página simples de crud de tarefas, criada utilizando React, 
                    AntDesign, e contextApi no frontend, e NodeJs e banco de dados Postgres.
                    Autenticação feita utilizando token JWT.
                </Title>
            </Card>
        </Dashboard>
    );
}