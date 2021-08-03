import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../provider/auth';
import { Form, Input, Card, Button, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { setUser } = useContext(AuthContext);

    function toDoLogin() {
        if (!(email && password)) {
            return message.error('Dados incompletos');
        } else {
            axios({
                url: 'http://localhost:8081/users/login',
                method: 'post',
                data: {
                    email,
                    password
                }
            }).then(resp => {
                if (resp.data.success) {
                    message.success(`Usuário ${resp.data.name} autenticado com sucesso`);
                    setUser({
                        name: resp.data.name,
                        token: resp.data.token
                    });
                    localStorage.setItem('token', resp.data.token);
                    localStorage.setItem('user', resp.data.name);
                    history.push('/home');
                } else {
                    message.error('Falha na autenticação');
                    console.log(resp.data.error);
                }
            }).catch(err => {
                console.log(err);
                message.error('Falha na autenticação');
            })
        }
    }

    return (
        <div className="login">
            <Card
                title="Login"
                style={{
                    width: '50vw',
                    height: '50vh',
                    marginTop: '2rem'
                }}
            >
                <Form
                    name="loginForm"
                >
                    <Form.Item
                        label="Email"
                        htmlFor="email"
                    >
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Digite seu email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Senha"
                        htmlFor="password"
                    >
                        <Input.Password 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Digite sua senha"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        onClick={toDoLogin}
                    >
                        Logar
                    </Button>
                    <Button 
                        type="default"
                        style={{
                            marginLeft: '0.5rem'
                        }}
                    >
                        <Link to="/register">
                            Registrar
                        </Link>
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
