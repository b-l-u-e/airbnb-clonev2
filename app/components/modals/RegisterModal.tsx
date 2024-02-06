'use client'

import axios from 'axios'
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useState, useCallback } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
            registerModal.onClose()
        })
            .catch((error) => {
                toast.error("Request failed with status code 404 (Not Found)")
                console.log(error)
        })
            .finally(() => {
            setIsLoading(false)
        })

    }

    const bodyContent = (
      <div className="flex flex-col gap-4">
        {/* heading */}
        <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
        <Input
          id="email"
          label="Email Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="username"
          label="Username"
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
                onClick = {() => {}}
            />
            <Button
                outline
                label='Continue with Github'
                icon={BsGithub}
                onClick={() => {}}
            />

            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>Already have an account?</div>
                    <div className='text-neutral-800 cursor-pointer hover:underline font-semibold'>Log in</div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer = {footerContent}
        />
     );
}
 
export default RegisterModal;