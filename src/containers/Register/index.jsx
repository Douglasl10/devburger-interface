import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "../../services/api";
import { Container, Form, InputContainer, LeftContainer, RightContainer, Title, Link } from './styles'
import { Button } from '../../components/Button'
import Logo from '../../assets/logo.svg'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export function Register() {
    const navigate = useNavigate()
    const schema = yup.object({
        name: yup.string().required('O nome é Obrigatorio'),
        email: yup.string().email('Digite um e-mail Válido').required('O e-mail é obrigatorio'),
        password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas deve ser iguais').required('Confirme sua senha'),
    }).required();

    const {
        register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });

    const onSubmit = async data => {

        try {
            const { status } = await
                api.post('/users', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
                {
                    validateStatus: () => true,
                },
                );

            if (status === 200 || status === 201) {
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
                toast.success('Conta Criada com Sucesso')
            } else if (status === 409) {
                toast.error('Email já cadastrado, faça login para continuar')
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Falha no Sistema, tente novamente")
        }

    };

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburguer" />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Criar Conta
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Nome</label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Confirmar Senha</label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>

                    <Button type="submit">Criar Conta</Button>
                </Form>
                <p>Já Possui Conta?<Link to={"/login"}>Clique Aqui</Link>
                </p>
            </RightContainer>
        </Container>
    );
}