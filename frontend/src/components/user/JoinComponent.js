import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { postAdd } from "../../api/userApi";
import TextField from "@mui/material/TextField";


    const SignUpFormValues ={

        loginId:'',
        password:'',
        email:'',
        name:'',
        role: 'MEMBER',
        phonenumber: "010-1234-5678",
        social:false
        
    }
    

    const JoinComponent = () => {



   
     const {
        control,
        handleSubmit,
        getValues,
        trigger,

        formState: {errors,isValid},
     } = useForm({
        mode: 'onChange',
        defaultValues: SignUpFormValues,
     });
     



       

        const onSubmit = async (join) => {

              console.log("회원가입 시도 객체(join):", join);
        


            try {
                const response = await postAdd(join);
                console.log("회원가입 성공:", response)

            } catch (e) {
                console.error("회원가입 실패:",e);
            }
        }
       

        




        return(
           
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">SIGN UP</div>
            </div>

            <Controller
         name="name"
         control={control}
         defaultValue=""
         rules={{
             required: "닉네임을 입력하세요"
             
             
         }}

         render={({field}) => (

         <TextField
         {...field}
         label="닉네임"
         required
         fullWidth
         variant="outlined"
         onChange={ (e) => {
             field.onChange(e);
             trigger('name'); 
           
         }}
          helperText={errors.name && errors.loginId.name}
       
          
         />
    

        )}  

       
         />






        <Controller
            name="loginId"
            control={control}
            defaultValue=""
            rules={{
                required: "ID를 입력하세요"
                
            }}
        
            render={({field}) => (
        
            <TextField
            {...field}
            label="아이디"
            required
            fullWidth
            variant="outlined"
            onChange={ (e) => {
                field.onChange(e);
                trigger('loginId');
     
            }}
             helperText={errors.loginId && errors.loginId.message}
            />
            )}  
            />


                         <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "비밀번호 를 입력하세요"

                   
                        
                    }}

                    render={({field}) => (

                    <TextField
                    {...field}
                    label="비밀번호"
                    required
                    fullWidth
                    variant="outlined"
                    onChange={ (e) => {
                        field.onChange(e);
                        trigger('password');
                        
                        
                      
                    }}
                     helperText={errors.password && errors.password.message}
                    />
                    



                    )}  
                    />


                <Controller
                    name="email"
                    control={control}
                    defaultValue={control}
                    rules={{
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: '유효한 이메일 주소를 입력해주세요. 예) example.com'
                        },
                    }}
                    render={({field }) => (
                   
                  <TextField

                    {...field}
                    label="이메일"
                    required
                    fullWidth
                    variant="outlined"
                    placeholder="example@email.com"
                    
                    error={!!errors.email}
                    
                    helperText={errors.email && errors.email.message}
                    />

                        )}
                />


                     <div className="flex justify-center">
                <div className="relative mb-4 flex justify-center" >
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                    <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white " onClick={handleSubmit(onSubmit)}>
                        가입
                    </button>
                    </div>
                </div>


            </div>









                
                
             


        </div>



        )




    }

    export default JoinComponent;









