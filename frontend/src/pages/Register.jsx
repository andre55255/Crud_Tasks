import React, { useState } from 'react';
import './Register.css';

import { Button, Card, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validationEmail } from '../components/utilities/validationEmail';

export default function Register() {
    const form = document.forms.registerForm;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    function toDoRegister() {
        if (!(name && email && password && confirmPassword)) {
            return message.warning('Dados incompletos');
        } else if (name.length < 5) {
            return message.warning('Informe seu nome completo');
        } else if (!validationEmail(email)) {
            return message.warning('Email inválido');
        } else if (password !== confirmPassword) {
            return message.warning('Senhas não conferem');
        } else {
            axios({
                url: 'http://localhost:8081/users/register',
                method: 'post',
                data: {
                    name,
                    email,
                    password
                }
            }).then(resp => {
                if (resp.data.success) {
                    message.success('Usuário cadastro com sucesso');
                    form.reset();
                } else {
                    message.error('Erro '+resp.data.error);
                    console.log(resp.data.error);
                }
            }).catch(err => {
                console.log(err);
                message.error('> '+err);
            });
        }
    }

    return (
        <div className="register">
            <Card
                title="Registrar-se"
                style={{
                    width: '50vw',
                    height: '65vh',
                    marginTop: '2rem'
                }}
            >
                <Form
                    name="registerForm"
                >
                    <Form.Item
                        label="Nome"
                        htmlFor="name"
                    >
                        <Input 
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Digite seu nome completo"
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        htmlFor="email"
                    >
                        <Input 
                            type="email"
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
                            placeholder="Digite sua senha - Deve conter entre 6 e 8 caracteres/dígitos"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Confirme a senha"
                        htmlFor="confirmPassword"
                    >
                        <Input.Password 
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirme sua senha"
                            onChange={e => setconfirmPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        onClick={toDoRegister}
                    >
                        Registrar
                    </Button>
                    <Button
                        type="default"
                        style={{
                            marginLeft: '0.5rem'
                        }}
                    >
                        <Link to="/">
                            Login
                        </Link>
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
