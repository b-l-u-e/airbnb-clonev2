'use client'

import axios from 'axios'
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState, useCallback } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';
// import RegisterModal from './RegisterModal';


const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false
        })
            .then((callback) => {
                setIsLoading(false)
                if (callback?.ok) {
                    toast.success('Logged in successfully');
                    router.refresh()
                    loginModal.onClose()
                }

                if (callback?.error) {
                    toast.error(callback.error)
                }
        })

    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
      <div className="flex flex-col gap-4">
        {/* heading */}
        <Heading title="Welcome back!" subtitle="Login to your account" />
        <Input
          id="email"
          label="Email Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick = {() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={BsGithub}
                onClick={() => signIn('github')}
            />

            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>Don't have an account?</div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 cursor-pointer hover:underline font-semibold'>
                        Create one!
                    </div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer = {footerContent}
        />
     );
}
 
export default LoginModal;